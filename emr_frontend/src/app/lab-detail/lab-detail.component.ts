import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Lab } from '../lab';
import { LabService }  from '../lab.service';

@Component({
	selector: 'app-lab-detail',
	templateUrl: './lab-detail.component.html',
	styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {
	@Input() lab: Lab;

	constructor(private route: ActivatedRoute, private labService: LabService, private location: Location) {	  
	}

	ngOnInit() {
		/*this.getLab();*/
	}
  
	/*getLab(): void {
		const uuid = +this.route.snapshot.paramMap.get('uuid');
		this.labService.getLab(uuid)
		.subscribe(lab => this.lab = lab);
	}*/

	goBack(): void {
		this.location.back();
	}
}
