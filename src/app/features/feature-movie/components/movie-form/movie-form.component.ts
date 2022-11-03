import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { v4 as uuid } from 'uuid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import * as moment from 'moment';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
  @Output() onNewMovie = new EventEmitter<Movie>();
  @Output() onUpdateMovie = new EventEmitter<Movie>();

  public movieToEdit: Movie = null;
  public movieForm: FormGroup;
  public pathFile: any;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _movieService: MovieService,
    private router: Router
  ) {
    this.movieForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      release: new FormControl(this.currentDate(), Validators.required),
      image: new FormControl(null, Validators.required),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(500),
        ])
      ),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if(params.get('id')){
        const movieId = params.get('id');
        this.movieToEdit = this._movieService.getMovieById(movieId)[0];
  
        this.movieForm.get('title').setValue(this.movieToEdit?.title);
        this.movieForm
          .get('release')
          .setValue(moment(this.movieToEdit?.release).format('YYYY-MM-DD'));
        this.movieForm.get('description').setValue(this.movieToEdit?.description);
      }
    });
  }

  get title() {
    return this.movieForm.get('title');
  }
  get release() {
    return this.movieForm.get('release');
  }
  get image() {
    return this.movieForm.get('image');
  }
  get description() {
    return this.movieForm.get('description');
  }

  /**
   * Allows get image selected
   * @param event
   */
  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pathFile = reader.result;
      };

      this._changeDetector.markForCheck();
    }
  }

  /**
   * Allows submit new movie
   * @param null
   */
  onSubmitMovie() {
    const isEditing = this.movieToEdit?.image ? true : false;
    const form = this.movieForm && this.movieForm.value;
    const payload = {
      id: isEditing ? this.movieToEdit?.id : uuid(),
      title: form.title,
      release: form.release,
      image: isEditing ? this.movieToEdit?.image : this.pathFile,
      isFavorite: false,
      description: form.description,
    };

    if(this.movieToEdit) {
      this.onUpdateMovie.emit(payload); 
    } else {
      this.onNewMovie.emit(payload);
    }

    this.movieForm.reset();
  }

  /**
   * Allows get current date
   */
  private currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0, 10);
  }

  /**
   * Allows redirect to home
   */
  public backToList() {
    this.router.navigate(['/movies']);
    this.movieToEdit = null;
  }
}
