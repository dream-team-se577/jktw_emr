import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Document } from '../document';
import { DocumentService }  from '../document.service';

@Component({
	selector: 'app-document-detail',
	templateUrl: './document-detail.component.html',
	styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
	@Input() document: Document;

	constructor(private route: ActivatedRoute, private documentService: DocumentService, private location: Location) {	  
	}

	ngOnInit() {
		/*this.getDocument();*/
	}
  
	/*getDocument(): void {
		const uuid = +this.route.snapshot.paramMap.get('uuid');
		this.documentService.getDocument(uuid)
		.subscribe(document => this.document = document);
	}*/

	goBack(): void {
		this.location.back();
	}
}
