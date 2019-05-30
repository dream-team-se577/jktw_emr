import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Staff } from './staff';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({ providedIn: 'root' })
export class StaffService {
	
	private staffsUrl = 'api/staffs';	// URL to web api

	constructor(private http: HttpClient, private messageService: MessageService) { 
	}
	
	/** GET staffs from the server */
	getStaffs (): Observable<Staff[]> {
		return this.http.get<Staff[]>(this.staffsUrl).pipe(
			tap(_ => this.log('fetched staffs')),
			catchError(this.handleError<Staff[]>('getStaffs', []))
		);
	}
	
	/** GET staff by uuid. Return `undefined` when uuid not found */
	getStaffNo404<Data>(uuid: number): Observable<Staff> {
		const url = `${this.staffsUrl}/?uuid=${uuid}`;
		return this.http.get<Staff[]>(url).pipe(
			map(staffs => staffs[0]), // returns a {0|1} element array
			tap(h => {const outcome = h ? `fetched` : `did not find`;
				this.log(`${outcome} staff uuid=${uuid}`);
			}),
			catchError(this.handleError<Staff>(`getStaff uuid=${uuid}`))
		);
	}
    
	/** GET staff by uuid. Will 404 if uuid not found */
	getStaff(uuid: number): Observable<Staff> {
		const url = `${this.staffsUrl}/${uuid}`;
		return this.http.get<Staff>(url).pipe(
			tap(_ => this.log(`fetched staff uuid=${uuid}`)),
			catchError(this.handleError<Staff>(`getStaff uuid=${uuid}`))
		);
	}
	
	//////// Save methods //////////
 
  /** POST: add a new staff to the server */
  addStaff (staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.staffsUrl, staff, httpOptions).pipe(
      tap((newStaff: Staff) => this.log(`added staff w/ uuid=${newStaff.uuid}`)),
      catchError(this.handleError<Staff>('addStaff'))
    );
  }
 
  /** DELETE: delete the staff from the server */
  deleteStaff (staff: Staff | number): Observable<Staff> {
    const uuid = typeof staff === 'number' ? staff : staff.uuid;
    const url = `${this.staffsUrl}/${uuid}`;
 
    return this.http.delete<Staff>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted staff uuid=${uuid}`)),
      catchError(this.handleError<Staff>('deleteStaff'))
    );
  }
 
  /** PUT: update the staff on the server */
  updateStaff (staff: Staff): Observable<any> {
    return this.http.put(this.staffsUrl, staff, httpOptions).pipe(
      tap(_ => this.log(`updated staff uuid=${staff.uuid}`)),
      catchError(this.handleError<any>('updateStaff'))
    );
  }
	
	/**
	* Handle Http operation that failed.
	* Let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
 
		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead
 
		// TODO: better job of transforming error for user consumption
		this.log(`${operation} failed: ${error.message}`);
 
		// Let the app keep running by returning an empty result.
		return of(result as T);
		};
	}

	/** Log a StaffService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`StaffService: ${message}`);
	}
}
