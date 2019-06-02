import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  public appointments;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments(): void {
		this.appointmentService.getAppointments().subscribe(
      data =>{this.appointments = data},
      err => console.error(err),
      () => console.log('appointments loaded')
    );
	}

  delete(appointment): void {
    this.appointments = this.appointments.filter(h => h !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe();
  }

}
