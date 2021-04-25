from django.contrib import admin
from .models import  Brands, Platform, Sale_avg, Favorites

admin.site.register(Brands)
admin.site.register(Platform)
admin.site.register(Sale_avg)
admin.site.register(Favorites)

