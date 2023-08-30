import { Injectable } from '@nestjs/common';
import { Libro } from 'src/libro/libro';
import { NotFoundException } from '@nestjs/common/exceptions';
const BASE_URL = 'http://localhost:3030/libros/'

@Injectable()
export class LibrosService {

    //Muestra los libros
    async getLibros(): Promise<Libro[]>{
        const res = await fetch(BASE_URL);
        const parsed = await res.json()
        return parsed
    }
     //Muestra el libro por llamada
     async getLibroPorTitulo (titulo:string) : Promise<Libro[]>{
        const res = await fetch(BASE_URL);
        const parsed = await res.json()
        const libroEncontrado = parsed.find(libro => libro.titulo.toLocaleLowerCase() === titulo.toLocaleLowerCase());
       if(libroEncontrado) return libroEncontrado;
       throw new NotFoundException(`Titulo no encontrado`)
     }

    //Muestra el libro por id
    async getLibroById(id:number): Promise<Libro>{
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json()
        if(Object.keys(parsed).length)return parsed;
        throw new NotFoundException(`ID no existente`)
    }

    //Crea un nuevo libro
    async createLibro(libro:Libro){
        const id = await this.setId();
        const nuevoLibro = {...libro, id}
        const res = await fetch(BASE_URL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(nuevoLibro)
        })
        const parsed = res.json()
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
    async actualizarLibroById(id:number, body:Libro){
        const isLibro = await this.getLibroById(id)
        if(!Object.keys(isLibro).length) return

        const actualizarLibro = {
            titulo: body.titulo,
            autor: body.autor,
            lugar_de_impresion: body.lugar_de_impresion,
            fecha_de_impresion: body.fecha_de_impresion,
            editorial: body.editorial,
            coleccion: body.coleccion,
            precio: body.precio,
            ventas: body.ventas,
            imagen: body.imagen
        }

        const res = await fetch(BASE_URL + id,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(actualizarLibro)
        })
        const parsed = res.json()
        return parsed
    }
}
