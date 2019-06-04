import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'address-sub-component',
    templateUrl: './address.subcomponent.html'
})
export class AddressFormSubComponent {
    @Input() addressForm: FormGroup; // This component is passed a FormGroup from the base component template
}
