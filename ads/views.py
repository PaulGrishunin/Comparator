from django.shortcuts import render
from rest_framework import generics, status, filters
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .service import PlatformFilter, PaginationPlatform
from collections import defaultdict
from .serializers import (
    BrandsSerializer,
    PlatformListSerializer,
    PlatformCreateSerializer,
    Sale_avgSerializer,
    Sale_avgCreateSerializer,
    FavoritesSerializer,
    FavoritesCreateSerializer)
from django.http import HttpResponseRedirect
from .models import Brands, Platform, Sale_avg, Favorites
from authentication.models import User
import csv
import subprocess


class BrandsListView(generics.ListAPIView):
    queryset = Brands.objects.all().order_by('name')
    serializer_class = BrandsSerializer


class PlatformListView(generics.ListAPIView):
    """Get List elements of Platform"""
    queryset = Platform.objects.all().order_by('brandId')
    serializer_class = PlatformListSerializer
    pagination_class = PaginationPlatform
    filter_backends = [filters.SearchFilter]
    search_fields = ['model']


class PlatformLView(generics.ListAPIView):
    """Get List elements of Platform with filter price_diff, year_min, year_max, price_min, price_max"""
    serializer_class = PlatformListSerializer
    filter_backends = (DjangoFilterBackend, )
    filterset_class = PlatformFilter
    # pagination_class = PaginationPlatform

    def get_queryset(self):
        create_platform_buy(self)
        price_dif = self.kwargs['dif']
        filtered_ids=[]
        result_list=[]
        plat_list=Platform.objects.filter(platform_code=1)
        sale_avg_list=Sale_avg.objects.all()
        # print('plat_list=', plat_list)
        # print('sale_list=', sale_avg_list)
        for p in plat_list:
            # print('p=', p)
            for s in sale_avg_list:
                # print('s=', s)
                if (p.brandId, p.year, p.fuel)==(s.brandId, s.year, p.fuel) and (p.model.lower() in s.model.lower()) and (s.avg_price - p.price) >= price_dif :
                    p.price_diff = s.avg_price - p.price
                    print("result=", p)
                    # p.save()
                    result_list.append(p)
                    filtered_ids.append(p.id)
        # print('result_list=', result_list )
        # Platform.objects.update([Platform(**{'id': p.id,
        #                                         'platform_code': True,
        #                                         'brandId_id': p.brandId_id,
        #                                         'model': p.model,
        #                                         'year': p.year,
        #                                         'fuel': p.fuel,
        #                                         'country': p.country,
        #                                         'place': p.place,
        #                                         'price': p.price,
        #                                         'price_diff': p.price_diff,
        #                                         'currency': p.currency,
        #                                         'photo_link': p.photo_link,
        #                                         'date_add': p.date_add,
        #                                         'ad_link': p.ad_link})
        #                              for p in result_list])
        queryset = Platform.objects.filter(pk__in=filtered_ids)
        return queryset.order_by('-date_add')

# class PlatformCreateView(APIView):
#     """Add elements to Platform from csv"""
    # serializer_class = PlatformCreateSerializer


class PlatformDestroyView(APIView):
    """Delete all elements in Platform"""
    def delete(self, request):
        elements = Platform.objects.all()
        elements.delete()
        return Response({"message": "All elements in Platform has been deleted."}, status=204)


class Sale_avgView(generics.ListAPIView):
    queryset = Sale_avg.objects.all().order_by('brandId')
    serializer_class = Sale_avgSerializer
    pagination_class = PaginationPlatform


class Sale_avgDestroyView(APIView):
    """Delete all elements in Sale_avg"""
    def delete(self, request):
        elements = Sale_avg.objects.all()
        elements.delete()
        return Response({"message": "All elements in Sale_avg has been deleted."}, status=204)


class FavoritesListView(generics.ListAPIView):
    """GET List users favorites by userId"""
    serializer_class = FavoritesSerializer
    # pagination_class = PaginationPlatform

    def get_queryset(self):
        try:
            return Favorites.objects.filter(userId=self.request.user.id)
        except Exception as e:
            return None

    # def get_queryset(self):
    #     uId = self.kwargs['userId']                          #"userId" MUST = current_userID
    #     queryset = Favorites.objects.filter(userId=uId)
    #     return queryset.order_by('-platformId__date_add')


class FavoritesCreateView(APIView):
    """Move ad to Favorites by userId, platformId"""
    def post(self, request, pk):
        request.data["userId"] = self.request.user.id
        request.data["platformId"] = self.kwargs['pk']
        print('request.data=', request.data)
        favorite = FavoritesCreateSerializer(data=request.data)
        fav_ids=[]
        favs = Favorites.objects.filter(userId=self.request.user.id)
        for f in favs:
            fav_ids.append(f.platformId_id)
        print('fav_ids=', fav_ids)
        if self.kwargs['pk'] in fav_ids:
            return Response({"message": "This ad is already in your favorites!"})
        else:
            if favorite.is_valid():
                favorite.save()
        return Response(favorite.data, status=status.HTTP_201_CREATED)


class FavoritesDeleteView(APIView):
    """Delete Favorite ad with id=pk"""
#     queryset = Favorites.objects.filter(id=pk)
    serializer_class = FavoritesSerializer

    def delete(self, request, pk):
        favorites_id = self.kwargs['pk']
        print('favorites_id to delete=', favorites_id)
        element = Favorites.objects.filter(id=favorites_id)
        element.delete()
        return Response({"message": "This ad delete from favorites."}, status=204)


# получение данных из бд
def index(request):
    people = User.objects.all()
    # print('request.user=', request.user)
    return render(request, "index.html", {"people": people})


def platform(request):
    ads = Platform.objects.all()
    return render(request, "platform.html", {"ads": ads})


exchange_rate_PLN_EUR = 0.22         # value must be parsed  in other module
brands_list = list(Brands.objects.values())

# сохранение данных from home(sale) platform в бд
def create_platform_sale(self):
    subprocess.Popen(['scrapy', 'runspider', './Parsing/scrapy_otomoto/spiders/otomotospider.py', '-O', './Parsing/otomoto_data.csv']).wait(timeout=None)
    elements = Platform.objects.filter(platform_code=0)
    elements.delete()
    print('ELEMENTS with platform_code=0 deleted from Platform')
    CSV_PATH = './Parsing/otomoto_data.csv'  # Csv file path
    with open(CSV_PATH, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar=',')
        # brands_list = list(Brands.objects.all().values_list('name', flat=True))
        print('brands_list=', brands_list)
        for row in reader:
            if next((item for item in brands_list if item["name"] == row[0]), False) != False:      #check if parsed brand name in Brands
                plat = Platform()
                plat.platform_code = False
                plat.brandId_id = [d['id'] for d in brands_list if d['name']== row[0]][0]        #Brands.objects.filter(name=row[0]).first().id
                plat.model = row[1]
                plat.year = row[2]
                plat.fuel = row[3]
                plat.price = row[4]
                plat.currency = row[5]
                plat.ad_link = row[6]
                print('plat=', plat)
                plat.save()
            else:
                print('Error: Brand of this car was not found ')
    #             # break
    return HttpResponseRedirect("/api/platform")

# сохранение данных from home(sale) platform в бд
def create_platform_buy(self):
    subprocess.Popen(['scrapy', 'runspider', './Parsing/scrapy_mobile/spiders/mobilespider.py', '-O', './Parsing/mobile_data.csv']).wait(timeout=None)
    fav_ids=[]
    favs = Favorites.objects.all()
    for f in favs:
        fav_ids.append(f.platformId_id)                 # don't delete ads, which have relations in Favorites.
    elements = Platform.objects.filter(platform_code=1)
    elements = elements.exclude(pk__in=fav_ids)
    elements.delete()
    print('ELEMENTS with platform_code=1 (without elements in Favorites) deleted from Platform')
    CSV_PATH = './Parsing/mobile_data.csv'  # Csv file path
    with open(CSV_PATH,  newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar=';')
        # print('brands_list=', brands_list)
        res_list =[]
        for row in reader:
            if next((item for item in brands_list if item["name"] == row[0]), False) != False:             #check if parsed brand name in Brands
                plat = Platform()
                plat.platform_code = True
                plat.brandId_id =  [d['id'] for d in brands_list if d['name']== row[0]][0]
                # print('plat.brandId_id=', plat.brandId_id)
                plat.model = row[1]
                plat.year = row[2]
                plat.fuel = row[3]
                plat.country = row[4]
                plat.place = row[5]
                plat.price = row[6]
                plat.currency = row[7]
                plat.photo_link = row[8]
                plat.ad_link = row[9]
                # print('plat=', plat)
                # plat.save()
                res_list.append(plat)

            else:
                print('Error: Brand of this car was not found ')
        print('res_list=', res_list)
        Platform.objects.bulk_create([Platform(**{'platform_code': plat.platform_code,
                                                              'brandId_id': plat.brandId_id,
                                                              'model': plat.model,
                                                              'year': plat.year,
                                                              'fuel': plat.fuel,
                                                              'country': plat.country,
                                                              'place': plat.place,
                                                              'price': plat.price,
                                                              'price_diff': plat.price_diff,
                                                              'currency': plat.currency,
                                                              'photo_link': plat.photo_link,
                                                              'ad_link': plat.ad_link})
                                                  for plat in res_list])
    return Response({"message": "Elements added to Platform."}, status=201)



"""Create examples with average price"""
def create_sale_avg_examples(self):
    create_platform_sale(self)
    elements = Sale_avg.objects.all()
    elements.delete()
    print('ELEMENTS deleted from Sale_avg')
    examples = Platform.objects.filter(platform_code=0).order_by('brandId_id').values_list(
            'brandId_id', 'model', 'year', 'fuel', 'price').iterator()
    grouped_cars_by_brand_model_year = defaultdict(list)
    for brandId_id, model, year, fuel, price in examples:
        grouped_cars_by_brand_model_year[brandId_id, model, year, fuel].append(price)
    print('grouped_cars_by_brand_model_year=', grouped_cars_by_brand_model_year)

    for k, v in grouped_cars_by_brand_model_year.items():
            avg = Sale_avg()
            avg.brandId_id = [d['id'] for d in brands_list if d['id']== k[0]][0]           # Brands.objects.filter(id=k[0]).first().id
            # print('avg.brandId_id =', avg.brandId_id)
            avg.model =  k[1]
            avg.year =  k[2]
            avg.fuel = k[3]
            avg.avg_price = int((sum(v) / len(v)) * exchange_rate_PLN_EUR)
            print('avg_example =', avg)
            avg.save()
    return HttpResponseRedirect("/api/sale_avg")