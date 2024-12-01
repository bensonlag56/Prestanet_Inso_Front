import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // Credenciales predefinidas para el primer usuario
  private predefinedUsername: string = 'admin';
  private predefinedPassword: string = 'admin123';

  constructor(private router: Router) {}

  // Lógica para el inicio de sesión
  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, complete ambos campos.';
      return;
    }

    if (this.username === this.predefinedUsername && this.password === this.predefinedPassword) {
      // Si las credenciales son correctas, redirige a la página principal
      this.router.navigate(['/schedule']);
    } else {
      // Si las credenciales son incorrectas, muestra un mensaje de error
      this.errorMessage = 'Nombre de usuario o contraseña incorrectos. Por favor, intente nuevamente.';
    }
  }
}