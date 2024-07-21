from django.urls import path
from . import views

urlpatterns = [
    path('titles/', views.get_movie_titles, name='get_movie_titles'),
    path('recommend/<str:movie_title>/', views.recommend_movies, name='recommend_movies'),
    path('recommend/<str:movie_title>/genre/<slug:genre>/', views.recommend_movies, name='recommend_movies_genre'),
    path('recommend/<str:movie_title>/rating/<slug:min_rating>/', views.recommend_movies, name='recommend_movies_rating'),
    path('recommend/<str:movie_title>/genre/<slug:genre>/rating/<slug:min_rating>/', views.recommend_movies, name='recommend_movies_genre_rating'),
]
