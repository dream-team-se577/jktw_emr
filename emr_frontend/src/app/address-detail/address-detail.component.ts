import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Address } from '../address';
import { AddressService }  from '../address.service';

@Component({
	selector: 'app-address-detail',
	templateUrl: './address-detail.component.html',
	styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
	@Input() address: Address;

	constructor(private route: ActivatedRoute, private addressService: AddressService, private location: Location) {	  
	}

	ngOnInit() {
		/*this.getAddress();*/
	}
  
	/*getAddress(): void {
		const uuid = +this.route.snapshot.paramMap.get('uuid');
		this.addressService.getAddress(uuid)
		.subscribe(address => this.address = address);
	}*/
  
	goBack(): void {
		this.location.back();
	}
}
