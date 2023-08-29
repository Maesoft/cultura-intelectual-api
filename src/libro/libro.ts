export class Libro {
     id: number;
     titulo: string;
     autor: string;
     lugar_de_impresion: string;
     fecha_de_impresion: string;
     editorial: string;
     coleccion: string;
     precio:number;
     ventas: number;
     imagen: string;
     comentarios: [];
  
    constructor(
      id: number,
      titulo: string,
      autor: string,
      lugar_de_impresion: string,
      fecha_de_impresion: string,
      editorial: string,
      coleccion: string,
      ventas: number,
      precio:number,
      imagen: string,
      comentarios: []
    ) {
      this.id = id;
      this.titulo = titulo;
      this.autor = autor;
      this.lugar_de_impresion = lugar_de_impresion;
      this.fecha_de_impresion = fecha_de_impresion;
      this.editorial = editorial;
      this.coleccion = coleccion;
      this.precio = precio;
      this.ventas = ventas;
      this.imagen = imagen;
      this.comentarios = comentarios;
    }
  }
  