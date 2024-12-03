import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  username: string = "";
  password: string = "";
  formSubmitted: boolean = false;
  formError: boolean = false;
  userCreated: boolean = false;
  usernameExists: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService) {}

  /**
   * Enviar formulario de registro.
   */
  onSubmit(): void {
    this.formSubmitted = true;
    this.formError = false;
    this.usernameExists = false;
    this.userCreated = false;
    this.errorMessage = "";

    // Validaciones locales
    if (this.username === "" || this.password === "") {
      this.formError = true;
      return;
    }

    // Llamar al servicio para registrar el usuario
    this.authService
      .register({
        username: this.username,
        password: this.password,
        role: "CLIENT",
      })
      .subscribe({
        next: () => {
          // Usuario creado exitosamente
          this.userCreated = true;
        },
        error: (error) => {
          if (
            error.status === 400 &&
            error.error === "Username already exists"
          ) {
            this.usernameExists = true; // Usuario ya registrado
          } else {
            this.errorMessage =
              "Hubo un error al registrar al usuario. Intente nuevamente.";
          }
        },
      });
  }
}
