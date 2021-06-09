from django.shortcuts import render
from rest_framework import generics, status
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


class BrandsListView(generics.ListAPIView):
    queryset = Brands.objects.all().order_by('name')
    serializer_class = BrandsSerializer


class PlatformListView(generics.ListAPIView):
    """Get List elements of Platform"""
    queryset = Platform.objects.all().order_by('brandId')
    serializer_class = PlatformListSerializer
    pagination_class = PaginationPlatform


class PlatformLView(generics.ListAPIView):
    """Get List elements of Platform with filter price_diff, year_min, year_max, price_min, price_max"""
    serializer_class = PlatformListSerializer
    filter_backends = (DjangoFilterBackend, )
    filterset_class = PlatformFilter
    pagination_class = PaginationPlatform

    def get_queryset(self):
        price_dif = self.kwargs['dif']
        filtered_ids=[]
        plat_list=Platform.objects.filter(platform_code=1)
        sale_avg_list=Sale_avg.objects.all()
        for p in plat_list:
            for s in sale_avg_list:
                # print('s=', s)
                if (p.brandId, p.year)==(s.brandId, s.year) and (p.model.lower() in s.model.lower()) and (s.avg_price - p.price) >= price_dif :
                    p.price_diff = s.avg_price - p.price
                    print("result=", p)
                    p.save()
                    filtered_ids.append(p.id)
        print('filtered_ids=', filtered_ids )
        queryset = Platform.objects.filter(pk__in=filtered_ids)
        return queryset.order_by('-date_add')

# class PlatformCreateView(APIView):
#     """Add elements to Platform from csv"""
    # serializer_class = PlatformCreateSerializer

    # def create(self, request):
    #     CSV_PATH = './ads/otomoto_data.csv'  # Csv file path
    #     with open(CSV_PATH, newline='') as csvfile:
    #         reader = csv.reader(csvfile, delimiter=',', quotechar=';')
    #         for row in reader:
    #             Platform.create(self, platform_code=False,
    #                 brandId=Brands.objects.get(name=str(row[0])),
    #                 model=str(row[1]),
    #                 year=int(row[2]),
    #                 price=int(row[3]),
    #                 currency=row[4],
    #                 photo_link=row[5],
    #                 ad_link=row[6])
        #     serializer = PlatformCreateSerializer(data=obj, many=True)
        #     print('serializer=', serializer)
        #     if serializer.is_valid():
        #         serializer.save()
        #     print('data imported from CSV !!!')
        # return Response(serializer.data, status=status.HTTP_201_CREATED)

                # Example -> Book.objects.create(ISBNCode=row[0], title=row[1], aut

class PlatformDestroyView(APIView):
    """Delete all elements in Platform"""
    def delete(self, request):
        elements = Platform.objects.all()
        elements.delete()
        return Response({"message": "All elements in Platform has been deleted."}, status=204)


exchange_rate_PLN_EUR = 0.22         # value must be parsed  in other module

class Sale_avgView(APIView):
    def get(self, request):
        serializer = Sale_avg.objects.all().order_by('brandId')
        serializer = Sale_avgSerializer(serializer, many=True)
        return Response({"sale_avg": serializer.data})



class Sale_avgDestroyView(APIView):
    """Delete all elements in Sale_avg"""
    def delete(self, request):
        elements = Sale_avg.objects.all()
        elements.delete()
        return Response({"message": "All elements in Sale_avg has been deleted."}, status=204)


class FavoritesListView(generics.ListAPIView):
    """GET List users favorites by userId"""
    serializer_class = FavoritesSerializer
    pagination_class = PaginationPlatform

    def get_queryset(self):
        # print('request.user=', self.request.user.id)
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
#         print('request.data=', request.data)
        favorite = FavoritesCreateSerializer(data=request.data)
        if favorite.is_valid():
            favorite.save()
        return Response(favorite.data, status=status.HTTP_201_CREATED)


class FavoritesDeleteView(APIView):
    """Delete Favorite ad with id=pk"""
#     queryset = Favorites.objects.filter(id=pk)
    serializer_class = FavoritesSerializer

    def delete(self, request, pk):
        favorites_id = self.kwargs['pk']
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


# сохранение данных from home(sale) platform в бд
def create_platform_sale(self):
    CSV_PATH = './ads/otomoto_data.csv'  # Csv file path
    with open(CSV_PATH, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar=',')
        for row in reader:
            # print('row=', row)
            plat = Platform()
            brands_list=Brands.objects.all().values_list('name',flat=True)
            if row[0]  in brands_list:             #check if parsed brand name in Brands
                plat.platform_code = False
                plat.brandId_id = Brands.objects.filter(name=row[0]).first().id
                plat.model = row[1]
                plat.year = row[2]
                plat.price = row[3]
                plat.currency = row[4]
                plat.ad_link = row[5]
                # print('plat=', plat)
                plat.save()
            else:
                print('FALLLLLSEEE')
                # break
    return HttpResponseRedirect("/api/platform")

# сохранение данных from home(sale) platform в бд
def create_platform_buy(self):
    CSV_PATH = './ads/mobile_data.csv'  # Csv file path
    with open(CSV_PATH, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar=';')
        for row in reader:
            plat = Platform()
            brands_list=Brands.objects.all().values_list('name',flat=True)
            if row[0]  in brands_list:             #check if parsed brand name in Brands
                plat.platform_code = True
                plat.brandId_id = Brands.objects.filter(name=row[0]).first().id
                plat.model = row[1]
                plat.year = row[2]
                plat.price = row[3]
                plat.currency = row[4]
                plat.photo_link = row[5]
                plat.ad_link = row[6]
                print('plat=', plat)
                plat.save()
            else:
                print('FALLLLLSEEE')
                # break
    return HttpResponseRedirect("/api/platform")


"""Create examples with average price"""
def create_sale_avg_examples(self):
    examples = Platform.objects.filter(platform_code=0).order_by('brandId_id').values_list(
            'brandId_id', 'model', 'year', 'price').iterator()
    grouped_cars_by_brand_model_year = defaultdict(list)
    for brandId_id, model, year, price in examples:
        grouped_cars_by_brand_model_year[brandId_id, model, year].append(price)
    print('grouped_cars_by_brand_model_year=', len(grouped_cars_by_brand_model_year))
        # avg_examples = []
    for k, v in grouped_cars_by_brand_model_year.items():
            # print('k[0]=', k[0])
            # print('k[1]=', k[1])
            # print('k[2]=', k[2])
            # print('v[0]=', v[0])
            # avg_examples.append({
            # print('Brands.objects.filter(name=k[0]).first()=', Brands.objects.filter(id=k[0]).first().id)
            avg = Sale_avg()
            avg.brandId_id =  Brands.objects.filter(id=k[0]).first().id
            avg.model =  k[1]
            avg.year =  k[2]
            avg.avg_price = int((sum(v) / len(v)) * exchange_rate_PLN_EUR)
            # print('avg=', avg)
            avg.save()

        #         "brandId_id": k[0],
        #         "model": k[1],
        #         "year": k[2],
        #         "avg_price": int((sum(v) / len(v)) * exchange_rate_PLN_EUR)
        #     })
        # print('avg_examples=', avg_examples)
        # serializer = Sale_avgCreateSerializer(data=avg_examples, many=True)
        # print('serializer=', serializer)
        # if serializer.is_valid():
        #     serializer.save()
    return HttpResponseRedirect("/api/sale_avg")