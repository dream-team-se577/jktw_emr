import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export class Email {
  localPart: string;
  domain: string;

  static readonly emailRegex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;

  toFormGroup(fb: FormBuilder) {
    let emailAddressPrefill = this.localPart && this.domain ?
                              this.localPart + "@" + this.domain : "";
    return fb.group({
      emailAddress: new FormControl(emailAddressPrefill, [Validators.required, Validators.pattern(Email.emailRegex)])
    });
  }

  fromJson(email: any): void
  {
    this.localPart = email['localPart'];
    this.domain = email['domain'];
  }

  fromFormGroup(fg: FormGroup): void{
    let match = Email.emailRegex.exec(fg['emailAddress']);
    if (!match)
    {
      return;
    }

    this.localPart = match[1];
    this.domain = match[2];
  }
}
