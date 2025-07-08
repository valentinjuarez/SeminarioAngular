import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pelicula } from '../pelicula';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: Pelicula[] = [];
  private carritoSubject = new BehaviorSubject<Pelicula[]>([]);

  constructor() {}

  agregarAlCarrito(pelicula: Pelicula): void {
    const existe = this.carrito.find(p => p.id === pelicula.id);
    if (!existe) {
      if (pelicula.stock > 0) {
        this.carrito.push(pelicula);
        pelicula.stock--;  // Esto modifica el objeto original, se reflejará en la lista
        this.carritoSubject.next(this.carrito);
      } else {
        alert('No hay stock disponible para esta película.');
      }
    } else {
      alert('Esta película ya está en el carrito.');
    }
  }
  eliminarDelCarrito(pelicula: Pelicula): void {
  const index = this.carrito.findIndex(p => p.id === pelicula.id);
  if (index !== -1) {
    this.carrito[index].stock++; 
    this.carrito.splice(index, 1);
    this.carritoSubject.next(this.carrito);
  }
}

vaciarCarrito(): void {
  this.carrito = [];
  this.carritoSubject.next(this.carrito);
}



  obtenerCarrito(): Observable<Pelicula[]> {
    return this.carritoSubject.asObservable();
  }
}

