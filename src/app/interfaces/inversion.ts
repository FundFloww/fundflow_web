import { Idea } from "./idea";
import { Usuario } from "./usuario";

export interface Inversion {
    id: number;
    cantidad: number;
    fecha: Date;
    inversores: Usuario[];
    idea: Idea;
}