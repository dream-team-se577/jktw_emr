import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Appointment } from '../appointment';
import { AppointmentService }  from '../appointment.service';

@Component({
	selector: 'app-appointment-detail',
	templateUrl: './appointment-detail.component.html',
	styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
	@Input() appointment: Appointment;

	constructor(private route: ActivatedRoute, private appointmentService: AppointmentService, private location: Location) {	  
	}

	ngOnInit() {
		/*this.getAppointment();*/
	}
  
	/*getAppointment(): void {
		const uuid = +this.route.snapshot.paramMap.get('uuid');
		this.appointmentService.getAppointment(uuid)
		.subscribe(appointment => this.appointment = appointment);
	}*/

	goBack(): void {
		this.location.back();
	}
}
