import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeMovieComponent } from './home-movie.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StorageService } from 'src/app/core/services/storage.service';

describe('HomeMovieComponent', () => {
  let component: HomeMovieComponent;
  let fixture: ComponentFixture<HomeMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(StorageService, { delay: 500 }),
      ],
      declarations: [ HomeMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
