# Movie-Recommender

This is a movie recommender application that provides personalized movie suggestions based on user preferences.

## Features

- **Personalized Movie Recommendations**: Get tailored movie suggestions based on your preferences.
- **Search Functionality**: Search for recommendations using a movie name. Optionally, filter by genre and minimum rating.
- **Image Carousel**: Browse movie posters in a carousel format.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Django
- **Database**: SQLite
- **Machine Learning**: scikit-learn for movie recommendation algorithms

### Clone the Repository

```sh
git clone https://github.com/hhuss2/Movie-Recommender.git
```

### Set Up the Backend

1. **Load Initial Movie Data**

   ```sh
   python load_movies.py
   ```
   
2. **Navigate to the Backend Directory**

   ```sh
   cd backend
   ```

3. **Create a Virtual Environment**

   ```sh
   python3 -m venv venv
   ```

4. **Activate the Virtual Environment**

   ```sh
   source venv/bin/activate
   ```

5. **Install Dependencies**

   ```sh
   pip install -r requirements.txt
   ```

6. **Run Migrations**

   ```sh
   python manage.py migrate
   ```

7. **Start the Development Server**

   ```sh
   python manage.py runserver
   ```

### Set Up the Frontend

1. **Navigate to the Frontend Directory**

   ```sh
   cd ../frontend
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Start the Development Server**

   ```sh
   npm start
   ```

### Access the Application

Open your web browser and navigate to `http://localhost:3000` to view the application.

### Demo
Here are some screenshots demonstrating the application's functionality:


- **Search for Recommendations**: Type a movie name to get personalized recommendations.
<img width="1430" alt="Screenshot 2024-07-21 at 9 59 16 PM" src="https://github.com/user-attachments/assets/cb478a86-dfb7-42b8-9203-a63d54c24841">

- **Browse Movie Posters**: View movie posters in a carousel format.
<img width="1429" alt="Screenshot 2024-07-21 at 10 11 58 PM" src="https://github.com/user-attachments/assets/6d2fdc9a-3b95-40fd-a4e5-3e9682a391d4">

<img width="1426" alt="Screenshot 2024-07-21 at 10 14 52 PM" src="https://github.com/user-attachments/assets/4c35394e-5b79-4c3b-b1be-124f74cd651b">

- **Filter Recommendations**: Recommendations can be filtered by genre and minimum rating.
<img width="1427" alt="Screenshot 2024-07-21 at 10 14 02 PM" src="https://github.com/user-attachments/assets/67d3ffd6-2126-4de6-a785-3b230911e840">


### Disclaimer

This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
