import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/Movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  public movieForm: FormGroup;
  public movie: Movie | undefined;
  public isEditing: boolean = false;
  private routeParamId: string | number | null = 0;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {
    // inicializamos movieForm con los datos de los input de mi componente
    // usamos validators para validar que los campos son obligatorios y en el caso
    // de la sinopsis que el tamaño minimo aceptado es de 15 caracteres
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      cover: [''],
      synopsis: ['Aqui va la sinopsis de la pelicula y es algo larga', 
      [Validators.required, Validators.minLength(15)]],
    });
   }

  ngOnInit(): void {
    this.getMovie();
  }

  // metodo del boton del componente movie-form.component.html
  onSubmit = (form: FormGroup) => {
    // verificamos si es correcta la ejecucion por medio de console.log 
    console.log(form.valid);
    // mandamos los datos de cada caja en formato json
    console.log(form.value);

    // si es valido inserta el registro
    if(form.valid){
      // validamos si estamos creando una nueva pelicula o si vamos a actualizar un registro
      // para llamar al componente de updateMovie o a createMovie de movies.services.ts
      // mediante la validacion de que si isEditing es true entonces manda a updateMovie y si no
      // manda a createMovie
      const call = (this.isEditing) 
      ? this.moviesService.updateMovie(this.routeParamId, form.value) 
      : this.moviesService.createMovie(form.value);
      // enviamos al servicio createMovie() los datos del formulario (form.value)
      //si es correcto manda la confirmacion  usando un then... catch para cachar
      // un error si el dato enviado es incorrecto y para no repetir lo mismo solo
      // colocamos un call
      call.then(res =>{
        console.log(res);
        // mandamos el alert de que el registro fue insertado correctamente
        alert('Registro Guardado con exito');
        // redirigimos a la pagina principal con el objeto router a /movies
        this.router.navigateByUrl('/movies');
      }).catch(err => {
        // si encuentra el error informa por medio de alert y por medio de console.log
        // especifica el error en consola del navegador
        alert('Ocurrio un error');
        console.log(err);
      });
    }

  }

  getMovie = () => {
    this.routeParamId = this.activatedRoute.snapshot!.paramMap.get("id");
    if(this.routeParamId){
      this.routeParamId = parseInt(this.routeParamId);
      if(this.routeParamId === 0){
        this.isEditing = false;
        return;
      }
      this.isEditing = true;
      this.moviesService.getMovieById(this.routeParamId).then(res => {
        this.movieForm.setValue({
          title: res.title,
          year: res.year,
          synopsis: res.synopsis,
          cover: res.cover
        });
        console.log(res);
      }).catch(err => {
        alert('Ocurrio un error');
        console.log(err);

      });
    }
  }

}
