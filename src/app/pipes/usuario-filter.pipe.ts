import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioFilter'
})
export class UsuarioFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
