import { UsuarioDatos } from "./UsuarioDatos";
import { Idea } from "./idea";

export interface InversionEnviar {
    cantidad: number;
    fecha: Date;
    inversores: UsuarioDatos[];
    idea: Idea;
}