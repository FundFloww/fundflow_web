import { Campos } from "../enum/campos";

export interface IdeaEditarDto {
    id?: number;
    titulo: string;
    descripcion: string;
    imagenes: string[];
    campo: Campos | undefined;
}
