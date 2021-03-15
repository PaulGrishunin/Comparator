from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Users
from .models import Platform
 
# получение данных из бд
def index(request):
    people = Users.objects.all()
    return render(request, "index.html", {"people": people})
 
def platform(request):
    ads = Platform.objects.all()
    return render(request, "platform.html", {"ads": ads})


# сохранение данных в бд
def create(request):
    if request.method == "POST":
        tom = Users()
        tom.username = request.POST.get("username")
        tom.email = request.POST.get("email")
        tom.password = request.POST.get("password")
        tom.save()
    return HttpResponseRedirect("/")
