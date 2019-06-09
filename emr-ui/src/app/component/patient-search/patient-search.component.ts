import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {
  patientForm: FormGroup;
  patientList: Patient[] = [];
  validMessage: string = "";
  
  @Output() onPatientPicked: EventEmitter<Patient> = new EventEmitter<Patient>();


  constructor(private patientService: PatientService,
              private fb: FormBuilder) { }

  ngOnInit() {
      let newForm = this.fb.group({
        firstName: new FormControl(),
        middleName: new FormControl(),
        lastName: new FormControl(),
        ssn: new FormControl('', [Validators.pattern(/^\d{3}\-\d{2}\-\d{4}$/)])
      });

      this.patientForm = newForm;
  }

  submitSearch() {
    this.validMessage = "";
    this.patientList = [];
    let patientFormValues = this.patientForm.value;
    let query = null;
    if (patientFormValues['ssn'] && this.patientForm.controls['ssn'].valid){
      query = this.patientService.getPatientBySsn(patientFormValues['ssn'].split('-').join(''));
    }
    else if (patientFormValues['firstName'] && !patientFormValues['lastName']){
      query = this.patientService.getPatientByFirstName(patientFormValues['firstName']);
    }
    else if (patientFormValues['lastName'] && !patientFormValues['firstName']){
      query = this.patientService.getPatientByLastName(patientFormValues['lastName']);
    }
    else if (patientFormValues['middleName']){
      query = this.patientService.getPatientByWholeName(patientFormValues['firstName'],
                                                        patientFormValues['middleName'],
                                                        patientFormValues['lastName']);
    }
    else {
      query = this.patientService.getPatientByFirstNameAndLastName(patientFormValues['firstName'],
                                                                   patientFormValues['lastName']);
    }

    query.subscribe(
      data => {
        if (data && data.length)
        {
          data.forEach(item => {
            let patient = new Patient();
            patient.fromJson(item);
            this.patientList.push(patient);
          })
          return true;
        }
        this.validMessage = "No matches";
        return false;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }

  pickPatient(patient: Patient): void {
    this.onPatientPicked.emit(patient);
  }
}
