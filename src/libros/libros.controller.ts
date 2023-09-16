import { Controller,Get,Param, Post, Body , Delete, Query, ParseIntPipe, Put, HttpCode,Res} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibroDto } from './dto/libro.dto';



@Controller('libros')

export class LibrosController {
    constructor(private readonly librosService: LibrosService) {}

    @Get()
    @HttpCode(200)
    async getLibros(@Query("libro") titulo: string, @Res() res): Promise<void> {
        try {
          const libros = titulo ? await this.librosService.getLibroPorTitulo(titulo) : await this.librosService.getLibros();
          res.json(libros);
        } catch (error) {
          res.status(400).json({ error: 'Error en el servidor' });
        }
      }
    

    @Get("/:id")
    @HttpCode(200)
     getLibrosById(@Param("id", ParseIntPipe) id: number, ): Promise<LibroDto> {
        return  this.librosService.getLibroById(id);
       
    }

    @Post()
    @HttpCode(201)
     async crearLibro(@Body() libroDto:LibroDto ,@Res() res): Promise<any>{
        try {
            const nuevoLibro = await this.librosService.createLibro(libroDto);
            res.status(201).json(nuevoLibro);
          } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
          }

    }

    @Delete("/:id")
    @HttpCode(204)
    async eliminarLibroById(@Param("id") id: number, @Res() res): Promise<void> {
        try {
            const libroExistente = await this.librosService.getLibroById(id);

        if (!libroExistente) {
            res.status(404).json();
            return;
        }

            await this.librosService.eliminarLibroById(id);
            res.status(204).send();
          } catch (error) {
            res.status(400).json({ error: 'Libro no encontrado' });
          }
      }

    @Put('/:id')
    @HttpCode(204)
    async update(@Param('id') id: number, @Body() libroDto:LibroDto,@Res() res): Promise<void>{
        try {
            await this.librosService.actualizarLibroById(id, libroDto);
            res.status(204).send();
          } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
          }
    }
  }

