const BASE_URL = 'http://localhost:8000/movies';

export const fetchMovieTitles = async () => {
    const response = await fetch(`${BASE_URL}/titles/`);
    if (!response.ok) {
        throw new Error('Error fetching movie titles');
    }
    const data = await response.json();
    return data;
};


export const fetchRecommendations = async (movieTitle, genre, minRating) => {
    try {
        // Encode movie title and parameters
        const encodedTitle = encodeURIComponent(movieTitle);
        const genreParam = genre ? `genre/${encodeURIComponent(genre)}` : '';
        const ratingParam = minRating ? `rating/${encodeURIComponent(minRating)}` : '';

        // Construct the URL
        const baseUrl = `http://localhost:8000/movies/recommend/${encodedTitle}/`;
        const url = genreParam && ratingParam 
            ? `${baseUrl}${genreParam}/${ratingParam}/`
            : genreParam 
                ? `${baseUrl}${genreParam}/`
                : ratingParam
                    ? `${baseUrl}${ratingParam}/`
                    : baseUrl;

        console.log('Fetching from:', url); // For debugging

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};

