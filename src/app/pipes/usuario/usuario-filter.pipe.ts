import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioZonaAdminDTO } from '../../interfaces/usuario-zona-admin-dto';

@Pipe({
    name: 'usuarioFilter',
    standalone: true
})
export class UsuarioFilterPipe implements PipeTransform {

    transform(usuarios: UsuarioZonaAdminDTO[], filterBy: string): UsuarioZonaAdminDTO[] {
        const filter = filterBy ? filterBy.toLowerCase() : null;

        if (filter) {
            const filterId = parseInt(filter, 10);
            return usuarios.filter(
                usuario =>
                    usuario.id === filterId ||
                    usuario.nombre.toLowerCase().includes(filter) ||
                    usuario.apellidos.toLowerCase().includes(filter) ||
                    usuario.correo.toLowerCase().includes(filter) ||
                    usuario.tipo.toLowerCase().includes(filter)
            );
        }
        return usuarios;
    }

}
