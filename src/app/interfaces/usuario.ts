import { TipoUsuario } from "../enum/tipo-usuario";
import { Idea } from "./idea";
import { Inversion } from "./inversion";

export interface Usuario {
    id?: number;
    nombre: string;
    apellidos: string;
    correo: string;
    contraseña: string;
    imagen: string;
    banner: string;
    descripcion: string;
    profesion: string;
    tipo: TipoUsuario;
    ideas: Idea[];
    guardados: Idea[];
    inversiones: Inversion[];
}