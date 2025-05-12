from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('Tostador/', views.tostador, name='T_Tostador'),
    path('Mezclado/', views.home, name='T_Mezclado'),
    path('Configuracion/', views.home, name='T_Configuracion'),
    path('Graficas/', views.graficas_y_datos, name='graficas'),
    path('descargar_excel/', views.generacion_excel, name='descargar_excel'),
    path('descargar_pdf/', views.generacion_pdf, name='descargar_pdf'),
]
