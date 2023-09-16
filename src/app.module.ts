import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LibrosController } from './libros/libros.controller';
import { LibrosService } from './libros/libros.service';
import { LibroModule } from './libros/libros.module';

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client'), serveRoot:"/", }),
   LibroModule],
})
export class AppModule {}
