import { Campos } from "../enum/campos";
import { Usuario } from "./usuario";

export interface IdeaDto {
    id?: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    emprendedor: Usuario[];
    campo: Campos
}