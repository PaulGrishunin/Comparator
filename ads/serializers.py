from rest_framework import serializers
from .models import  Brands, Platform, Sale_avg, Favorites

# class UsersSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Users
#         fields = ('pk','username', 'email', 'password', 'create_time')


class BrandsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brands
        fields = "__all__"


class PlatformListSerializer(serializers.ModelSerializer):
    brandId = serializers.SlugRelatedField(slug_field="name", read_only=True)
    # price_diff = Sale_avg.avg_price - Platform.price
    class Meta:
        model = Platform
        fields = ('id', 'platform_code', 'brandId', 'model', 'year', 'price', 'price_diff', 'currency', 'photo_link', 'date_add', 'ad_link' )



class PlatformCreateSerializer(serializers.ModelSerializer):
    # platform_code = serializers.BooleanField()
    # brandId = serializers.PrimaryKeyRelatedField(queryset=Brands.objects.all(), source='brand.id')
    # brandId = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # price_diff = Sale_avg.avg_price - Platform.price
    class Meta:
        model = Platform
        fields = "__all__"  #('id', 'platform_code', 'brandId', 'model', 'year', 'price', 'price_diff', 'currency', 'photo_link', 'date_add', 'ad_link' )



class Sale_avgSerializer(serializers.ModelSerializer):
    brandId = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Sale_avg
        fields = ('id', 'brandId', 'model', 'year', 'avg_price')


class Sale_avgCreateSerializer(serializers.ModelSerializer):
    brandId_id = serializers.SlugRelatedField(slug_field="name", read_only=True)
    class Meta:
        model = Sale_avg
        fields = ('brandId_id', 'model', 'year', 'avg_price')


class FavoritesSerializer(serializers.ModelSerializer):
    userId = serializers.StringRelatedField(many=False)
    platformId = PlatformListSerializer(read_only=True)

    class Meta:
        model = Favorites
        fields = "__all__"

class FavoritesCreateSerializer(serializers.ModelSerializer):
    # userId = serializers.StringRelatedField(many=False)
    # platformId = PlatformListSerializer(read_only=True)
    class Meta:
        model = Favorites
        fields = ('userId', 'platformId')



