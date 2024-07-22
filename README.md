# Movie-Recommender

This is a movie recommender application that provides personalized movie suggestions based on user preferences.

## Features

- **Personalized Movie Recommendations**: Get tailored movie suggestions based preferences.
- **Search Functionality**: Search for movies after inputting a movie name. Inputting genre and min rating are optional.
- **Image Carousel**: Browse movie posters in a carousel format.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Django
- **Database**: SQLite
- **Machine Learning**: scikit-learn for movie recommendation algorithms

## Usage

### Clone the Repository

```sh
git clone https://github.com/hhuss2/Movie-Recommender.git
```

### Set Up the Backend

1. **Navigate to the Backend Directory**

   ```sh
   cd Movie-Recommender/backend
   ```

2. **Create a Virtual Environment**

   ```sh
   python3 -m venv venv
   ```

3. **Activate the Virtual Environment**

   ```sh
   source venv/bin/activate
   ```

4. **Install Dependencies**

   ```sh
   pip install -r requirements.txt
   ```

5. **Run Migrations**

   ```sh
   python manage.py migrate
   ```

6. **Start the Development Server**

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
