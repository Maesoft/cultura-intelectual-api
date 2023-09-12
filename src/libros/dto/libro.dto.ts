import {IsString, IsNumber, IsNotEmpty, IsOptional} from 'class-validator'

export class LibroDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;
    @IsNotEmpty()
    @IsString()
    autor: string;
    @IsNotEmpty()
    @IsString()
    lugar_de_impresion: string;
    @IsNotEmpty()
    @IsString()
    fecha_de_impresion: string;
    @IsNotEmpty()
    @IsString()
    editorial: string;
    @IsNotEmpty()
    @IsString()
    coleccion: string;
    @IsNotEmpty()
    @IsNumber()
    precio:number;
    @IsNotEmpty()
    @IsNumber()
    ventas: number;
    @IsOptional()
    @IsString()
    imagen: string;
}