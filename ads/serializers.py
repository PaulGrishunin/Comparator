from rest_framework import serializers
from .models import Users, Brands, Platform, Sale_avg, Favorites

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('pk','username', 'email', 'password', 'create_time')


class BrandsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brands
        fields = ('id', 'name')


class PlatformListSerializer(serializers.ModelSerializer):
    brandId = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Platform
        fields = ('id', 'platform_code', 'brandId', 'model', 'year', 'price', 'currency', 'photo_link', 'date_add', 'ad_link' )



class PlatformCreateSerializer(serializers.ModelSerializer):
    # brandId = serializers.StringRelatedField(many=False, read_only=True)
    # brandId = serializers.PrimaryKeyRelatedField(queryset=Brands.objects.all(), source='brand.id')

    class Meta:
        model = Platform
        fields = "__all__"



class Sale_avgSerializer(serializers.ModelSerializer):
    brandId = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Sale_avg
        fields = ('brandId', 'model', 'year', 'avg_price')


class Sale_avgCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sale_avg
        fields = ('brandId', 'model', 'year', 'avg_price')


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



