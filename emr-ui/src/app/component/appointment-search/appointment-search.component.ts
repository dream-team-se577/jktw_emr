import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Appointment } from '../../model/appointment';

@Component({
  selector: 'app-appointment-search',
  templateUrl: './appointment-search.component.html',
  styleUrls: ['./appointment-search.component.css']
})
export class AppointmentSearchComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentList: Appointment[] = [];

  validMessage: string = "";
  @Output() onAppointmentPicked: EventEmitter<any> = new EventEmitter<any>();


  constructor(private appointmentService: AppointmentService,
              private fb: FormBuilder) { }

  ngOnInit() {
      let newForm = this.fb.group({
        startDate: new FormControl('', [Validators.pattern(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/)]),
        endDate: new FormControl('', [Validators.pattern(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/)])
      });

      this.appointmentForm = newForm;
  }

  submitSearch() {
    this.validMessage = "";
    this.appointmentList = [];
    let appointmentFormValues = this.appointmentForm.value;
    let query = this.appointmentService.getRecordsByDateBetween(appointmentFormValues['startDate'],
                                                        appointmentFormValues['endDate']);

    query.subscribe(
      (data: any[]) => {
        if (data && data.length)
        {
          data.forEach(item => {
            let appointment = new Appointment();
            appointment.fromJson(item);
            this.appointmentList.push(appointment);
          })
          return true;
        }
        this.validMessage = "No matches";
        return false;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }

  pickAppointment(appointment: Appointment): void {
    this.onAppointmentPicked.emit(appointment);
  }
}
