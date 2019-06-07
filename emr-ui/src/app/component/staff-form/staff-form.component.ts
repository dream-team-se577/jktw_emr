import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { StaffService } from '../../service/staff.service';
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
export class StaffFormComponent implements OnInit, OnChanges {
  staffForm: FormGroup;
  validMessage: string = "";
  lock : boolean = true;
  @Input() staff: Staff;

  role : string[] = [
    'Admin',
    'Nurse',
    'Doctor',
    'Billing',
  ];

  constructor(private staffService: StaffService,
              private fb: FormBuilder) { }

  ngOnInit() {
    if (this.staff)
    {
      this.lock = true;
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
    }
    else
    {
      this.lock = false;
      let newForm = this.fb.group({
        id : new FormControl(),
        firstName: new FormControl('', Validators.required),
        middleName: new FormControl(),
        lastName: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        addresses: this.fb.array([]),
        phoneNumbers: this.fb.array([]),
        emailAddresses: this.fb.array([])
      });

      this.staffForm = newForm;
    }
  }

  ngOnChanges() {
    this.ngOnInit();
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
    this.updateStaff(this.staff == null)
  }

  updateStaff(newStaff:boolean) {
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

      if (!newStaff)
      {
        staff.id = this.staff.id;
      }

      let action = newStaff ? this.staffService.addStaff(staff) :
                                this.staffService.updateStaff(staff);

      action.subscribe(
        data => {
          this.staffForm.reset();
          this.validMessage = "Your staff has been registered!";
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
