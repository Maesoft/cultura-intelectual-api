import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { LibroDTO } from './libro.dto';
const BASE_URL = 'http://localhost:3030/libros/'

@Injectable()
export class LibrosService {

    //Muestra los libros
    async getLibros(): Promise<any>{
        const res = await fetch(BASE_URL);
        const parsed = await res.json()
        return parsed
    }
     //Muestra el libro por llamada
     async getLibroPorTitulo (titulo:string) : Promise<LibroDTO[]>{
        const res = await fetch(BASE_URL);
        const parsed = await res.json()
        const libroEncontrado = parsed.find(libro => libro.titulo.toLocaleLowerCase() === titulo.toLocaleLowerCase());
       if(libroEncontrado) return libroEncontrado;
       throw new NotFoundException(`Titulo no encontrado`)
     }

    //Muestra el libro por id
    async getLibroById(id:number): Promise<LibroDTO>{
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json()
        if(Object.keys(parsed).length)return parsed;
        throw new BadRequestException(`ID no existente`)
    }

    //Crea un nuevo libro
    async createLibro(libroDto:LibroDTO): Promise<any>{
        const id = await this.setId();
        const nuevoLibro = {...libroDto, id}    
        const res = await fetch(BASE_URL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(nuevoLibro)
        })
        const parsed = await res.json()
        return parsed
    }

    //Crea el ID  nuevo para la libros
    private async setId(): Promise<number>{
        const libros = await this.getLibros()
        const id = libros.pop().id + 1;
        return id
    }

    //Elimina el libro segun el ID
    async eliminarLibroById(id:number){
        const res = await fetch(BASE_URL + id,{
            method:'DELETE',
        });
        const parsed = await res.json()
        return parsed
    }

    //Actualizar el libro segun el ID
    async actualizarLibroById(id: number, body: LibroDTO): Promise<void> {
        const isLibro = await this.getLibroById(id);
        if (!Object.keys(isLibro).length) return;
        const actualizarLibro = {
          titulo: body.titulo ,
          autor: body.autor ,
          lugar_de_impresion: body.lugar_de_impresion ,
          fecha_de_impresion: body.fecha_de_impresion ,
          editorial: body.editorial ,
          coleccion: body.coleccion ,
          precio: body.precio ,
          ventas: body.ventas ,
          imagen: body.imagen ,
        };
    
       await fetch(BASE_URL + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(actualizarLibro),
        });
    
      }
}
