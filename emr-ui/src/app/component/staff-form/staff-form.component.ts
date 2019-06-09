import { Component, Input, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Staff } from '../../model/staff';
import { Address } from '../../model/address';
import { Phone } from '../../model/phone';
import { Email } from '../../model/email';

@Component({
  selector: 'staff-form-component',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {
  staffForm: FormGroup;
  validMessage: string = "";
  lock : boolean = true;
  role : string[] = Staff.Roles;

  @Input() staff: Staff;

  constructor(private route: ActivatedRoute,
              private staffService: StaffService,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    // Still have to initialize these before response comes back
    this.staffForm  = this.fb.group({
      id : new FormControl(''),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      addresses: this.fb.array([]),
      phoneNumbers: this.fb.array([]),
      emailAddresses: this.fb.array([])
    });

    this.getStaff();
  }

  getStaff(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.staffService.getStaff(id)
      .subscribe(staff => this.createForm(staff));
  }

  createForm(staff: any): void
  {
    if (staff)
    {
      this.staff = new Staff();
      this.staff.fromJson(staff);

      let existingStaff = this.fb.group({
        id : new FormControl(this.staff.id),
        firstName: new FormControl(this.staff.firstName, Validators.required),
        middleName: new FormControl(this.staff.middleName),
        lastName: new FormControl(this.staff.lastName, Validators.required),
        role: new FormControl(this.staff.role, Validators.required),
        addresses: this.fb.array([]),
        phoneNumbers: this.fb.array([]),
        emailAddresses: this.fb.array([])
      });

      const addressControl = <FormArray>existingStaff.controls['addresses'];
      this.staff.addresses.forEach(item => {
          let address = new Address();
          address.fromJson(item);
          addressControl.push(address.toFormGroup(this.fb));
      });

      const emailControl = <FormArray>existingStaff.controls['emailAddresses'];
      this.staff.emailAddresses.forEach(item => {
          let email = new Email();
          email.fromJson(item);
          emailControl.push(email.toFormGroup(this.fb));
      });

      const phoneControl = <FormArray>existingStaff.controls['phoneNumbers'];
      this.staff.phoneNumbers.forEach(item => {
          let phone = new Phone();
          phone.fromJson(item);
          phoneControl.push(phone.toFormGroup(this.fb));
      });

      this.staffForm = existingStaff;
      this.lock = true;
    }
    else
    {
      this.validMessage = "Staff could not be found!"
    }
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

  updateStaff() {
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

      staff.id = this.staff.id;

      this.staffService.updateStaff(staff).subscribe(
        data => {
          this.validMessage = "Your staff has been updated!";
          return true;
        },
        error => {
          this.validMessage = "Staff failed to update";
          return Observable.throw(error);
        }
      )
    }
    else {
      this.validMessage = "Please fill out the required fields.";
    }
  }
}
