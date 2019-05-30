import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from './patient';
import { STAFFS } from './mock-staff';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PatientService {

	constructor(private http: HttpClient, private messageService: MessageService) { 
	}
  
    /*getPatients(): Observable<Patient[]> {
		// TODO: send the message _after_ fetching the patients
		this.messageService.add('PatientService: fetched patients');
		return of(STAFFS);
	}
  
	getPatient(uuid: number): Observable<Patient> {
		// TODO: send the message _after_ fetching the patient
		this.messageService.add(`PatientService: fetched patient uuid=${uuid}`);
		return of(STAFFS.find(patient => patient.uuid === uuid));
	}*/
	
	/** Log a PatientService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`PatientService: ${message}`);
	}
}
