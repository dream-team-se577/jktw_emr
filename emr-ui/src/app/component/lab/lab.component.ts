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
  labs: number[];
  labCreate : boolean;

  constructor(private labService: LabService) { }

  ngOnInit() {
    this.getLabs();
  }

  getLabs(): void {
		this.labService.getLabs().subscribe(
      (data : any[]) =>{this.labs = data.map(x => x.id)},
      err => console.error(err),
      () => console.log('labs loaded')
    );
	}
}
