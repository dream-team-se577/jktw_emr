import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lab } from './lab';
import { STAFFS } from './mock-staff';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LabService {

	constructor(private messageService: MessageService) { }
  
    /*getLabs(): Observable<Lab[]> {
		// TODO: send the message _after_ fetching the labs
		this.messageService.add('LabService: fetched labs');
		return of(STAFFS);
	}
  
	getLab(uuid: number): Observable<Lab> {
		// TODO: send the message _after_ fetching the lab
		this.messageService.add(`LabService: fetched lab uuid=${uuid}`);
		return of(STAFFS.find(lab => lab.uuid === uuid));
	}*/
	
	/** Log a LabService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`LabService: ${message}`);
	}
}
