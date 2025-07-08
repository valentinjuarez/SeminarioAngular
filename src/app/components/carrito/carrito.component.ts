import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../pelicula';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  standalone: false
})
export class CarritoComponent implements OnInit {

  peliculasEnCarrito: Pelicula[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (pelis) => {
        this.peliculasEnCarrito = pelis;
      },
      error: (error) => {
        console.error('Error al obtener carrito', error);
      }
    });
  }

  eliminarDelCarrito(pelicula: Pelicula): void {
    this.carritoService.eliminarDelCarrito(pelicula);
  }

  calcularTotal(): number {
    let total = 0;
    for (let i = 0; i < this.peliculasEnCarrito.length; i++) {
      total += this.peliculasEnCarrito[i].precio;
    }
    return total;
  }

  pagar(): void {
    if (this.peliculasEnCarrito.length === 0) {
      alert('No hay productos en el carrito.');
      return;
    }

    alert('Compra realizada con éxito.');

    this.carritoService.vaciarCarrito();
  }
}


