from django.db import models
from authentication import models as auth_models
from django.contrib.auth.models import User

# class Users(models.Model):
#     username = models.CharField("User name", max_length=20)
#     email = models.EmailField()
#     password = models.CharField(max_length=32)
#     create_time = models.DateTimeField("Create time", auto_now_add=True)
#
#     def __str__(self):
#         return '%s %s' % (self.username, self.email)


class Brands(models.Model):
    name = models.CharField("Marka", max_length=20)
    
    def __str__(self):
        return self.name

    # def get_id(self):
    #     return self.id


class Platform(models.Model):
    platform_code = models.BooleanField("0 - ad from sale platform; 1 - ad from buy platform", max_length=1)
    brandId = models.ForeignKey(Brands, on_delete=models.CASCADE)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    fuel = models.CharField(max_length=50)
    country = models.CharField(max_length=10, null=True)
    place = models.CharField(max_length=50, null=True)
    price =  models.IntegerField()
    price_diff = models.IntegerField(default=0)
    currency = models.CharField(max_length=3)
    photo_link = models.URLField(max_length=300, null=True)
    date_add = models.DateTimeField(auto_now_add=True)
    ad_link = models.URLField()

    def __str__(self):
        return ' %s %s %s %s %s %s %s %s'% (self.platform_code, self.brandId, self.model, self.year, self.fuel, self.price, self.price_diff, self.currency)

    # def create(self, platform_code, brandId, model, year, price, currency, photo_link, ad_link):
    #     platform = self.create(platform_code=platform_code, brandId=brandId, model=model, year= year,
    #                            price=price, currency=currency, photo_link=photo_link, ad_link=ad_link)

        # return platform
    
class Sale_avg(models.Model):
    brandId = models.ForeignKey(Brands, on_delete=models.CASCADE)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    fuel = models.CharField(max_length=50)
    avg_price =  models.IntegerField()

    def __str__(self):
        return '%s %s %s %s' % (self.brandId, self.model, self.year, self.avg_price)


class Favorites(models.Model):
    userId = models.ForeignKey(auth_models.User, verbose_name="user", on_delete=models.CASCADE)
    platformId = models.ForeignKey(Platform, verbose_name="ad", on_delete=models.CASCADE)

    def __str__(self):
        return self.userId
