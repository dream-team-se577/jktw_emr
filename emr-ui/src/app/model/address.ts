import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export class Address {
  streetNumber: string;
  addressLine2: string;
  streetName: string;
  cityName: string;
  stateName: string;
  zipCode: string;
  countryName: string;

  static readonly addressLine1Regex = /^([0-9]+)\s(([0-9A-Za-z\.\'#]|[^\S\r\n])+)/;
  static readonly zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

  fromJson(address: any): void
  {
    this.streetNumber = address['streetNumber'];
    this.addressLine2 = address['addressLine2'];
    this.streetName = address['streetName'];
    this.cityName = address['cityName'];
    this.stateName = address['stateName'];
    this.zipCode = address['zipCode'];
    this.countryName = address['countryName'];
  }

  toFormGroup(fb: FormBuilder) {
    let addressLine1Prefill = this.streetNumber && this.streetName ?
                              this.streetNumber + " " + this.streetName : "";

    return fb.group({
      addressLine1: new FormControl(addressLine1Prefill, [Validators.required, Validators.pattern(Address.addressLine1Regex)]),
      addressLine2: new FormControl(this.addressLine2),
      city: new FormControl(this.cityName, Validators.required),
      state: new FormControl(this.stateName, Validators.required),
      zipCode: new FormControl(this.zipCode, [Validators.required, Validators.pattern(Address.zipCodeRegex)]),
      country: new FormControl(this.countryName || "United States of America")
    });
  }

  fromFormGroup(fg: FormGroup):void {
    let match = Address.addressLine1Regex.exec(fg['addressLine1']);
    if (!match)
    {
      return;
    }

    this.streetNumber = match[1];
    this.streetName = match[2];
    if (fg['addressLine2'])
    {
      this.addressLine2 = fg['addressLine2'];
    }
    this.cityName =  fg['city'];
    this.stateName = fg['state'];
    this.zipCode = fg['zipCode'];
    this.countryName = fg['country'];
  }
}
