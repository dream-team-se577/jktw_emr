import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
	selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
	
	patient: Patient = {
		uuid: 1,
		ssn: '111111111',
		name: 'John Que Smith',
		contact: '8888888888',
		labRecords: 'l1',
		appointments: 'appt1'
	};

	constructor() { }

	ngOnInit() {
	}
}
