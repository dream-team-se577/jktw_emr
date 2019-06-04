import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'email-sub-component',
    templateUrl: './email.subcomponent.html'
})
export class EmailFormSubComponent {
    @Input() emailForm: FormGroup; // This component is passed a FormGroup from the base component template
}
