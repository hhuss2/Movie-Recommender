import React, { useState, useEffect } from 'react';
import { fetchRecommendations, fetchMovieTitles } from '../api';
import MovieCarousel from './MovieCarousel';
import './MovieSearch.css';
import tmdbLogo from './tmdb_logo.svg'; 

const movieIds = [
    550, 1366, 299536, 297762, 19995, 4922, 142061, 578, 597, 1726, 102382, 503314, 103
];

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
console.log('API Key:', API_KEY);

const MovieSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const [titles, setTitles] = useState([]);
    const [filteredTitles, setFilteredTitles] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [carouselMovies, setCarouselMovies] = useState([]);
    const [genreFilter, setGenreFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');

    useEffect(() => {
        const loadCarouselMovies = async () => {
            try {
                const moviePromises = movieIds.map(id =>
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
                        .then(response => response.json())
                );
                const movies = await Promise.all(moviePromises);
                setCarouselMovies(movies);
            } catch (error) {
                console.error('Error fetching movie details for carousel:', error);
                setError('Error fetching movie details for carousel.');
            }
        };

        loadCarouselMovies();
    }, []);

    useEffect(() => {
        const loadTitles = async () => {
            try {
                const titles = await fetchMovieTitles();
                setTitles(titles);
            } catch (error) {
                setError('Error fetching movie titles.');
            }
        };

        loadTitles();
    }, []);

    useEffect(() => {
        if (inputValue) {
            setFilteredTitles(titles.filter(title =>
                title.toLowerCase().includes(inputValue.toLowerCase())
            ));
            setShowSuggestions(true);
        } else {
            setFilteredTitles([]);
            setShowSuggestions(false);
        }
    }, [inputValue, titles]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSuggestionClick = (title) => {
        setInputValue(title);
        setShowSuggestions(false);
    };

    const handleSearch = async () => {
        try {
            const data = await fetchRecommendations(inputValue, genreFilter, ratingFilter);
            setRecommendations(data);
            setError('');
        } catch (error) {
            setError('Error fetching recommendations.');
        }
    };

    return (
        <div className="MovieSearch">
            <h1>Movie Recommender</h1>
            {/* Display the carousel with movie posters */}
            <MovieCarousel movies={carouselMovies} />
            <div className="search-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type to filter movies"
                    className="search-input"
                />
                {showSuggestions && (
                    <ul className="suggestions-list">
                        {filteredTitles.map((title, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(title)}
                                className="suggestion-item"
                            >
                                {title}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="filter-container">
                    <div className="filter-item">
                        <label htmlFor="genreFilter">Genre (optional):</label>
                        <select
                            id="genreFilter"
                            value={genreFilter}
                            onChange={(e) => setGenreFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Genres</option>
                            <option value="Drama">Drama</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Action">Action</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Crime">Crime</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            {/* Add more genres as needed */}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label htmlFor="ratingFilter">Min Rating (optional):</label>
                        <input
                            id="ratingFilter"
                            type="number"
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            placeholder="Min Rating"
                            className="filter-input"
                        />
                    </div>
                </div>
                <button onClick={handleSearch} className="search-button">Show Recommendations</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="movie-recommendations">
                {recommendations.length > 0 && (
                    <div className="recommendations-scroll">
                        {recommendations.map((movie) => (
                            <div key={movie.id} className="recommendation-item">
                                <h2>{movie.title}</h2>
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200'}
                                    alt={movie.title}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <footer className="tmdb-attribution">
                <p>
                This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
                </p>
                <img src={tmdbLogo} alt="TMDB Logo" style={{ width: '100px' }} />
            </footer>
        </div>
    );
};

export default MovieSearch;
