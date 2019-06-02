import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LabService } from '../../service/lab.service';

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {
  public lab;

  constructor(private route: ActivatedRoute, private labService: LabService, private location: Location) { }

  ngOnInit() {
    //this.getLab(this.route.snapshot.paramMap.get.id);
    this.getLab();
  }

  getLab(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.labService.getLab(id)
  .subscribe(lab => this.lab = lab);
  }

  goBack(): void {
    this.location.back();
  }

}
