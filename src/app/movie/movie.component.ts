import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/Movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movie$: Promise<Movie> | undefined;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  // creamos el metodopara obtener el id
  getMovie = async() => {
    let routeParamId: string | number | null = this.activatedRoute.snapshot!.paramMap.get("id");
    if(routeParamId){
      routeParamId = parseInt(routeParamId);
      this.movie$ = this.moviesService.getMovieById(routeParamId);
    }
  }

}
