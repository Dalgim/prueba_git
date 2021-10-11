import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = environment.urlEndPoint;
  constructor(
    private httpClient: HttpClient
  ) { }

  // mandamos el listado de todas las peliculas de la bd  movies
  // de forma asincrona
  getAllMovies = async(): Promise<Movie[]> =>{
    return await this.httpClient.get(`${this.url}movies`).toPromise() as Promise<Movie[]>;
  }

  // creamos un metodo que despliegue la informacion de cada pelicula
  // al seleccionar una del listado de la tabla
  getMovieById = async(id: number): Promise<Movie> =>{
    return await this.httpClient.get(`${this.url}movies/${id}`).toPromise() as Promise<Movie>;
  }

  // creamos un metodo para eliminar una pelicula
  deleteMovieById = async(id: number | undefined): Promise<Object> =>{
    return await this.httpClient.delete(`${this.url}movies/${id}`).toPromise() as Promise<Object>;
  }

  // creamos un metodo para crear una nueva pelicula
  createMovie = async(movie: Movie): Promise<Object> =>{
    return await this.httpClient.post(`${this.url}movies`, movie).toPromise();
  }

  // creamos un metodo para actualizar un registro de la bd
  updateMovie = async(id: string | number | null, movie: Movie): Promise<Object> =>{
    return await this.httpClient.put(`${this.url}movies/${id}`, movie).toPromise();
  }

}
