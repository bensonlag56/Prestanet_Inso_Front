import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, RouterLink  ],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  // Simulando cronogramas para la demostración
  schedules = [
    {
      id: 1,
      clientName: 'Juan Pérez',
      clientId: '12345678',
      loanType: 'Personal',
    },
    {
      id: 2,
      clientName: 'Corporación XYZ',
      clientId: '20123456789',
      loanType: 'Empresarial',
    }
  ];

  constructor(private router: Router) {}
}
