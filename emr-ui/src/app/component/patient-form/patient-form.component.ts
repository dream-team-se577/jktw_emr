import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PatientService } from '../../service/patient.service';
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
export class PatientFormComponent implements OnInit, OnChanges {
  patientForm: FormGroup;
  validMessage: string = "";
  lock : boolean = true;
  @Input() patient: Patient;

  constructor(private patientService: PatientService,
              private fb: FormBuilder) { }

  ngOnInit() {
    if (this.patient)
    {
      this.lock = true;
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
      this.patient.addresses.forEach(item => {
          let address = new Address();
          address.fromJson(item);
          addressControl.push(address.toFormGroup(this.fb));
      });

      const emailControl = <FormArray>existingPatient.controls['emailAddresses'];
      this.patient.emailAddresses.forEach(item => {
          let email = new Email();
          email.fromJson(item);
          emailControl.push(email.toFormGroup(this.fb));
      });

      const phoneControl = <FormArray>existingPatient.controls['phoneNumbers'];
      this.patient.phoneNumbers.forEach(item => {
          let phone = new Phone();
          phone.fromJson(item);
          phoneControl.push(phone.toFormGroup(this.fb));
      });

      this.patientForm = existingPatient;
    }
    else
    {
      this.lock = false;
      let newForm = this.fb.group({
        id : new FormControl(),
        firstName: new FormControl('', Validators.required),
        middleName: new FormControl(),
        lastName: new FormControl('', Validators.required),
        ssn: new FormControl('XXX-XX-XXXX', [Validators.required, Validators.pattern(/^\d{3}\-\d{2}\-\d{4}$/)]),
        addresses: this.fb.array([]),
        phoneNumbers: this.fb.array([]),
        emailAddresses: this.fb.array([])
      });

      this.patientForm = newForm;
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  addAddress(): void {
      const addressControl = <FormArray> this.patientForm.controls['addresses'];
      addressControl.push(new Address().toFormGroup(this.fb));
  }

  delAddress(index: number): void {
      const arrayControl = <FormArray>this.patientForm.controls['addresses'];
      arrayControl.removeAt(index);
  }

  addEmail(): void {
      const emailControl = <FormArray> this.patientForm.controls['emailAddresses'];
      emailControl.push(new Email().toFormGroup(this.fb));
  }

  delEmail(index: number): void {
      const arrayControl = <FormArray>this.patientForm.controls['emailAddresses'];
      arrayControl.removeAt(index);
  }

  addPhone(): void {
      const phoneControl = <FormArray> this.patientForm.controls['phoneNumbers'];
      phoneControl.push(new Phone().toFormGroup(this.fb));
  }

  delPhone(index: number): void {
      const arrayControl = <FormArray>this.patientForm.controls['phoneNumbers'];
      arrayControl.removeAt(index);
  }

  submitRegistration() {
    this.updatePatient(this.patient == null)
  }

  updatePatient(newPatient:boolean) {
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

      patient.appointments = newPatient ? [] : this.patient.appointments;
      patient.labRecords = newPatient ? [] : this.patient.labRecords;
      if (!newPatient)
      {
        patient.id = this.patient.id;
      }

      let action = newPatient ? this.patientService.addPatient(patient) :
                                this.patientService.updatePatient(patient);

      action.subscribe(
        data => {
          this.patientForm.reset();
          this.validMessage = "Your patient has been registered!";
          return true;
        },
        error => {
          this.validMessage = "Patient failed to register";
          return Observable.throw(error);
        }
      )
    }
    else {
      this.validMessage = "Please fill out the required fields.";
    }
  }
}
