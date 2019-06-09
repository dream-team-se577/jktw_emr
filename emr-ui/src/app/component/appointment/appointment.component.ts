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
  appointments: number[];
  appointmentDetail : boolean;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments(): void {
		this.appointmentService.getAppointments().subscribe(
      (data : any[]) =>{
        this.appointments = data.map(x => x.id);
      },
      err => console.error(err),
      () => console.log('appointments loaded')
    );
	}

  deleteAppointment(appointment: number): void {
    if(!confirm("Are you sure to cancel this appointment?")) {
      return;
    }

    this.appointments = this.appointments.filter(h => h !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe(
      data => {this.getAppointments();}
    );
  }
}
