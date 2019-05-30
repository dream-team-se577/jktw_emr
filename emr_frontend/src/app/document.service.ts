import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Document } from './document';
import { STAFFS } from './mock-staff';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DocumentService {

	constructor(private http: HttpClient, private messageService: MessageService) { 
	}
  
    /*getDocuments(): Observable<Document[]> {
		// TODO: send the message _after_ fetching the documents
		this.messageService.add('DocumentService: fetched documents');
		return of(STAFFS);
	}
  
	getDocument(uuid: number): Observable<Document> {
		// TODO: send the message _after_ fetching the document
		this.messageService.add(`DocumentService: fetched document uuid=${uuid}`);
		return of(STAFFS.find(document => document.uuid === uuid));
	}*/

	/** Log a DocumentService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`DocumentService: ${message}`);
	}
}
