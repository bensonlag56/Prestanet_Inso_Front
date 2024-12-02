import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://prestanet-inso-final.onrender.com/auth"; // Ajusta según tu configuración
  private tokenKey = "authToken"; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión con las credenciales del usuario.
   * @param credentials Objeto con username y password.
   * @returns Observable con el token JWT si la autenticación es exitosa.
   */
  login(credentials: {
    username: string;
    password: string;
  }): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials, { responseType: "text" })
      .pipe(catchError(this.handleError));
  }

  /**
   * Registra un nuevo usuario.
   * @param user Objeto con los datos del usuario (username, password, role).
   * @returns Observable con el mensaje de éxito o error.
   */
  register(user: {
    username: string;
    password: string;
    role: string;
  }): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/register`, user, { responseType: "text" })
      .pipe(catchError(this.handleError));
  }

  /**
   * Guarda el token JWT en el almacenamiento local.
   * @param token El token JWT recibido después de login.
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Obtiene el token JWT del almacenamiento local.
   * @returns El token JWT si está disponible, de lo contrario null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Elimina el token JWT del almacenamiento local.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns true si el token existe en el localStorage, de lo contrario false.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Manejo de errores en las peticiones HTTP.
   * @param error Objeto de error.
   * @returns Observable con el error formateado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "Ha ocurrido un error inesperado";
    if (error.status === 400 && error.error === "Username already exists") {
      errorMessage = "El nombre de usuario ya está en uso.";
    } else if (error.status === 401) {
      errorMessage = "Credenciales incorrectas. Por favor, intente nuevamente.";
    }
    return throwError(() => new Error(errorMessage));
  }
}
