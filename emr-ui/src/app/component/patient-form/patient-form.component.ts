import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'patient-form-component',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup;
  validMessage: string = "";
  @Input() addressArray: any[];
  @Input() phoneArray: any[];
  @Input() emailArray: any[];

  constructor(private patientService: PatientService,
              private fb: FormBuilder) { }

  ngOnInit() {
    let newForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(),
      lastName: new FormControl('', Validators.required),
      ssn: new FormControl('XXX-XX-XXXX', [Validators.required, Validators.pattern('^\d{3}-\d{2}-\d{4}$')]),
      addresses: this.fb.array([]),
      phoneNumbers: this.fb.array([]),
      emailAddresses: this.fb.array([])
    });

    const addressControl = <FormArray>newForm.controls['addresses'];
    this.addressArray.forEach(item => {
        let newGroup = this.fb.group({
          addressLine1: new FormControl('', [Validators.required, Validators.pattern('^(?:[0-9]+)\s(?:[0-9A-Za-z\.\'#]|[^\S\r\n])+')]),
          addressLine2: new FormControl(),
          city: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
          zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]),
          country: new FormControl()
        });
        addressControl.push(newGroup);
    });

    const emailControl = <FormArray>newForm.controls['emailAddresses'];
        this.emailArray.forEach(item => {
            let newGroup = this.fb.group({
              emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')])
            });
            emailControl.push(newGroup);
        });

    const phoneControl = <FormArray>newForm.controls['phoneNumbers'];
        this.phoneArray.forEach(item => {
            let newGroup = this.fb.group({
              phoneNumber: new FormControl('555-555-5555', [Validators.required, Validators.pattern('^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$')])
            });
            phoneControl.push(newGroup);
        });

    this.patientForm = newForm;
  }

  addAddress(): void {
      const addressControl = <FormArray> this.patientForm.controls['addresses'];
      let newGroup = this.fb.group({
        addressLine1: new FormControl('', [Validators.required, Validators.pattern('^(?:[0-9]+)\s(?:[0-9A-Za-z\.\'#]|[^\S\r\n])+')]),
        addressLine2: new FormControl(),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]),
        country: new FormControl()
      });
      addressControl.push(newGroup);
  }

  delAddress(index: number): void {
      const arrayControl = <FormArray>this.patientForm.controls['addresses'];
      arrayControl.removeAt(index);
  }

  addEmail(): void {
      const emailControl = <FormArray> this.patientForm.controls['emailAddresses'];
      let newGroup = this.fb.group({
        emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')])
      });
      emailControl.push(newGroup);
  }

  delEmail(index: number): void {
      const arrayControl = <FormArray>this.patientForm.controls['emailAddresses'];
      arrayControl.removeAt(index);
  }

  addPhone(): void {
      const phoneControl = <FormArray> this.patientForm.controls['phoneNumbers'];
      let newGroup = this.fb.group({
        phoneNumber: new FormControl('555-555-5555', [Validators.required, Validators.pattern('^\(?\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}$')])
      });
      phoneControl.push(newGroup);
  }

  delPhone(index: number): void {
      const arrayControl = <FormArray>this.patientForm.controls['phoneNumbers'];
      arrayControl.removeAt(index);
  }

  submitRegistration() {

    if (this.patientForm.valid) {
      this.validMessage = "Your patient has been registered!";
      this.patientService.addPatient(this.patientForm.value).subscribe(
        data => {
          this.patientForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    }
    else {
      this.validMessage = "Please fille out the required fields.";
    }
  }
}
