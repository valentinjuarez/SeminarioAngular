import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../pelicula';
import { PeliculasService } from '../../services/peliculas.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss'],
  standalone: false
})
export class PeliculasComponent implements OnInit {

  peliculas: Pelicula[] = [];

  constructor(
    private peliculasService: PeliculasService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.peliculasService.obtenerPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;
        console.log('Películas recibidas:', data);
      },
      error: (error) => {
        console.error('Error al cargar películas', error);
      }
    });
  }

  agregarAlCarrito(pelicula: Pelicula): void {
  this.carritoService.agregarAlCarrito(pelicula);
}

}
