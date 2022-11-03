import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './../models/movie';
import { AppSettings } from 'src/app/core/constants/app-settings';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url_base: string = AppSettings.getApi('movies');

  constructor(private _httpClient: HttpClient) {
    this.getAllMovies();
  }

  /**
   * Allows get all movies
   * @param null
   */
  public getAllMovies() {
    return this._httpClient.get(this.url_base);
  }

  /**
   * Allows create new movie
   * @param movie Movie
   */
  createMovie(newMovie: Movie) {
    let data = this.getStorage();
    data.push(newMovie);
    sessionStorage.setItem('movies', JSON.stringify(data));
  }

  /**
   * Allows update movie
   * @param movie Movie
   */
  updateMovie(movie: Movie) {
    let data = this.getStorage();

    data.filter((currentMovie, index) => {
      if (currentMovie.id === movie.id) {
        data[index] = {
          ...movie,
        };
      }
    });

    sessionStorage.setItem('movies', JSON.stringify(data));
  }

  /**
   * Allows remove movie selected by Id
   * @param movie number | Movie
   */
  deleteMovie(movie: Movie) {
    const id = typeof movie === 'number' ? movie : movie.id;
    let data = this.getStorage();

    data = _.remove(data, (currentMovie) => {
      return currentMovie.id !== movie.id;
    });

    sessionStorage.setItem('movies', JSON.stringify(data));
  }

  /**
   * Allows get movie by Id
   * @param movieId number
   */
  public getMovieById(movieId: string) {
    const movieList = JSON.parse(sessionStorage.getItem('movies'));

    return movieList.filter((movie) => movie.id === parseInt(movieId));
  }

  /**
   * Allows add to favorite
   * @param movie Movie
   */
   addFavoriteMovie(movie: Movie) {
    let data = this.getStorage();

    data.filter((currentMovie, index) => {
      if (currentMovie.id === movie.id) {
        data[index] = {
          ...movie,
          isFavorite: !currentMovie.isFavorite
        };
      }
    });

    sessionStorage.setItem('movies', JSON.stringify(data));
    return data;
  }

  /**
   * Allows get movies from session storage
   * @param null
   */
  public getStorage() {
    return JSON.parse(sessionStorage.getItem('movies'));
  }
}
