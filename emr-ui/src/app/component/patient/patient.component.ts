import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { PatientFormComponent } from "../patient-form/patient-form.component";
import { Patient } from "../../model/patient";
import { Location } from '@angular/common';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: number[];
  patientCreate : boolean;

  constructor(private patientService: PatientService,
              private location: Location) { }

  ngOnInit() {
    this.getPatients();
  }

  patientCreated(message: string): void {
    location.reload();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      (data : any[]) =>{this.patients = data.map(x => x.id)},
      err => console.error(err),
      () => console.log('patients loaded')
    );
  }
}
