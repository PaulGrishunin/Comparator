from django.db import models



class Users(models.Model):
    username = models.CharField("User name", max_length=20)
    email = models.EmailField()
    password = models.CharField(max_length=32)
    create_time = models.DateTimeField("Create time", auto_now_add=True)

    def __str__(self):
        return self.username


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
    currency = models.CharField(max_length=3)
    photo_link = models.URLField(null=True)
    date_add = models.DateTimeField("Created at")
    ad_link = models.URLField()

    def __str__(self):
        return self.price   
    
    
class Sale_avg(models.Model):
    brandId = models.ForeignKey(Brands, on_delete=models.CASCADE)
    model = models.CharField(max_length=25)
    year = models.IntegerField()
    avg_price =  models.IntegerField()

    def __str__(self):
        return self.avg_price


class Favorites(models.Model):
    userId = models.ForeignKey(Users, verbose_name="user", on_delete=models.CASCADE)
    platformId = models.ForeignKey(Platform, verbose_name="ad", on_delete=models.CASCADE)

    def __str__(self):
        return self.userId
