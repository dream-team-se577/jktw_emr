import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Contact } from '../contact';
import { ContactService }  from '../contact.service';

@Component({
	selector: 'app-contact-detail',
	templateUrl: './contact-detail.component.html',
	styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
	@Input() contact: Contact;

	constructor(private route: ActivatedRoute, private contactService: ContactService, private location: Location) {	  
	}

	ngOnInit() {
		/*this.getContact();*/
	}
  
	/*getContact(): void {
		const uuid = +this.route.snapshot.paramMap.get('uuid');
		this.contactService.getContact(uuid)
		.subscribe(contact => this.contact = contact);
	}*/
  
	goBack(): void {
		this.location.back();
	}
}
