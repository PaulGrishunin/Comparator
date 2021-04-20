from django.contrib import admin
from .models import Users, Brands, Sale_avg, Favorites

admin.site.register(Users)
admin.site.register(Brands)
admin.site.register(Sale_avg)
admin.site.register(Favorites)

