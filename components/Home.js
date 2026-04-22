import { useState, useEffect } from 'react';
import { Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Movie from './Movie';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';

function Home() {

  
  const [likedMovies, setLikedMovies] = useState([]);

  
  const [moviesData, setMoviesData] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(res => res.json())
      .then(data => {
        setMoviesData(data.movies);
      })
      .catch(err => console.error(err));
  }, []);


  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.includes(movieTitle)) {
      setLikedMovies(likedMovies.filter(movie => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  
  const likedMoviesPopover = likedMovies.map((title, i) => (
    <div key={i} className={styles.likedMoviesContainer}>
      <span className="likedMovie">{title}</span>
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={() => updateLikedMovies(title)}
        className={styles.crossIcon}
      />
    </div>
  ));

  const popoverContent = (
    <div className={styles.popoverContent}>
      {likedMoviesPopover}
    </div>
  );

 
  const movies = moviesData.map((movie, i) => {
    const isLiked = likedMovies.includes(movie.title);

    return (
      <Movie
        key={i}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
        title={movie.title}
        overview={movie.overview}
        poster={movie.poster_path}
        voteAverage={movie.vote_average}
        voteCount={movie.vote_count}
      />
    );
  });

  return (
    <div className={styles.main}>

      
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>

        
        <Popover
          title="Liked movies"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
        >
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>

      
      <div className={styles.title}>LAST RELEASES</div>

      
      <div className={styles.moviesContainer}>
        {movies}
      </div>

    </div>
  );
}

export default Home;