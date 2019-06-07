import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { AppointmentFormComponent } from "../appointment-form/appointment-form.component";
import { Appointment } from "../../model/appointment";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  public appointments;
  appointmentDetail : boolean;
  appointmentId: number;
  appointment : Appointment;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getAppointments();
  }

  registerAppointment() {
    this.appointmentDetail = true;
    this.appointment = null;
  }

  getAppointment(id: number) {
    this.appointmentDetail = true;
    this.appointmentService.getAppointment(id).subscribe(
      data => this.appointment = <Appointment> data,
      err => console.error(err),
      () => console.log('appointment loaded')
    );
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
