import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-loan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-loan.component.html',
  styleUrl: './new-loan.component.css'
})
export class NewLoanComponent {
  loanType: 'natural' | 'juridica' = 'natural'; // Tipo de solicitud: persona natural o jurídica
  clientName: string = '';
  dni: string = '';
  companyName: string = '';
  ruc: string = '';
  formSubmitted: boolean = false;
  formError: boolean = false;
  isValidDni: boolean = true;
  isValidRuc: boolean = true;
  isValidForm: boolean = false;

  // Verifica si el DNI es válido (exactamente 8 dígitos numéricos)
  get isValidDniField(): boolean {
    return this.dni.length === 8 && /^\d+$/.test(this.dni);
  }

  // Verifica si el RUC es válido (exactamente 11 dígitos numéricos)
  get isValidRucField(): boolean {
    return this.ruc.length === 11 && /^\d+$/.test(this.ruc);
  }

  // Enviar solicitud
  onSubmit(): void {
    this.formSubmitted = true;
    this.formError = false;

    // Validación: si los campos están vacíos o tienen formato incorrecto
    if ((this.loanType === 'natural' && (this.clientName === '' || !this.isValidDniField)) ||
        (this.loanType === 'juridica' && (this.companyName === '' || !this.isValidRucField))) {
      this.formError = true;
      this.isValidForm = false;
      return;
    }

    // Si los campos son válidos
    this.isValidForm = true;

    // Aquí puedes hacer un llamado a una API para registrar la solicitud
    // y verificar si el DNI o RUC ya existe (bloqueo de registro duplicado).
    // En caso de error técnico, mostrar un mensaje de error.
  }
}
