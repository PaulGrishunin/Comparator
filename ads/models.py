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
    def __repr__(self):
        return self.id


class Platform(models.Model):
    platform_code = models.BooleanField("0 - ad from sale platform; 1 - ad from buy platform", max_length=1)
    brandId = models.ForeignKey(Brands, on_delete=models.CASCADE)
    model = models.CharField(max_length=25)
    year = models.IntegerField()
    price =  models.IntegerField()
    price_diff = models.IntegerField(default=0)
    currency = models.CharField(max_length=3)
    photo_link = models.URLField(null=True)
    date_add = models.DateTimeField(auto_now_add=True)
    ad_link = models.URLField()

    def __str__(self):
        return '%s %s %s %s %s %s %s %s'% (self.id, self.platform_code, self.brandId, self.model, self.year, self.price, self.price_diff, self.currency)

    
class Sale_avg(models.Model):
    brandId = models.ForeignKey(Brands, on_delete=models.CASCADE)
    model = models.CharField(max_length=25)
    year = models.IntegerField()
    avg_price =  models.IntegerField()

    def __str__(self):
        return '%s %s %s %s' % (self.brandId, self.model, self.year, self.avg_price)


class Favorites(models.Model):
    userId = models.ForeignKey(auth_models.User, verbose_name="user", on_delete=models.CASCADE)
    platformId = models.ForeignKey(Platform, verbose_name="ad", on_delete=models.CASCADE)

    def __str__(self):
        return self.userId
