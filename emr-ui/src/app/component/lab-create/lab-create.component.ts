import { Component, Input, OnInit } from '@angular/core';
import { LabService } from '../../service/lab.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Lab } from '../../model/lab';
import { Staff } from '../../model/staff';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-lab-create',
  templateUrl: './lab-create.component.html',
  styleUrls: ['./lab-create.component.css']
})
export class LabCreateComponent implements OnInit {
  labForm: FormGroup;
  validMessage: string = "";
  patient: Patient;
  type : string[] = Lab.Types;

  constructor(private labService: LabService,
              private fb: FormBuilder) { }

    ngOnInit() {
      this.labForm = this.fb.group({
        date: new FormControl('', Validators.required),
        results: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required)
      });
    }

    onPatientAdded(patient: Patient) {
      this.patient = patient;
    }

    submitRegistration() {
      if (this.labForm.valid) {
        let labFormInfo = this.labForm.value;
        let lab = new Lab();
        lab.date = labFormInfo['date'];
        lab.results = labFormInfo['results'];
        lab.patient = this.patient.id;
        lab.type = labFormInfo['type'];

        this.labService.addLab(lab).subscribe(
          data => {
            this.labForm.reset();
            this.patient = null;
            this.validMessage = "Your lab record has been registered!";
            return true;
          },
          error => {
            this.validMessage = "Lab failed to register";
            return Observable.throw(error);
          }
        )
      }
      else {
        this.validMessage = "Please fill out the required fields.";
      }
    }
  }
