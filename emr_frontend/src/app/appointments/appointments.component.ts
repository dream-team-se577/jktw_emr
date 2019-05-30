import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
	selector: 'app-appointments',
	templateUrl: './appointments.component.html',
	styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
	
	appointment: Appointment = {
		uuid: 1,
		date: '01-01-2019',
		description: 'Appointment 1',
		patient: 'p3',
		type: 'check up',
		staff: 's4'
	};

	constructor() { }

	ngOnInit() {
	}
}
