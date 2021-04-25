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

# def index(request, path=''):
#     return render(request, 'index.html')

class BrandsListView(generics.ListAPIView):
    queryset = Brands.objects.all().order_by('name')
    serializer_class = BrandsSerializer



class PlatformListView(generics.ListAPIView):
    """Get List elements of Platform"""
    queryset = Platform.objects.all().order_by('price')
    serializer_class = PlatformListSerializer
    pagination_class = PaginationPlatform


class PlatformLView(generics.ListAPIView):
    serializer_class = PlatformListSerializer
    filter_backends = (DjangoFilterBackend, )
    filterset_class = PlatformFilter
    pagination_class = PaginationPlatform

    def get_queryset(self):
        price_dif = self.kwargs['dif']
        # print('price_dif=', price_dif)
        filtered_ids=[]
        for e in Platform.objects.filter(platform_code=1):
            for s in Sale_avg.objects.all():
                if (e.brandId, e.model, e.year)==(s.brandId, s.model, s.year) and (s.avg_price - e.price) >= price_dif :
                    print("result=", e)
                    e.price_diff = s.avg_price - e.price
                    e.save()
                    filtered_ids.append(e.id)
        queryset = Platform.objects.filter(pk__in=filtered_ids)
        # print('request.user=', self.request.user)
        return queryset.order_by('-date_add')



class PlatformCreateView(generics.CreateAPIView):
    """Add elements to Platform"""
    serializer_class = PlatformCreateSerializer


class PlatformDestroyView(APIView):
    """Delete all elements in Platform"""
    def delete(self, request):
        elements = Platform.objects.all()
        elements.delete()
        return Response({"message": "All elements in Platform has been deleted."}, status=204)


exchange_rate_PLN_EUR = 0.22         # value must be parsed

class Sale_avgView(APIView):
    def get(self, request):
        print('request.user=', self.request.user)
        serializer = Sale_avg.objects.all().order_by('brandId')
        serializer = Sale_avgSerializer(serializer, many=True)
        return Response({"sale_avg": serializer.data})

    """Create examples with average price"""
    def post(self, request):
        examples = Platform.objects.filter(platform_code=0).order_by('brandId').values_list(
            'brandId', 'model', 'year', 'price').iterator()
        grouped_cars_by_brand_model_year = defaultdict(list)
        # print('examples=', examples)
        for brandId, model, year, price in examples:
            grouped_cars_by_brand_model_year[brandId, model, year].append(price)
        # print('grouped_cars_by_brand_model_year=', grouped_cars_by_brand_model_year)
        avg_examples = []
        for k, v in grouped_cars_by_brand_model_year.items():
            avg_examples.append({
                "brandId": k[0],
                "model": k[1],
                "year": k[2],
                "avg_price": (sum(v) / len(v)) * exchange_rate_PLN_EUR
            })
        serializer = Sale_avgCreateSerializer(data=avg_examples, many=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    """Delete all elements in Sale_avg"""
    def delete(self, request):
        elements = Sale_avg.objects.all()
        elements.delete()
        return Response({"message": "All elements in Sale_avg has been deleted."}, status=204)



class FavoritesListView(generics.ListAPIView):
    """GET List users favorites by userId"""
    serializer_class = FavoritesSerializer

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
    def post(self, request):
        request.data["userId"] = self.request.user.id
        favorite = FavoritesCreateSerializer(data=request.data)
        if favorite.is_valid():
            favorite.save()
        return Response(favorite.data, status=status.HTTP_201_CREATED)


class FavoritesDeleteView(generics.DestroyAPIView):
    """Delete Favorite ad with id=pk"""
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer





# получение данных из бд
def index(request):
    people = User.objects.all()
    # print('request.user=', request.user)
    return render(request, "index.html", {"people": people})


def platform(request):
    ads = Platform.objects.all()
    return render(request, "platform.html", {"ads": ads})


# сохранение данных в бд
def create(request):
    if request.method == "POST":
        tom = User()
        tom.username = request.POST.get("username")
        tom.email = request.POST.get("email")
        tom.password = request.POST.get("password")
        tom.save()
    return HttpResponseRedirect("/")
