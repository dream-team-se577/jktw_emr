import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Appointment } from '../../model/appointment';
import { Staff } from '../../model/staff';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {
  appointmentForm: FormGroup;
  validMessage: string = "";
  patient: Patient;
  staff: number[] = [];
  type : string[] = Appointment.Types;
  @Output() onAppointmentCreated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private appointmentService: AppointmentService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  onPatientAdded(patient: Patient) {
    this.patient = patient;
  }

  onStaffAdded(staff : Staff) {
    if (this.staff.indexOf(staff.id) == -1)
    {
      let tmp = [];
      this.staff.forEach(x => tmp.push(x));
      tmp.push(staff.id);
      this.staff = tmp;
    }
  }

  onStaffRemoved(staff : Staff) {
    const index = this.staff.indexOf(staff.id, 0);
    if (index > -1) {
       this.staff.splice(index, 1);
    }
  }

  submitRegistration() {
    if (this.appointmentForm.valid) {
      let appointmentFormInfo = this.appointmentForm.value;
      let appointment = new Appointment();
      appointment.date = appointmentFormInfo['date'];
      appointment.description = appointmentFormInfo['description'];
      appointment.patient = this.patient.id;
      appointment.type = appointmentFormInfo['type'];
      appointment.staff = this.staff;

      this.appointmentService.addAppointment(appointment).subscribe(
        data => {
          this.appointmentForm.reset();
          this.staff = [];
          this.patient = null;
          this.validMessage = "Your appointment has been registered!";
          this.onAppointmentCreated.emit(this.validMessage);
          return true;
        },
        error => {
          this.validMessage = "Appointment failed to register";
          return Observable.throw(error);
        }
      )
    }
    else {
      this.validMessage = "Please fill out the required fields.";
    }
  }
}
