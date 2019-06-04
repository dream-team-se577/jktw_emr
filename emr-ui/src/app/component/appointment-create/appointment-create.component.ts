import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {
  type : string[] = [
    'Check-up',
    'follow-up',
    'illness',
  ];
  hidden : string = "[]"
  appointmentform : FormGroup;
  validMessage :string = "";

  constructor(private appointmentService:AppointmentService) { }

  ngOnInit() {
    this.appointmentform = new FormGroup({
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      patient: new FormControl(),
      staff: new FormControl(),
    });
  }

  createStaff() {

    if (this.appointmentform.valid) {
      this.validMessage = "Appointment created successfully";
      this.appointmentService.addAppointment(this.appointmentform.value).subscribe(
        data => {
          this.appointmentform.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      )
    } else {
        this.validMessage = "Please fill out all required fields";
    }
  }

}
