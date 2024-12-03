import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Lógica para el inicio de sesión.
   */
  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = "Por favor, complete ambos campos.";
      return;
    }

    this.authService
      .login({ username: this.username, password: this.password, role: "CLIENT"})
      .subscribe({
        next: (token) => {
          this.authService.saveToken(token); // Guarda el token en localStorage
          this.errorMessage = ""; // Limpia el mensaje de error
          this.router.navigate(["/schedule"]); // Redirige a la página principal
        },
        error: (error) => {
          this.errorMessage = error.message; // Muestra el mensaje de error
        },
      });
  }
}
