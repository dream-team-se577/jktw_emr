import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Staff } from '../model/staff';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private staffsUrl = 'server/patients';

  constructor(private http: HttpClient) { }

  /** POST: add a new staff to the server */
  addStaff (staff: Staff) {
    //let body = JSON.stringify(staff);
    //return this.http.post('server/patients', body, httpOptions);
    return this.http.post(this.staffsUrl, staff, httpOptions);
    //.pipe(tap((newStaff: Staff) => this.log(`added staff w/ id=${newStaff.id}`)),
    //catchError(this.handleError<Staff>('addStaff'))
    //);
  }

  /** GET all staffs */
  getStaffs() {
    //return this.http.get('server/patients');
    return this.http.get(this.staffsUrl);
    //.pipe(tap(_ => this.log('fetched staffs')),
		//catchError(this.handleError<Staff[]>('getStaffs', []))
		//);
  }

  /** GET staff by id. Will 404 if id not found */
  getStaff(id: number) {
    //return this.http.get('server/patients' + id);
    const url = `${this.staffsUrl}/${id}`;
    return this.http.get(url);
    //.pipe(tap(_ => this.log(`fetched staff id=${id}`)),
    //catchError(this.handleError<Staff>(`getStaff id=${id}`))
    //);
  }

  /** PUT: update the staff on the server */
  updateStaff (staff: Staff) {
    //let body = JSON.stringify(staff);
    //return this.http.put('server/patients', body, httpOptions);
    return this.http.put(this.staffsUrl, staff, httpOptions);
    //.pipe(tap(_ => this.log(`updated staff id=${staff.id}`)),
    //catchError(this.handleError<any>('updateStaff'))
    //);
  }

  /** DELETE: delete the staff from the server */
 	deleteStaff (staff: Staff | number) {
    //return this.http.delete('server/patients' + id);
 		const id = typeof staff === 'number' ? staff : staff.id;
 		const url = `${this.staffsUrl}/${id}`;

 		return this.http.delete<Staff>(url, httpOptions);
    //.pipe(tap(_ => this.log(`deleted staff id=${id}`)),
 		//catchError(this.handleError<Staff>('deleteStaff'))
 		//);
 	}

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  //private handleError<T> (operation = 'operation', result?: T) {
    //return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    //console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    //this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    //return of(result as T);
    //};
  //}
}
