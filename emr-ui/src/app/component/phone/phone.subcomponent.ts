import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'phone-sub-component',
    templateUrl: './phone.subcomponent.html'
})
export class PhoneFormSubComponent {
    @Input() phoneForm: FormGroup; // This component is passed a FormGroup from the base component template
}
