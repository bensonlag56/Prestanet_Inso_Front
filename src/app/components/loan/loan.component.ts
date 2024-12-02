import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loans: any[] = [];
  filteredLoans: any[] = [];
  selectedStatus: string = '';
  searchTerm: string = '';
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicializa la lista de préstamos (esto normalmente vendría de un API)
    this.loans = [
      { id: 1, clientName: 'Juan Pérez', clientDni: '12345678', amount: 1000, loanType: 'Personal', status: 'Pendiente' },
      { id: 2, clientName: 'Ana Gómez', clientDni: '87654321', amount: 2000, loanType: 'Hipotecario', status: 'Finalizado' },
      { id: 3, clientName: 'Carlos Ruiz', clientDni: '11223344', amount: 1500, loanType: 'Automotriz', status: 'Pendiente' },
      // Agregar más préstamos para la demostración
    ];
    this.filteredLoans = [...this.loans];
  }

  // Filtrar los préstamos por estado y búsqueda
  filterLoans(): void {
    this.filteredLoans = this.loans.filter(loan => {
      const matchesStatus = !this.selectedStatus || loan.status === this.selectedStatus;
      const matchesSearch = loan.clientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            loan.clientDni.includes(this.searchTerm);
      return matchesStatus && matchesSearch;
    });
  }

  // Cambiar el estado de un préstamo
  changeStatus(loan: any, newStatus: string): void {
    const confirmation = confirm(`¿Estás seguro de cambiar el estado a "${newStatus}" para el préstamo de ${loan.clientName}?`);
    if (confirmation) {
      loan.status = newStatus;
      this.filterLoans(); // Filtrar nuevamente después del cambio
    }
  }

  protected readonly Math = Math;
}
