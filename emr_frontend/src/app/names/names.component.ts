import { Component, OnInit } from '@angular/core';
import { Name } from '../name';
import { NameService } from '../name.service';

@Component({
	selector: 'app-names',
	templateUrl: './names.component.html',
	styleUrls: ['./names.component.css']
})
export class NamesComponent implements OnInit {
	
	name: Name = {
		firstName: 'John',
		middleName: 'Que',
		lastName: 'Smith'
	};

	constructor() { }

	ngOnInit() {
	}
}
