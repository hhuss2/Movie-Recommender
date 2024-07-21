from django.http import JsonResponse
import pickle
import os
from django.conf import settings
import pandas as pd
import numpy as np
import requests
import logging

# Set up logging
logger = logging.getLogger(__name__)

# Load pickled files
with open(os.path.join(settings.BASE_DIR, 'movies/movies_list.pkl'), 'rb') as f:
    movies_list = pickle.load(f)

with open(os.path.join(settings.BASE_DIR, 'movies/similarity.pkl'), 'rb') as f:
    similarity = pickle.load(f)

def get_movie_titles(request):
    # Returns the list of movie titles
    titles = movies_list['title'].tolist()
    return JsonResponse(titles, safe=False)

def recommend_movies(request, movie_title, genre=None, min_rating=None):
    # Returns movie recommendations based on the given movie title, genre, and rating
    try:
        index = movies_list[movies_list['title'] == movie_title].index[0]
    except IndexError:
        logger.error(f"Movie '{movie_title}' not found.")
        return JsonResponse({'error': 'Movie not found'}, status=404)

    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    
    recommendations = []
    for i in distances[1:11]:  # Exclude the movie itself from recommendations
        movie = movies_list.iloc[i[0]]
        movie_id = int(movie.id)  # Convert numpy int to Python int
        title = movie.title
        movie_genre = movie.genre if 'genre' in movie else ''
        movie_rating = float(movie.vote_average) if 'vote_average' in movie else 0.0  # Convert numpy float to Python float

        genre_match = not genre or genre.lower() in movie_genre.lower()
        rating_match = not min_rating or movie_rating >= float(min_rating)

        if genre_match and rating_match:
            poster_path = fetch_poster(movie_id)  # Call the TMDB API
            recommendations.append({
                'id': movie_id,
                'title': title,
                'poster_path': poster_path
            })

    logger.info(f"Recommendations for '{movie_title}': {recommendations}")
    return JsonResponse(recommendations, safe=False)

def fetch_poster(movie_id):
    api_key = settings.TMDB_API_KEY 
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}"
    response = requests.get(url).json()
    poster_path = response.get('poster_path')
    return f"https://image.tmdb.org/t/p/w500/{poster_path}" if poster_path else ''
