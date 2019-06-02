import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../model/patient';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient;

  constructor(private route: ActivatedRoute, private patientService: PatientService, private location: Location) { }

  ngOnInit() {
    this.getPatient();
  }

  getPatient(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.patientService.getPatient(id)
  .subscribe(patient => this.patient = patient);
  }

  goBack(): void {
    this.location.back();
  }

}
