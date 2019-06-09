import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LabService } from '../../service/lab.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { Lab } from '../../model/lab';
import { Staff } from '../../model/staff';
import { Patient } from '../../model/patient';

@Component({
  selector: 'lab-form-component',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.css']
})
export class LabFormComponent implements OnInit {
  labForm: FormGroup;
  validMessage: string = "";
  lock : boolean = true;
  type : string[] = Lab.Types;

  @Input() lab: Lab;

  constructor(private route: ActivatedRoute,
              private labService: LabService,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    // Still got to initialize this here before we wait on server
    this.labForm = this.fb.group({
      date: new FormControl('', Validators.required),
      results: new FormControl(),
      type: new FormControl('', Validators.required)
    });

    this.getLab();
  }

  getLab(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.labService.getLab(id)
      .subscribe(lab => this.createForm(lab));
  }

  createForm(lab: any): void
  {
    if (lab)
    {
      this.lab = new Lab();
      this.lab.fromJson(lab);
      this.labForm = this.fb.group({
        date: new FormControl(this.lab.date, Validators.required),
        results: new FormControl(this.lab.results),
        type: new FormControl(this.lab.type, Validators.required)
      });

      this.lock = true;
    }
    else
    {
      this.validMessage = "Lab could not be found!"
    }
  }

  submitChange() {
    if (this.labForm.valid) {
      let labFormInfo = this.labForm.value;
      this.lab.date = labFormInfo['date'];
      this.lab.results = labFormInfo['results'];
      this.lab.type = labFormInfo['type'];

      this.labService.updateLab(this.lab).subscribe(
        data => {
          this.validMessage = "Your lab has been updated!";
          return true;
        },
        error => {
          this.validMessage = "Lab record failed to update!";
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
