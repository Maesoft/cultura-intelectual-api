import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { LibroDto } from './dto/libro.dto';
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
     async getLibroPorTitulo (titulo:string) : Promise<LibroDto[]>{
        const res = await fetch(BASE_URL);
        const parsed = await res.json()
        const libroEncontrado = parsed.find(libro => libro.titulo.toLocaleLowerCase() === titulo.toLocaleLowerCase());
       if(libroEncontrado) return libroEncontrado;
       throw new NotFoundException(`Titulo no encontrado`)
     }

    //Muestra el libro por id
    async getLibroById(id:number): Promise<LibroDto>{
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json()
        if(Object.keys(parsed).length)return parsed;
        throw new BadRequestException(`ID no existente`)
    }

    //Crea un nuevo libro
    async createLibro(libroDto: LibroDto) {
        const id = await this.setId();
    
        // Define un conjunto de claves permitidas
        const clavesPermitidas = [
            'titulo',
            'autor',
            'lugar_de_impresion',
            'fecha_de_impresion',
            'editorial',
            'coleccion',
            'precio',
            'ventas',
            'imagen',
            'id',
        ];
    
        // Filtra las claves del objeto nuevoLibro que no están permitidas
        const clavesNoPermitidas = Object.keys(libroDto).filter(
            clave => !clavesPermitidas.includes(clave)
        );
    
        if (clavesNoPermitidas.length > 0) {
            throw new Error(`Elementos no permitidos en el objeto: ${clavesNoPermitidas.join(', ')}`);
        }
    
        const nuevoLibro = {
            ...libroDto,
            id: id,
        };
    
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoLibro),
        });
    
        const parsed = await res.json();
        return parsed;
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
    async actualizarLibroById(id: number, libroDto: LibroDto): Promise<void> {
        const isLibro = await this.getLibroById(id);
        
        if (!Object.keys(isLibro).length) {
            throw new NotFoundException(`Libro con ID ${id} no encontrado`);
        }

        const actualizarLibro = {
          titulo: libroDto.titulo ,
          autor: libroDto.autor ,
          lugar_de_impresion: libroDto.lugar_de_impresion ,
          fecha_de_impresion: libroDto.fecha_de_impresion ,
          editorial: libroDto.editorial ,
          coleccion: libroDto.coleccion ,
          precio: libroDto.precio ,
          ventas: libroDto.ventas ,
          imagen: libroDto.imagen ,
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
