import { Controller,Get,Param, Post, Body , Delete, Put} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { Libro } from 'src/libro/libro';

@Controller('libros')
export class LibrosController {
    constructor(private readonly librosService: LibrosService) {}

    @Get()
    getLibros(): Promise<Libro[]>{
        return this.librosService.getLibros()
    }

    @Get("/:id")
    getLibrosById(@Param("id") id:number): Promise <Libro>{
        return this.librosService.getLibroById(id)
    }

    @Post()
    async crearLibro(@Body() body: Promise<Libro>){
        const libro: Libro = await body;
        return this.librosService.createLibro(libro)
    }

    @Delete("/:id")
    eliminarLibroById(@Param("id") id:number):Promise<void>{
        return this.librosService.eliminarLibroById(id)
    }

    @Put('/:id')
    actualizarLibroById(@Param('id') id:number, @Body() body ): Promise<void>{
        return this.librosService.actualizarLibroById(id,body)
    }
}
