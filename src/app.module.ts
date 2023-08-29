import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LibrosController } from './libros/libros.controller';
import { LibrosService } from './libros/libros.service';

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),],
  controllers: [ LibrosController],
  providers: [ LibrosService],
})
export class AppModule {}
