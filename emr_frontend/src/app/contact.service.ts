import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from './contact';
import { STAFFS } from './mock-staff';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactService {

	constructor(private http: HttpClient, private messageService: MessageService) { 
	}
  
    /*getContacts(): Observable<Contact[]> {
		// TODO: send the message _after_ fetching the contacts
		this.messageService.add('ContactService: fetched contacts');
		return of(STAFFS);
	}
  
	getContact(uuid: number): Observable<Contact> {
		// TODO: send the message _after_ fetching the contact
		this.messageService.add(`ContactService: fetched contact uuid=${uuid}`);
		return of(STAFFS.find(contact => contact.uuid === uuid));
	}*/ 

	/** Log a ContactService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`ContactService: ${message}`);
	}	
}
