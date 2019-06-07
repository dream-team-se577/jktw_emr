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
  public patients;
  patientDetail : boolean;
  patientId: number;
  patient : Patient;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      data => {this.patients = data},
      err => console.error(err),
      () => console.log('patients loaded')
    );
  }

  registerPatient() {
    this.patientDetail = true;
    this.patient = null;
  }

  getPatient(id: number) {
    this.patientDetail = true;
    this.patientService.getPatient(id).subscribe(
      data => this.patient = <Patient> data,
      err => console.error(err),
      () => console.log('patients loaded')
    );
  }

}
