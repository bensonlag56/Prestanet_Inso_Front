import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8080/api/loans'; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient) {}

  /**
   * Crea un préstamo para una persona natural.
   * @param clientNatural Datos del cliente natural.
   * @returns Observable con los detalles del préstamo creado.
   */
  createLoanForNaturalPerson(clientNatural: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/natural`, clientNatural);
  }

  /**
   * Crea un préstamo para una persona jurídica.
   * @param clientJuridical Datos del cliente jurídico.
   * @returns Observable con los detalles del préstamo creado.
   */
  createLoanForJuridicalPerson(clientJuridical: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/juridical`, clientJuridical);
  }

  /**
   * Calcula los intereses y cuotas del préstamo.
   * @param loan Datos del préstamo.
   * @returns Observable vacío.
   */
  calculateLoanInterestAndInstallments(loan: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/calculate`, loan);
  }

  /**
   * Obtiene todos los préstamos.
   * @returns Observable con una lista de préstamos.
   */
  getAllLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  /**
   * Cambia el estado de un préstamo.
   * @param loanId ID del préstamo.
   * @param status Nuevo estado del préstamo.
   * @returns Observable vacío.
   */
  changeLoanStatus(loanId: number, status: string): Observable<void> {
    const params = new HttpParams().set('status', status);
    return this.http.put<void>(`${this.apiUrl}/${loanId}/status`, null, { params });
  }

  /**
   * Obtiene el cronograma de pagos de un préstamo.
   * @param loanId ID del préstamo.
   * @returns Observable con una lista del cronograma de pagos.
   */
  getPaymentSchedule(loanId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${loanId}/schedule`);
  }
}
