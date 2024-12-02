import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoanService {
  private apiUrl = "https://prestanet-inso-final.onrender.com/api/loans"; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient) {}

  /**
   * Crea un préstamo para una persona natural.
   * @param clientNatural Datos del cliente natural.
   * @returns Observable con los detalles del préstamo creado.
   */
  createLoanForNaturalPerson(clientNatural: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/natural`, clientNatural)
      .pipe(catchError(this.handleError));
  }

  /**
   * Crea un préstamo para una persona jurídica.
   * @param clientJuridical Datos del cliente jurídico.
   * @returns Observable con los detalles del préstamo creado.
   */
  createLoanForJuridicalPerson(clientJuridical: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/juridical`, clientJuridical)
      .pipe(catchError(this.handleError));
  }

  /**
   * Calcula los intereses y cuotas del préstamo.
   * @param loan Datos del préstamo.
   * @returns Observable vacío.
   */
  calculateLoanInterestAndInstallments(loan: any): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/calculate`, loan)
      .pipe(catchError(this.handleError));
  }

  /**
   * Obtiene todos los préstamos.
   * @returns Observable con una lista de préstamos.
   */
  getAllLoans(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Cambia el estado de un préstamo.
   * @param loanId ID del préstamo.
   * @param status Nuevo estado del préstamo.
   * @returns Observable vacío.
   */
  changeLoanStatus(loanId: number, status: string): Observable<void> {
    const params = new HttpParams().set("status", status);
    return this.http
      .put<void>(`${this.apiUrl}/${loanId}/status`, null, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Obtiene el cronograma de pagos de un préstamo.
   * @param loanId ID del préstamo.
   * @returns Observable con una lista del cronograma de pagos.
   */
  getPaymentSchedule(loanId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/${loanId}/schedule`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Manejo de errores en las solicitudes HTTP.
   * @param error Error recibido de la petición.
   * @returns Observable con el mensaje de error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "Ha ocurrido un error inesperado.";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage =
            "Solicitud inválida. Por favor, revise los datos ingresados.";
          break;
        case 404:
          errorMessage = "Recurso no encontrado. Por favor, intente de nuevo.";
          break;
        case 500:
          errorMessage = "Error interno del servidor. Intente más tarde.";
          break;
        default:
          errorMessage = `Error inesperado: ${error.message}`;
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
