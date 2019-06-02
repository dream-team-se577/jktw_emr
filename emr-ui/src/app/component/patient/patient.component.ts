import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  public patients;

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

}
