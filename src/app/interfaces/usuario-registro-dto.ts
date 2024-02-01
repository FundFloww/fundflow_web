import { TipoUsuario } from "../enum/tipo-usuario";

export interface UsuarioRegistroDTO {
    id?: number;
    nombre: string;
    apellidos: string;
    correo: string;
    contrasena: string;
    confirmarContrasena: string;
    tipo: string;
    // tipo: TipoUsuario;
}
