import { Component, OnInit } from '@angular/core';
import { Document } from '../document';
import { DocumentService } from '../document.service';

@Component({
	selector: 'app-documents',
	templateUrl: './documents.component.html',
	styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
	
	document: Document = {
		uuid: 1,
		patient: 'p3',
		description: 'Patient 1',
		document: 'd1'
	};

	constructor() { }

	ngOnInit() {
	}
}
