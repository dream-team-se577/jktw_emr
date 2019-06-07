import { Component, OnInit } from '@angular/core';
import { LabService } from '../../service/lab.service';
import { LabFormComponent } from "../lab-form/lab-form.component";
import { Lab } from "../../model/lab";

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  public labs;
  labDetail : boolean;
  labId: number;
  lab : Lab;

  constructor(private labService: LabService) { }

  ngOnInit() {
    this.getLabs();
  }

  registerLab() {
    this.labDetail = true;
    this.lab = null;
  }

  getLabs(): void {
		this.labService.getLabs().subscribe(
      data => {this.labs = data},
      err => console.error(err),
      () => console.log('labs loaded')
    );
	}

  getLab(id: number) {
    this.labDetail = true;
    this.labService.getLab(id).subscribe(
      data => this.lab = <Lab> data,
      err => console.error(err),
      () => console.log('lab loaded')
    );
  }

}
