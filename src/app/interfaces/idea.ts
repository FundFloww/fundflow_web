import { Campos } from "../enum/campos";
import { Hito } from "./hito";
import { Inversion } from "./inversion";
import { Usuario } from "./usuario";

export interface Idea {
    id?: number;
    titulo: string;
    descripcion: string;
    imagenes: string[];
    campo?: Campos;
    emprendedor: Usuario[];
    inversor: Usuario[];
    inversiones: Inversion[];
    hitos: Hito[];
    ods: string;
}