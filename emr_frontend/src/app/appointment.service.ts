import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from './appointment';
import { STAFFS } from './mock-staff';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

	constructor(private http: HttpClient, private messageService: MessageService) { 
	}
  
    /*getAppointments(): Observable<Appointment[]> {
		// TODO: send the message _after_ fetching the appointments
		this.messageService.add('AppointmentService: fetched appointments');
		return of(STAFFS);
	}
  
	getAppointment(uuid: number): Observable<Appointment> {
		// TODO: send the message _after_ fetching the appointment
		this.messageService.add(`AppointmentService: fetched appointment uuid=${uuid}`);
		return of(STAFFS.find(appointment => appointment.uuid === uuid));
	}*/
	
	/** Log a AppointmentService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`AppointmentService: ${message}`);
	}
}
