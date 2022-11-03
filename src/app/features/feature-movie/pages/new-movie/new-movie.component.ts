import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';


@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {

  public movies: Array<Movie> = [];

  constructor(
    private _movieService: MovieService,
    private _router: Router
  ) {}

  
  ngOnInit(): void {}
    
  /**
   * Allows update movie
   * @param movie 
   */
   UpdateMovie(movie: Movie) {
    this._movieService.updateMovie(movie);
    this.redirectToHome();
  }

  private redirectToHome() {
    this._router.navigate(['/']);
  }
  
  /**
   * Allows create new movie
   * @param movie 
   */
  saveMovie(movie: Movie) {
    this.movies.push(movie);
    this._movieService.createMovie(movie);
    this.redirectToHome()
  }
}
