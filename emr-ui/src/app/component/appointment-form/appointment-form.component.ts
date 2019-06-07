import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Appointment } from '../../model/appointment';
import { Staff } from '../../model/staff';

@Component({
  selector: 'appointment-form-component',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  validMessage: string = "";
  lock : boolean = true;
  @Input() appointment: Appointment;

  type : string[] = [
    'Check-up',
    'follow-up',
    'illness',
  ];

  constructor(private appointmentService: AppointmentService,
              private fb: FormBuilder) { }

    ngOnInit() {
      if (this.appointment)
      {
        this.lock = true;
        let existingAppointment = this.fb.group({
          id : new FormControl(this.appointment.id),
          date: new FormControl(this.appointment.date, Validators.required),
          description: new FormControl(this.appointment.description),
          patient: new FormControl(this.appointment.patient, Validators.required),
          type: new FormControl(this.appointment.type, Validators.required),
          staffs: this.fb.array([])
        });

        this.appointmentForm = existingAppointment;
      }
      else
      {
        this.lock = false;
        let newForm = this.fb.group({
          id : new FormControl(),
          date: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          patient: new FormControl('', Validators.required),
          type: new FormControl('', Validators.required),
          staffs: this.fb.array([])
        });

        this.appointmentForm = newForm;
      }
    }

    ngOnChanges() {
      this.ngOnInit();
    }

    submitRegistration() {
      this.updateAppointment(this.appointment == null)
    }

    updateAppointment(newAppointment:boolean) {
      if (this.appointmentForm.valid) {
        let appointmentFormInfo = this.appointmentForm.value;
        let appointment = new Appointment();
        appointment.date = appointmentFormInfo['date'];
        appointment.description = appointmentFormInfo['description'];
        appointment.patient = appointmentFormInfo['lastName'];
        appointment.type = appointmentFormInfo['type'];

        if (!newAppointment)
        {
          appointment.id = this.appointment.id;
        }

        let action = newAppointment ? this.appointmentService.addAppointment(appointment) :
                                  this.appointmentService.updateAppointment(appointment);

        action.subscribe(
          data => {
            this.appointmentForm.reset();
            this.validMessage = "Your appointment has been registered!";
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
