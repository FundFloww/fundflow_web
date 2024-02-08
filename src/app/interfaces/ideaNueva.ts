import { Campos } from "../enum/campos";
import { Usuario } from "./usuario";

export interface IdeaNueva {
    id?: number;
    titulo: string;
    descripcion: string;
    imagenes: string[];
    campo?: Campos;
    emprendedor: Usuario[];
}