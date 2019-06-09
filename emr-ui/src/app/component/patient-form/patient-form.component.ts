import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { AppointmentService } from '../../service/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Patient } from '../../model/patient';
import { Address } from '../../model/address';
import { Phone } from '../../model/phone';
import { Email } from '../../model/email';

@Component({
  selector: 'patient-form-component',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup;
  validMessage: string = "";
  lock : boolean = true;
  appointments : number[];
  labRecords : number[];

  @Input() patient: Patient;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private appointmentService: AppointmentService,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.patientForm = this.fb.group({
      id : new FormControl(),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(),
      lastName: new FormControl('', Validators.required),
      ssn: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\-\d{2}\-\d{4}$/)]),
      addresses: this.fb.array([]),
      phoneNumbers: this.fb.array([]),
      emailAddresses: this.fb.array([])
    });

    this.getPatient();
  }

  getPatient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(id)
      .subscribe(patient => this.createForm(patient));
  }

  createForm(patient: any): void
  {
    if (patient)
    {
      this.patient = new Patient();
      this.patient.fromJson(patient);

      let match = /^(\d{3})(\d{2})(\d{4})$/.exec(this.patient.ssn);
      let newSsn = match[1] + "-" + match[2] + "-" + match[3];
      let existingPatient = this.fb.group({
        id : new FormControl(this.patient.id),
        firstName: new FormControl(this.patient.firstName, Validators.required),
        middleName: new FormControl(this.patient.middleName),
        lastName: new FormControl(this.patient.lastName, Validators.required),
        ssn: new FormControl(newSsn, [Validators.required, Validators.pattern(/^\d{3}\-\d{2}\-\d{4}$/)]),
        addresses: this.fb.array([]),
        phoneNumbers: this.fb.array([]),
        emailAddresses: this.fb.array([])
      });

      const addressControl = <FormArray>existingPatient.controls['addresses'];
      patient.addresses.forEach(item => {
          let address = new Address();
          address.fromJson(item);
          addressControl.push(address.toFormGroup(this.fb));
      });

      const emailControl = <FormArray>existingPatient.controls['emailAddresses'];
      patient.emailAddresses.forEach(item => {
          let email = new Email();
          email.fromJson(item);
          emailControl.push(email.toFormGroup(this.fb));
      });

      const phoneControl = <FormArray>existingPatient.controls['phoneNumbers'];
      patient.phoneNumbers.forEach(item => {
          let phone = new Phone();
          phone.fromJson(item);
          phoneControl.push(phone.toFormGroup(this.fb));
      });

      this.appointments = this.patient.appointments;
      this.labRecords = this.patient.labRecords;

      this.patientForm = existingPatient;
      this.lock = true;
    }
    else
    {
      this.validMessage = "Patient could not be found!"
    }
  }

  addAddress() {
      const addressControl = <FormArray> this.patientForm.controls['addresses'];
      addressControl.push(new Address().toFormGroup(this.fb));
  }

  delAddress(index: number) {
      const arrayControl = <FormArray>this.patientForm.controls['addresses'];
      arrayControl.removeAt(index);
  }

  addEmail() {
      const emailControl = <FormArray> this.patientForm.controls['emailAddresses'];
      emailControl.push(new Email().toFormGroup(this.fb));
  }

  delEmail(index: number) {
      const arrayControl = <FormArray>this.patientForm.controls['emailAddresses'];
      arrayControl.removeAt(index);
  }

  addPhone() {
      const phoneControl = <FormArray> this.patientForm.controls['phoneNumbers'];
      phoneControl.push(new Phone().toFormGroup(this.fb));
  }

  delPhone(index: number) {
      const arrayControl = <FormArray>this.patientForm.controls['phoneNumbers'];
      arrayControl.removeAt(index);
  }

  updatePatient() {
    if (this.patientForm.valid) {
      let patientFormInfo = this.patientForm.value;
      let patient = new Patient();
      patient.firstName = patientFormInfo['firstName'];
      if (patientFormInfo['middleName'])
      {
        patient.middleName = patientFormInfo['middleName'];
      }

      patient.lastName = patientFormInfo['lastName'];
      patient.ssn = patientFormInfo['ssn'].split('-').join('');
      patient.addresses = [];
      for(let addressForm of patientFormInfo['addresses']) {
        let address = new Address();
        address.fromFormGroup(addressForm);
        patient.addresses.push(address);
      }

      patient.phoneNumbers = [];
      for(let phoneForm of patientFormInfo['phoneNumbers']) {
        let phone = new Phone();
        phone.fromFormGroup(phoneForm);
        patient.phoneNumbers.push(phone);
      }

      patient.emailAddresses = []
      for(let emailForm of patientFormInfo['emailAddresses']) {
        let email = new Email();
        email.fromFormGroup(emailForm);
        patient.emailAddresses.push(email);
      }

      patient.appointments = this.patient.appointments;
      patient.labRecords = this.patient.labRecords;
      patient.id = this.patient.id;

      this.patientService.updatePatient(patient).subscribe(
        data => {
          this.validMessage = "Your patient has been updated!";
          return true;
        },
        error => {
          this.validMessage = "Patient failed to update";
          return Observable.throw(error);
        }
      );
    }
    else {
      this.validMessage = "Please fill out the required fields.";
    }
  }

  deleteAppointment(appointment: number): void {
    if(!confirm("Are you sure to cancel this appointment?")) {
      return;
    }

    let tmp = [];
    this.appointments.forEach(x => tmp.push(x));
    this.appointments = tmp.filter(h => h !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe(
      data => {
        this.validMessage = "Appointment has been canceled!";
        return true;
      },
      error => {
        this.validMessage = "Failed to cancel appointment!";
        return Observable.throw(error);
      }
    );
  }
}
