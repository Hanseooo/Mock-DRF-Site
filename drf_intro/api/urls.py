from django.urls import path
from . import views

urlpatterns = [
    #path('', views.getData),   
    path('add/', views.addItem), 
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('users/', views.get_users),
]
