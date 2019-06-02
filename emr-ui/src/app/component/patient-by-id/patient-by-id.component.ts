import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-by-id',
  templateUrl: './patient-by-id.component.html',
  styleUrls: ['./patient-by-id.component.css']
})
export class PatientByIdComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
