import { Campos } from "../enum/campos";

export interface IdeaDto {
    id?: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    campo: Campos
}