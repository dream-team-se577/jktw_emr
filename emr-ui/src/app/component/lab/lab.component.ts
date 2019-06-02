import { Component, OnInit } from '@angular/core';
import { LabService } from '../../service/lab.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  public labs;

  constructor(private labService: LabService) { }

  ngOnInit() {
    this.getLabs();
  }

  getLabs(): void {
		this.labService.getLabs().subscribe(
      data => {this.labs = data},
      err => console.error(err),
      () => console.log('labs loaded')
    );
	}

}
