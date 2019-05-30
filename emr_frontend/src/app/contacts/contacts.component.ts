import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	
	contact: Contact = {
		phoneNumber: 5558675309,
		address: 'addr1',
		emailAddress: 'none@none.com'
	};

	constructor() { }

	ngOnInit() {
	}
}
