import {IsString, IsNumber, IsNotEmpty} from 'class-validator'

export class LibroDTO {

    @IsString()
    titulo: string;

    @IsString()
    autor: string;

    @IsString()
    lugar_de_impresion: string;

    @IsString()
    fecha_de_impresion: string;

    @IsString()
    editorial: string;

    @IsString()
    coleccion: string;

    @IsNumber()
    precio:number;

    @IsNumber()
    ventas: number;

    @IsString()
    imagen: string;
}