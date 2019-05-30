import { Component, OnInit } from '@angular/core';
import { Lab } from '../lab';
import { LabService } from '../lab.service';

@Component({
	selector: 'app-labs',
	templateUrl: './labs.component.html',
	styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit {
	
	lab: Lab = {
		uuid: 1,
		date: '01-01-2019',
		results: 'Pass',
		patient: 'p1',
		type: 't1'
	};

	constructor() { }

	ngOnInit() {
	}
}
