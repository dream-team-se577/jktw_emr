import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Appointment } from '../model/appointment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentsUrl = 'server/appointments';

  constructor(private http: HttpClient) { }

  /** POST: add a new appointment to the server */
  addAppointment (appointment: Appointment) {
    //let body = JSON.stringify(appointment);
    //return this.http.post('server/Appointments', body, httpOptions);
    return this.http.post(this.appointmentsUrl, appointment, httpOptions);
    //.pipe(tap((newAppointment: Appointment) => this.log(`added appointment w/ id=${newAppointment.id}`)),
    //catchError(this.handleError<Appointment>('addAppointment'))
    //);
  }

  /** GET all appointments */
  getAppointments() {
    //return this.http.get('server/Appointments');
    return this.http.get(this.appointmentsUrl);
    //.pipe(tap(_ => this.log('fetched appointments')),
		//catchError(this.handleError<Appointment[]>('getAppointments', []))
		//);
  }

  /** GET appointment by id. Will 404 if id not found */
  getAppointment(id: number) {
    //return this.http.get('server/Appointments' + id);
    const url = `${this.appointmentsUrl}/${id}`;
    return this.http.get(url);
    //.pipe(tap(_ => this.log(`fetched appointment id=${id}`)),
    //catchError(this.handleError<Appointment>(`getAppointment id=${id}`))
    //);
  }

  /** PUT: update the appointment on the server */
  updateAppointment (appointment: Appointment) {
    //let body = JSON.stringify(appointment);
    //return this.http.put('server/Appointments', body, httpOptions);
    return this.http.put(this.appointmentsUrl, appointment, httpOptions);
    //.pipe(tap(_ => this.log(`updated appointment id=${appointment.id}`)),
    //catchError(this.handleError<any>('updateAppointment'))
    //);
  }

  /** DELETE: delete the appointment from the server */
 	deleteAppointment (appointment: Appointment | number) {
    //return this.http.delete('server/Appointments' + id);
 		const id = typeof appointment === 'number' ? appointment : appointment.id;
 		const url = `${this.appointmentsUrl}/${id}`;

 		return this.http.delete<Appointment>(url, httpOptions);
    //.pipe(tap(_ => this.log(`deleted appointment id=${id}`)),
 		//catchError(this.handleError<Appointment>('deleteAppointment'))
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
