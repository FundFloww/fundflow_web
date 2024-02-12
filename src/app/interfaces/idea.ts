import { Campos } from "../enum/campos";
import { Usuario } from "./usuario";

export interface Idea {
    id?: number;
    titulo: string;
    descripcion: string;
    imagenes: File[];
    campo?: Campos;
    emprendedor: Usuario[];
    inversor: Usuario[];
    // lineaTiempo
    // inversiones
}