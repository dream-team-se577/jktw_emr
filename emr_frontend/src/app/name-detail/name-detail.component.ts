import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Name } from '../name';
import { NameService }  from '../name.service';

@Component({
	selector: 'app-name-detail',
	templateUrl: './name-detail.component.html',
	styleUrls: ['./name-detail.component.css']
})
export class NameDetailComponent implements OnInit {
	@Input() name: Name;

	constructor(private route: ActivatedRoute, private nameService: NameService, private location: Location) {	  
	}

	ngOnInit() {
		/*this.getName();*/
	}
  
	/*getName(): void {
		const uuid = +this.route.snapshot.paramMap.get('uuid');
		this.nameService.getName(uuid)
		.subscribe(name => this.name = name);
	}*/

  goBack(): void {
	this.location.back();
  }
}
