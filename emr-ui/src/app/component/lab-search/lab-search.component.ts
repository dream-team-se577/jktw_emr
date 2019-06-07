import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LabService } from '../../service/lab.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Lab } from '../../model/lab';

@Component({
  selector: 'app-lab-search',
  templateUrl: './lab-search.component.html',
  styleUrls: ['./lab-search.component.css']
})
export class LabSearchComponent implements OnInit {
  labForm: FormGroup;
  labList: Lab[] = [];

  validMessage: string = "";
  @Output() onLabPicked: EventEmitter<any> = new EventEmitter<any>();


  constructor(private labService: LabService,
              private fb: FormBuilder) { }

  ngOnInit() {
      let newForm = this.fb.group({
        startDate: new FormControl('', [Validators.pattern(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/)]),
        endDate: new FormControl('', [Validators.pattern(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/)])
      });

      this.labForm = newForm;
  }

  submitSearch() {
    this.validMessage = "";
    this.labList = [];
    let labFormValues = this.labForm.value;
    let query = this.labService.getRecordsByDateBetween(labFormValues['startDate'],
                                                        labFormValues['endDate']);

    query.subscribe(
      (data: any[]) => {
        if (data && data.length)
        {
          data.forEach(item => {
            let lab = new Lab();
            lab.fromJson(item);
            this.labList.push(lab);
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

  pickLabRecord(lab: Lab): void {
    this.onLabPicked.emit(lab);
  }
}
