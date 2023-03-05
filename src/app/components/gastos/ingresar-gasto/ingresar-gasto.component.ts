import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css'],
})
export class IngresarGastoComponent {
  nombreGasto: string = '';
  cantidad: number = 0;
  formularioIncorrecto: boolean = false;
  textoIncorrecto: string = '';

  constructor(private _presupuestoService: PresupuestoService) {}

  agregarGasto() {
    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Cantidad ingresada mayor al restante';
      return;
    }

    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Nombre gasto o cantida incorrecta';
    } else {
      // Creación de objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad,
      };

      // Se envía el objecto a los suscriptores
      this._presupuestoService.agregarGasto(GASTO);

      // Se resetea formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
