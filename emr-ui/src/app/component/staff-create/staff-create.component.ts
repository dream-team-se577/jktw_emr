import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Staff } from '../../model/staff';
import { Address } from '../../model/address';
import { Phone } from '../../model/phone';
import { Email } from '../../model/email';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {
  staffForm: FormGroup;
  validMessage: string = "";
  roles: string[] = Staff.Roles;
  @Output() onStaffCreated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private staffService: StaffService,
              private fb: FormBuilder) { }

    ngOnInit() {
      this.staffForm = this.fb.group({
        id : new FormControl(),
        firstName: new FormControl('', Validators.required),
        middleName: new FormControl(),
        lastName: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        addresses: this.fb.array([]),
        phoneNumbers: this.fb.array([]),
        emailAddresses: this.fb.array([])
      });
    }

    addAddress(): void {
        const addressControl = <FormArray> this.staffForm.controls['addresses'];
        addressControl.push(new Address().toFormGroup(this.fb));
    }

    delAddress(index: number): void {
        const arrayControl = <FormArray>this.staffForm.controls['addresses'];
        arrayControl.removeAt(index);
    }

    addEmail(): void {
        const emailControl = <FormArray> this.staffForm.controls['emailAddresses'];
        emailControl.push(new Email().toFormGroup(this.fb));
    }

    delEmail(index: number): void {
        const arrayControl = <FormArray>this.staffForm.controls['emailAddresses'];
        arrayControl.removeAt(index);
    }

    addPhone(): void {
        const phoneControl = <FormArray> this.staffForm.controls['phoneNumbers'];
        phoneControl.push(new Phone().toFormGroup(this.fb));
    }

    delPhone(index: number): void {
        const arrayControl = <FormArray>this.staffForm.controls['phoneNumbers'];
        arrayControl.removeAt(index);
    }

    submitRegistration() {
      if (this.staffForm.valid) {
        let staffFormInfo = this.staffForm.value;
        let staff = new Staff();
        staff.firstName = staffFormInfo['firstName'];
        if (staffFormInfo['middleName'])
        {
          staff.middleName = staffFormInfo['middleName'];
        }

        staff.lastName = staffFormInfo['lastName'];
        staff.role = staffFormInfo['role'];
        staff.addresses = [];
        for(let addressForm of staffFormInfo['addresses']) {
          let address = new Address();
          address.fromFormGroup(addressForm);
          staff.addresses.push(address);
        }

        staff.phoneNumbers = [];
        for(let phoneForm of staffFormInfo['phoneNumbers']) {
          let phone = new Phone();
          phone.fromFormGroup(phoneForm);
          staff.phoneNumbers.push(phone);
        }

        staff.emailAddresses = []
        for(let emailForm of staffFormInfo['emailAddresses']) {
          let email = new Email();
          email.fromFormGroup(emailForm);
          staff.emailAddresses.push(email);
        }

        this.staffService.addStaff(staff).subscribe(
          data => {
            this.staffForm.reset();
            this.validMessage = "Your staff has been registered!";
            this.onStaffCreated.emit(this.validMessage);
            return true;
          },
          error => {
            this.validMessage = "Staff failed to register";
            return Observable.throw(error);
          }
        )
      }
      else {
        this.validMessage = "Please fill out the required fields.";
      }
    }
  }
