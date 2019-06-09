import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { Appointment } from '../../model/appointment';
import { Staff } from '../../model/staff';
import { Patient } from '../../model/patient';

@Component({
  selector: 'appointment-form-component',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  validMessage: string = "";
  lock : boolean = true;
  staff : number[] = [];
  type : string[] = Appointment.Types;

  @Input() appointment: Appointment;

  constructor(private route: ActivatedRoute,
              private appointmentService: AppointmentService,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      date: new FormControl('', Validators.required),
      description: new FormControl(),
      type: new FormControl('', Validators.required)
    });
    this.getAppointment();
  }

  getAppointment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.appointmentService.getAppointment(id)
      .subscribe(appointment => this.createForm(appointment));
  }

  createForm(appointment: any): void
  {
    if (appointment)
    {
      this.appointment = new Appointment();
      this.appointment.fromJson(appointment);
      this.appointmentForm = this.fb.group({
        date: new FormControl(this.appointment.date, Validators.required),
        description: new FormControl(this.appointment.description),
        type: new FormControl(this.appointment.type, Validators.required)
      });
      this.staff = this.appointment.staff;

      this.lock = true;
    }
    else
    {
      this.validMessage = "Appointment could not be found!"
    }
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
      let tmp = [];
      this.staff.forEach(x => tmp.push(x));
      tmp.splice(index, 1)
      this.staff = tmp;
    }
  }

  submitChange() {
    if (this.appointmentForm.valid) {
      let appointmentFormInfo = this.appointmentForm.value;
      this.appointment.date = appointmentFormInfo['date'];
      this.appointment.description = appointmentFormInfo['description'];
      this.appointment.type = appointmentFormInfo['type'];
      this.appointment.staff = this.staff;

      this.appointmentService.updateAppointment(this.appointment).subscribe(
        data => {
          this.validMessage = "Your appointment has been updated!";
          return true;
        },
        error => {
          this.validMessage = "Appointment failed to update!";
          return Observable.throw(error);
        }
      )
    }
    else {
      this.validMessage = "Please fill out the required fields.";
    }
  }

  cancel(): void {
    this.location.back();
  }
}
