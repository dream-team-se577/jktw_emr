import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html',
	styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
		
	address: Address = {
		streetNumber: 1,
		houseNumber: 2,
		streetName: 'Main Street',
		cityName: 'Philadelphia',
		stateName: 'Pensylvania',
		countryName: 'United States'
	};

	constructor() { }

	ngOnInit() {
	}
}
