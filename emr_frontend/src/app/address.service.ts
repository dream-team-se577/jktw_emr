import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Address } from './address';
import { STAFFS } from './mock-staff';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AddressService {

	constructor(private http: HttpClient, private messageService: MessageService) { 
	}
  
	/*getAddresss(): Observable<Address[]> {
		// TODO: send the message _after_ fetching the addresss
		this.messageService.add('AddressService: fetched addresss');
		return of(STAFFS);
	}
  
	getAddress(uuid: number): Observable<Address> {
		// TODO: send the message _after_ fetching the address
		this.messageService.add(`AddressService: fetched address uuid=${uuid}`);
		return of(STAFFS.find(address => address.uuid === uuid));
	}*/
	
	/** Log a AddressService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`AddressService: ${message}`);
	}
}
