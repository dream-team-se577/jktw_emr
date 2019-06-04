import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {
  role : string[] = [
    'Admin',
    'Nurse',
    'Doctor',
    'Billing',
  ];
  hidden : string = "[]"
  staffform : FormGroup;
  validMessage :string = "";

  constructor(private staffService:StaffService) { }

  ngOnInit() {
    this.staffform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      test: new FormControl(),
    });
  }

  createStaff() {

    if (this.staffform.valid) {
      this.validMessage = "Staff created successfully";
      this.staffService.addStaff(this.staffform.value).subscribe(
        data => {
          this.staffform.reset();
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
