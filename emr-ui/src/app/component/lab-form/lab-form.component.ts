import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LabService } from '../../service/lab.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Lab } from '../../model/lab';

@Component({
  selector: 'lab-form-component',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.css']
})
export class LabFormComponent implements OnInit, OnChanges {
  labForm: FormGroup;
  validMessage: string = "";
  lock : boolean = true;
  @Input() lab: Lab;

  type : string[] = [
    'Blood',
    'Urine',
    'MRI',
    'CT-Scan',
  ];

  constructor(private labService: LabService,
              private fb: FormBuilder) { }

    ngOnInit() {
      if (this.lab)
      {
        this.lock = true;
        let existingLab = this.fb.group({
          id : new FormControl(this.lab.id),
          date: new FormControl(this.lab.date, Validators.required),
          results: new FormControl(this.lab.results),
          patient: new FormControl(this.lab.patient, Validators.required),
          type: new FormControl(this.lab.type, Validators.required)
        });

        this.labForm = existingLab;
      }
      else
      {
        this.lock = false;
        let newForm = this.fb.group({
          id : new FormControl(),
          date: new FormControl('', Validators.required),
          results: new FormControl('', Validators.required),
          patient: new FormControl('', Validators.required),
          type: new FormControl('', Validators.required),
        });

        this.labForm = newForm;
      }
    }

    ngOnChanges() {
      this.ngOnInit();
    }

    submitRegistration() {
      this.updateLab(this.lab == null)
    }

    updateLab(newLab:boolean) {
      if (this.labForm.valid) {
        let labFormInfo = this.labForm.value;
        let lab = new Lab();
        lab.date = labFormInfo['date'];
        lab.results = labFormInfo['results'];
        lab.patient = labFormInfo['lastName'];
        lab.type = labFormInfo['type'];

        if (!newLab)
        {
          lab.id = this.lab.id;
        }

        let action = newLab ? this.labService.addLab(lab) :
                                  this.labService.updateLab(lab);

        action.subscribe(
          data => {
            this.labForm.reset();
            this.validMessage = "Your lab has been registered!";
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
