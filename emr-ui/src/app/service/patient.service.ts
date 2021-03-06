import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Patient } from '../model/patient';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsUrl = 'server/patients';
  private findByFirstNameUrl = '/search/findByFirstName'
  private findByLastNameUrl = '/search/findByLastName';
  private findByFirstNameAndLastNameUrl = '/search/findByFirstNameAndLastName';
  private findByWholeNameUrl = '/search/findByFirstNameAndMiddleNameAndLastName';
  private findBySsnUrl = '/search/findBySsn';

  constructor(private http: HttpClient) { }

  /** POST: add a new patient to the server */
  addPatient (patient: Patient) {
    let body = JSON.stringify(patient);
    return this.http.post(this.patientsUrl, body, httpOptions);
    //.pipe(tap((newPatient: Patient) => this.log(`added patient w/ id=${newPatient.id}`)),
    //catchError(this.handleError<Patient>('addPatient'))
    //);
  }

  /** GET all patients */
  getPatients() {
    return this.http.get(this.patientsUrl);
    //.pipe(tap(_ => this.log('fetched patients')),
		//catchError(this.handleError<Patient[]>('getPatients', []))
		//);
  }

  /** GET patient by id. Will 404 if id not found */
  getPatient(id: number) {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.get(url);
    //.pipe(tap(_ => this.log(`fetched patient id=${id}`)),
    //catchError(this.handleError<Patient>(`getPatient id=${id}`))
    //);
  }

  /** GET patient by id. Will 404 if id not found */
  getAppointmentsByPatientId(id: number) {
    const url = `${this.patientsUrl}/${id}` + '/appointments';
    return this.http.get(url);
    //.pipe(tap(_ => this.log(`fetched patient id=${id}`)),
    //catchError(this.handleError<Patient>(`getPatient id=${id}`))
    //);
  }

  /** GET patient by id. Will 404 if id not found */
  getLabsByPatientId(id: number) {
    const url = `${this.patientsUrl}/${id}` + '/labRecords';
    return this.http.get(url);
    //.pipe(tap(_ => this.log(`fetched patient id=${id}`)),
    //catchError(this.handleError<Patient>(`getPatient id=${id}`))
    //);
  }

  /** PUT: update the patient on the server */
  updatePatient (patient: Patient) {
    let body = JSON.stringify(patient);
    return this.http.put(this.patientsUrl, body, httpOptions);
    //.pipe(tap(_ => this.log(`updated patient id=${patient.id}`)),
    //catchError(this.handleError<any>('updatePatient'))
    //);
  }

  getPatientByFirstName (firstName: string) {
      let url = [];
      url.push(
        this.patientsUrl,
        this.findByFirstNameUrl,
        '?',
        'firstName=',
        firstName
      );
      return this.http.get(url.join(""));
      //.pipe(tap(_ => this.log(`updated patient id=${patient.id}`)),
      //catchError(this.handleError<any>('updatePatient'))
      //);
  }

  getPatientByLastName (lastName: string) {
      let url = [];
      url.push(
        this.patientsUrl,
        this.findByLastNameUrl,
        '?',
        'lastName=',
        lastName
      );
      return this.http.get(url.join(""));
      //.pipe(tap(_ => this.log(`updated patient id=${patient.id}`)),
      //catchError(this.handleError<any>('updatePatient'))
      //);
  }

  getPatientByFirstNameAndLastName (firstName: string, lastName: string) {
      let url = [];
      url.push(
        this.patientsUrl,
        this.findByFirstNameAndLastNameUrl,
        '?',
        'firstName=',
        firstName,
        '&',
        'lastName=',
        lastName
      );
      return this.http.get(url.join(""));
      //.pipe(tap(_ => this.log(`updated patient id=${patient.id}`)),
      //catchError(this.handleError<any>('updatePatient'))
      //);
  }

  getPatientByWholeName (firstName: string, middleName: string, lastName: string) {
      let url = [];
      url.push(
        this.patientsUrl,
        this.findByWholeNameUrl,
        '?',
        'firstName=',
        firstName,
        '&',
        'middleName=',
        middleName,
        '&',
        'lastName=',
        lastName
      );
      return this.http.get(url.join(""));
      //.pipe(tap(_ => this.log(`updated patient id=${patient.id}`)),
      //catchError(this.handleError<any>('updatePatient'))
      //);
  }

  getPatientBySsn (ssn: string) {
      let url = [];
      url.push(
        this.patientsUrl,
        this.findBySsnUrl,
        '?',
        'ssn=',
        ssn,
      );
      return this.http.get(url.join(""));
      //.pipe(tap(_ => this.log(`updated patient id=${patient.id}`)),
      //catchError(this.handleError<any>('updatePatient'))
      //);
  }

  /** DELETE: delete the patient from the server */
 	deletePatient (patient: Patient | number) {
 		const id = typeof patient === 'number' ? patient : patient.id;
 		const url = `${this.patientsUrl}/${id}`;

 		return this.http.delete<Patient>(url, httpOptions);
    //.pipe(tap(_ => this.log(`deleted patient id=${id}`)),
 		//catchError(this.handleError<Patient>('deletePatient'))
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
