import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  hidden : string = "[]"
  patientform : FormGroup;
  validMessage :string = "";

  constructor(private patientService:PatientService) { }

  ngOnInit() {
    this.patientform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      ssn: new FormControl('', Validators.required),
      addresses: new FormControl(),
      emailAddresses: new FormControl(),
      phoneNumbers: new FormControl(),
      appointments: new FormControl(),
      labRecords: new FormControl(),
    });
  }

  createPatient() {

    if (this.patientform.valid) {
      this.validMessage = "Patient created successfully";
      this.patientService.addPatient(this.patientform.value).subscribe(
        data => {
          this.patientform.reset();
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
