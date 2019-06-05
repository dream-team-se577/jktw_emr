import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export class Phone {
  areaCode : string;
  prefix : string;
  lineNumber : string;

  static readonly phoneRegex = /^\(?(\d{3})\)?[\s\.\-]?(\d{3})[\s\.\-]?(\d{4})$/;

  toFormGroup(fb: FormBuilder){
    let preFill = this.areaCode && this.prefix && this.lineNumber ?
                  this.areaCode + "-" + this.prefix + "-" + this.lineNumber : "";
    return fb.group({
          phoneNumber: new FormControl(preFill, [Validators.required, Validators.pattern(Phone.phoneRegex)])
        });
  }

  fromFormGroup(fg : FormGroup):void {
    let match = Phone.phoneRegex.exec(fg['phoneNumber']);

    this.areaCode = match[1];
    this.prefix = match[2];
    this.lineNumber = match[3];
  }
}
