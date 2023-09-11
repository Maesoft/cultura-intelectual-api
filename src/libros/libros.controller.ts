import { Controller,Get,Param, Post, Body , Delete, Query, ParseIntPipe, Put, HttpCode} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibroDTO } from './libro.dto';



@Controller('libros')
export class LibrosController {
    constructor(private readonly librosService: LibrosService) {}

    @Get()
      getLibros(@Query ("libro") titulo:string): Promise<any[]>{
        if(!titulo) return this.librosService.getLibros();
        return this.librosService.getLibroPorTitulo(titulo)
    }

    @Get("/:id")
    getLibrosById( @Param("id", ParseIntPipe) id:number): Promise <any>{
        return this.librosService.getLibroById(id)
    }

    @Post()
    crearLibro(@Body() libroDto:LibroDTO): Promise<any>{
        return this.librosService.createLibro(libroDto)
    }

    @Delete("/:id")
    eliminarLibroById(@Param("id") id:number):Promise<void>{
        return this.librosService.eliminarLibroById(id)
    }

    @Put(':id')
    @HttpCode(204)
    update(@Param('id') id: number, @Body() body): Promise<void>{
        return this.librosService.actualizarLibroById(id, body)
    }
  }

