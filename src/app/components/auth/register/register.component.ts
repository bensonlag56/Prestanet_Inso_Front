import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  formSubmitted: boolean = false;
  formError: boolean = false;
  userCreated: boolean = false;
  usernameExists: boolean = false;

  // Simula un listado de usuarios existentes (esto debe ser reemplazado por una consulta a la base de datos o API)
  existingUsers: string[] = ['admin', 'user1', 'john_doe'];

  // Verificar si el nombre de usuario ya existe
  checkIfUsernameExists(username: string): boolean {
    return this.existingUsers.includes(username);
  }

  // Enviar formulario
  onSubmit(): void {
    this.formSubmitted = true;
    this.formError = false;

    // Validaciones
    if (this.username === '' || this.password === '') {
      this.formError = true;
      return;
    }

    // Verificar si el nombre de usuario ya existe
    if (this.checkIfUsernameExists(this.username)) {
      this.usernameExists = true;
      return;
    }

    // Si todos los datos son válidos, simula la creación del usuario
    this.userCreated = true;

    // Simulación de agregar el usuario a la lista de usuarios existentes
    this.existingUsers.push(this.username);

    // Aquí se puede hacer un llamado a una API para guardar el usuario en la base de datos
  }
}
