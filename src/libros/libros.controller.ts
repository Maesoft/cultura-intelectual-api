import { Controller,Get,Param, Post, Body , Delete, Put, Query} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { Libro } from 'src/libro/libro';


@Controller('libros')
export class LibrosController {
    constructor(private readonly librosService: LibrosService) {}

    @Get()
      getLibros(@Query ("libro") titulo:string): Promise<Libro[]>{
        if(!titulo) return this.librosService.getLibros();
        return this.librosService.getLibroPorTitulo(titulo)
    }

    @Get("/:id")
    getLibrosById( @Param("id") id:number): Promise <Libro>{
        return this.librosService.getLibroById(id)
    }

    @Post()
    async crearLibro(@Body() body): Promise<any>{

        return this.librosService.createLibro(body)
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
