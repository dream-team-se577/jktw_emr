import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { PatientFormComponent } from "../patient-form/patient-form.component";
import { Patient } from "../../model/patient";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: number[];
  patientCreate : boolean;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      (data : any[]) =>{this.patients = data.map(x => x.id)},
      err => console.error(err),
      () => console.log('patients loaded')
    );
  }
}
