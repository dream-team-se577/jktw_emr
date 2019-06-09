import { Component, Input,  Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Patient } from "../../model/patient";
import { PatientService } from '../../service/patient.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, OnChanges {
  patientList: Patient[] = [];

  @Input() patients: number[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    if (!this.patients)
    {
      return;
    }

    this.patients.forEach(p => {
      this.patientService.getPatient(p).subscribe(
        data => {
          let newPatient = new Patient();
          newPatient.fromJson(data);

          if (this.patientList.some(p => p.id === newPatient.id))
          {
            return true;
          }

          this.patientList.push(newPatient);
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }
}
