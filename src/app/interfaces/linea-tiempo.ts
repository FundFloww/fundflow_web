import { Hito } from "./hito";
import { Idea } from "./idea";

export interface LineaTiempo {
    id?: number;
    idea: Idea;
    hitos: Hito[]
}