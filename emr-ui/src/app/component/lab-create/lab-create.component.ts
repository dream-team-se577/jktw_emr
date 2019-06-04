import { Component, OnInit } from '@angular/core';
import { LabService } from '../../service/lab.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-lab-create',
  templateUrl: './lab-create.component.html',
  styleUrls: ['./lab-create.component.css']
})
export class LabCreateComponent implements OnInit {
  type : string[] = [
    'blood',
    'urine',
    'MRI'
  ];
  hidden : string = "[]"
  labform : FormGroup;
  validMessage :string = "";

  constructor(private labService:LabService) { }

  ngOnInit() {
    this.labform = new FormGroup({
      date: new FormControl('', Validators.required),
      results: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      patient: new FormControl(),
    });
  }

  createStaff() {

    if (this.labform.valid) {
      this.validMessage = "Lab created successfully";
      this.labService.addLab(this.labform.value).subscribe(
        data => {
          this.labform.reset();
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
