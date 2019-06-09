import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Patient } from '../../model/patient';
import { Address } from '../../model/address';
import { Phone } from '../../model/phone';
import { Email } from '../../model/email';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  patientForm: FormGroup;
  validMessage: string = "";
  @Output() onPatientCreated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private patientService: PatientService,
              private fb: FormBuilder) { }

    ngOnInit() {
      this.patientForm = this.fb.group({
        id : new FormControl(),
        firstName: new FormControl('', Validators.required),
        middleName: new FormControl(),
        lastName: new FormControl('', Validators.required),
        ssn: new FormControl('XXX-XX-XXXX', [Validators.required, Validators.pattern(/^\d{3}\-\d{2}\-\d{4}$/)]),
        addresses: this.fb.array([]),
        phoneNumbers: this.fb.array([]),
        emailAddresses: this.fb.array([])
      });
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

        patient.appointments = [];
        patient.labRecords = [];

        this.patientService.addPatient(patient).subscribe(
          data => {
            this.patientForm.reset();
            this.validMessage = "Your patient has been registered!";
            this.onPatientCreated.emit(this.validMessage);
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
