import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Patient } from '../patient';
import { PatientService }  from '../patient.service';

@Component({
	selector: 'app-patient-detail',
	templateUrl: './patient-detail.component.html',
	styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
	@Input() patient: Patient;

	constructor(private route: ActivatedRoute, private patientService: PatientService, private location: Location) {	  
	}

	ngOnInit() {
		/*this.getPatient();*/
	}
  
	/*getPatient(): void {
		const uuid = +this.route.snapshot.paramMap.get('uuid');
		this.patientService.getPatient(uuid)
		.subscribe(patient => this.patient = patient);
	}*/

	goBack(): void {
		this.location.back();
	}
}
