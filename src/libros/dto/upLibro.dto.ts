import {IsString, IsNumber, IsNotEmpty} from 'class-validator'

export class UpLibroDto {
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
    @IsNotEmpty()
    @IsString()
    imagen: string;
}