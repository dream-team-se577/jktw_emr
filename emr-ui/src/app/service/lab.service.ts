import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lab } from '../model/lab';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LabService {
  private labsUrl = 'server/labRecords';

  constructor(private http: HttpClient) { }

  /** POST: add a new lab to the server */
  addLab (lab) {
    return this.http.post(this.labsUrl, lab, httpOptions);
    //.pipe(tap((newLab: Lab) => this.log(`added lab w/ id=${newLab.id}`)),
    //catchError(this.handleError<Lab>('addLab'))
    //);
  }

  /** GET all labs */
  getLabs() {
    return this.http.get(this.labsUrl);
    //.pipe(tap(_ => this.log('fetched labs')),
		//catchError(this.handleError<Lab[]>('getLabs', []))
		//);
  }

  /** GET lab by id. Will 404 if id not found */
  getLab(id: number) {
    const url = `${this.labsUrl}/${id}`;
    return this.http.get(url);
    //.pipe(tap(_ => this.log(`fetched lab id=${id}`)),
    //catchError(this.handleError<Lab>(`getLab id=${id}`))
    //);
  }

  /** GET lab by id. Will 404 if id not found */
  getPatientByLabId(id: number) {
    const url = `${this.labsUrl}/${id}` + '/patient';
    return this.http.get(url);
    //.pipe(tap(_ => this.log(`fetched lab id=${id}`)),
    //catchError(this.handleError<Lab>(`getLab id=${id}`))
    //);
  }

  /** PUT: update the lab on the server */
  updateLab (lab: Lab) {
    return this.http.put(this.labsUrl, lab, httpOptions);
    //.pipe(tap(_ => this.log(`updated lab id=${lab.id}`)),
    //catchError(this.handleError<any>('updateLab'))
    //);
  }

  /** DELETE: delete the lab from the server */
 	deleteLab (lab: Lab | number) {
 		const id = typeof lab === 'number' ? lab : lab.id;
 		const url = `${this.labsUrl}/${id}`;

 		return this.http.delete<Lab>(url, httpOptions);
    //.pipe(tap(_ => this.log(`deleted lab id=${id}`)),
 		//catchError(this.handleError<Lab>('deleteLab'))
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
