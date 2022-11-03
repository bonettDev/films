import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-movie',
  templateUrl: './home-movie.component.html',
  styleUrls: ['./home-movie.component.scss'],
  providers: [MovieService],
})
export class HomeMovieComponent implements OnInit {
  public movies: Array<Movie> = [];
  public selectedMovie: Object = null;

  constructor(private _movieService: MovieService, private route: Router) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Allows get all movies from storage
   */
  getMovies() {
    if (
      sessionStorage.getItem('movies') === null ||
      sessionStorage.getItem('movies') == undefined
    ) {
      this.fetchMovies();
    } else {
      this.movies = this._movieService.getStorage();
    }
  }

  fetchMovies() {
    this._movieService.getAllMovies().subscribe((movies: Movie[]): void => {
      sessionStorage.setItem('movies', JSON.stringify(movies));
      this.movies = movies;
    });
  }

  /**
   * Allows edit movie from movie list
   * @param movie Movie
   */
   editMovie(movie: Movie) {
    this.route.navigate([`/edit_movie/${movie.id}`]);
  }
  
  /**
   * Allows remove movie from movie list
   * @param movie Movie
   */
  removeMovie(movie: Movie) {
    this.movies = _.remove(this.movies, (currentMovie) => {
      return currentMovie.id !== movie.id;
    });

    this._movieService.deleteMovie(movie);
    this.selectedMovie = null;
  }
  
  /**
   * Allows add to favorite list
   * @param movie Movie
   */
  addFavoriteMovie(movie: Movie) {
    const movies = this._movieService.addFavoriteMovie(movie);
    this.movies = movies;
    this.selectedMovie = null;
  }

  /**
   * Allows select movie to show details
   * @param movie Movie
   */
  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }
}
