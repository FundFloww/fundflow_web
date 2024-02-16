import { Campos } from "../enum/campos";
import { Inversion } from "./inversion";
import { Usuario } from "./usuario";

export interface IdeaDto {
    id?: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    emprendedor: Usuario[];
    inversiones: Inversion[];
    campo: Campos
}