import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Asegúrate de que esta URL sea correcta
  private tokenKey = 'authToken'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión con las credenciales del usuario.
   * @param credentials Objeto con username y password.
   * @returns Observable con el token JWT si la autenticación es exitosa.
   */
  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' });
  }

  /**
   * Registra un nuevo usuario.
   * @param user Objeto con los datos del usuario (username, password, role).
   * @returns Observable con el mensaje de éxito.
   */
  register(user: { username: string; password: string; role: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
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
}
