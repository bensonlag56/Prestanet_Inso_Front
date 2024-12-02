import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent {
  scheduleDetails: any;

  constructor(private route: ActivatedRoute) {}

  // Simulación de datos para los detalles del cronograma
  ngOnInit(): void {
    const scheduleId = this.route.snapshot.paramMap.get('id');
    this.fetchScheduleDetails(Number(scheduleId));
  }

  fetchScheduleDetails(scheduleId: number) {
    // Aquí simula la obtención de los detalles del cronograma por su ID (esto debería venir de una API)
    if (scheduleId === 1) {
      this.scheduleDetails = {
        id: 1,
        clientName: 'Juan Pérez',
        clientId: '12345678',
        loanType: 'Personal',
        payments: [
          { paymentDate: '2024-01-01', amount: 1000, status: 'No Pagado' },
          { paymentDate: '2024-02-01', amount: 1000, status: 'Pagado' },
          { paymentDate: '2024-03-01', amount: 1000, status: 'No Pagado' },
        ]
      };
    } else if (scheduleId === 2) {
      this.scheduleDetails = {
        id: 2,
        clientName: 'Corporación XYZ',
        clientId: '20123456789',
        loanType: 'Empresarial',
        payments: [
          { paymentDate: '2024-01-15', amount: 5000, status: 'Pagado' },
          { paymentDate: '2024-02-15', amount: 5000, status: 'No Pagado' },
        ]
      };
    }
  }

  updatePaymentStatus(payment: any) {
    // Lógica para actualizar el estado de pago (esto debería actualizarse en la base de datos)
    payment.status = 'Pagado';
  }

  printSchedule() {
    window.print();
  }

  downloadSchedule() {
    const element = document.createElement('a');
    const content = document.getElementById('schedule-details')?.outerHTML;
    const blob = new Blob([content || ''], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    element.href = url;
    element.download = 'cronograma.pdf';
    document.body.appendChild(element);
    element.click();
  }
}
