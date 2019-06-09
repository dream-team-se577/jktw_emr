import { Component, Input,  Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Appointment } from "../../model/appointment";
import { AppointmentService } from '../../service/appointment.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, OnChanges {
  apptList: Appointment[] = [];

  @Input() appointments: number[] = [];
  @Output() onAppointmentRemoved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    if (!this.appointments)
    {
      return;
    }

    this.apptList = [];
    this.appointments.forEach(a => {
      this.appointmentService.getAppointment(a).subscribe(
        data => {
          let newApp = new Appointment();
          newApp.fromJson(data);

          if (this.apptList.some(a => a.id === newApp.id))
          {
            return true;
          }

          this.apptList.push(newApp);
          this.apptList.sort(function (appt1, appt2) {
          	if (appt1.date > appt2.date) return -1;
          	if (appt1.date < appt2.date) return 1;
          });

          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  remove(id: number): void {
    this.onAppointmentRemoved.emit(id);
  }
}
