import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Name } from './name';
import { STAFFS } from './mock-staff';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NameService {

	constructor(private http: HttpClient, private messageService: MessageService) { 
	}
  
    /*getNames(): Observable<Name[]> {
		// TODO: send the message _after_ fetching the names
		this.messageService.add('NameService: fetched names');
		return of(STAFFS);
	}
  
	getName(uuid: number): Observable<Name> {
		// TODO: send the message _after_ fetching the name
		this.messageService.add(`NameService: fetched name uuid=${uuid}`);
		return of(STAFFS.find(name => name.uuid === uuid));
	}*/

	/** Log a NameService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`NameService: ${message}`);
	}
}
