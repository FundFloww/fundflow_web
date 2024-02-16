import { Idea } from "./idea";

export interface Inversion {
    id: number;
    cantidad: number;
    fecha: Date;
    ideas: Idea[];
}