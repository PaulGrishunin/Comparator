from rest_framework import serializers
from .models import  Brands, Platform, Sale_avg, Favorites


class BrandsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brands
        fields = "__all__"


class PlatformListSerializer(serializers.ModelSerializer):
    brandId = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Platform
        fields = ('id', 'platform_code', 'brandId', 'model', 'year', 'fuel',
                  'country', 'place', 'price', 'price_diff', 'currency', 'photo_link', 'date_add', 'ad_link' )

class PlatformCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Platform
        fields = "__all__"


class Sale_avgSerializer(serializers.ModelSerializer):
    brandId = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Sale_avg
        fields = ('id', 'brandId', 'model', 'year', 'fuel', 'avg_price')


class Sale_avgCreateSerializer(serializers.ModelSerializer):
    brandId_id = serializers.SlugRelatedField(slug_field="name", read_only=True)
    class Meta:
        model = Sale_avg
        fields = ('brandId_id', 'model', 'year', 'fuel', 'avg_price')


class FavoritesSerializer(serializers.ModelSerializer):
    userId = serializers.StringRelatedField(many=False)
    platformId = PlatformListSerializer(read_only=True)

    class Meta:
        model = Favorites
        fields = "__all__"

class FavoritesCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favorites
        fields = ('userId', 'platformId')