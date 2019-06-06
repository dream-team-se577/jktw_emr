import { Component, OnInit, OnChanges } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { PatientFormComponent } from "../patient-form/patient-form.component";
import { Patient } from "../../model/patient";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, OnChanges {
  public patients;
  patientDetail : boolean;
  patientId: number;
  patient : Patient;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatients();
  }

  ngOnChanges() {

  }

  showPatient() {

  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(
      data => {this.patients = data},
      err => console.error(err),
      () => console.log('patients loaded')
    );
  }

  getPatient(id: number) {
    this.patientDetail = true;
    this.patientService.getPatient(id).subscribe(
      data => {setTimeout(() => { this.patient = <Patient> data })},
      err => console.error(err),
      () => console.log('patients loaded')
    );
  }

}
