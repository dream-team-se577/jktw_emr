import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Staff } from '../../model/staff';

@Component({
  selector: 'app-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.css']
})
export class StaffSearchComponent implements OnInit {
  staffForm: FormGroup;
  staffList: Staff[] = [];

  role : string[] = [
    'Admin',
    'Nurse',
    'Doctor',
    'Billing',
  ];

  validMessage: string = "";
  @Output() onStaffPicked: EventEmitter<any> = new EventEmitter<any>();


  constructor(private staffService: StaffService,
              private fb: FormBuilder) { }

  ngOnInit() {
      let newForm = this.fb.group({
        firstName: new FormControl(),
        middleName: new FormControl(),
        lastName: new FormControl(),
        role: new FormControl()
      });

      this.staffForm = newForm;
  }

  submitSearch() {
    this.validMessage = "";
    this.staffList = [];
    let staffFormValues = this.staffForm.value;
    let query = null;
    if (staffFormValues['role']){
      query = this.staffService.getStaffByRole(staffFormValues['role']);
    }
    else if (staffFormValues['firstName'] && !staffFormValues['lastName']){
      query = this.staffService.getStaffByFirstName(staffFormValues['firstName']);
    }
    else if (staffFormValues['lastName'] && !staffFormValues['firstName']){
      query = this.staffService.getStaffByLastName(staffFormValues['lastName']);
    }
    else if (staffFormValues['middleName']){
      query = this.staffService.getStaffByWholeName(staffFormValues['firstName'],
                                                        staffFormValues['middleName'],
                                                        staffFormValues['lastName']);
    }
    else {
      query = this.staffService.getStaffByFirstNameAndLastName(staffFormValues['firstName'],
                                                                   staffFormValues['lastName']);
    }

    query.subscribe(
      data => {
        if (data && data.length)
        {
          data.forEach(item => {
            let staff = new Staff();
            staff.fromJson(item);
            this.staffList.push(staff);
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

  pickStaff(staff: Staff): void {
    this.onStaffPicked.emit(staff);
  }
}
