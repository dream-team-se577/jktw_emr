import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { AppointmentFormComponent } from "../appointment-form/appointment-form.component";
import { Appointment } from "../../model/appointment";
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: number[];
  appointmentDetail : boolean;

  constructor(private appointmentService: AppointmentService,
              private location: Location) { }

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

  appointemntCreated(message: string): void {
    location.reload();
  }

  deleteAppointment(appointment: number): void {
    if(!confirm("Are you sure to cancel this appointment?")) {
      return;
    }

    let tmp = [];
    this.appointments.forEach(x => tmp.push(x));
    this.appointments = tmp.filter(h => h !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe(
      data => {this.getAppointments();}
    );
  }
}
