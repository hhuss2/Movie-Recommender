import React from 'react';
import './MovieCarousel.css';

const MovieCarousel = ({ movies }) => {
    const defaultPoster = 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <div className="movie-carousel">
            {movies.length === 0 ? (
                <p>No movies to display.</p>
            ) : (
                movies.map((movie, index) => (
                    <div key={movie.id || index} className="carousel-item">
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultPoster}
                            alt={`Movie ${index + 1}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = defaultPoster;
                            }}
                        />
                    </div>
                ))
            )}
        </div>
    );
};

export default MovieCarousel;
