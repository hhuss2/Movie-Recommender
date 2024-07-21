import pandas as pd
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
movies = pd.read_csv('./backend/dataset.csv')
print(movies.columns)

# Create 'tags' column to be used in similarity computation
movies['tags'] = movies['overview'].fillna('') + ' ' + movies['genre'].fillna('')
new_data = movies[['id', 'title', 'tags', 'genre', 'vote_average']]


# Create CountVectorizer and transform data
cv = CountVectorizer(max_features=10000, stop_words='english')
vector = cv.fit_transform(new_data['tags'].values.astype('U')).toarray()

# Compute similarity
similarity = cosine_similarity(vector)

# Save to pickle files
with open('backend/movies/movies_list.pkl', 'wb') as f:
    pickle.dump(new_data, f)

with open('backend/movies/similarity.pkl', 'wb') as f:
    pickle.dump(similarity, f)
