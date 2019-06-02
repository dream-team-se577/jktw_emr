import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StaffService } from '../../service/staff.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  public staff;

  constructor(private route: ActivatedRoute, private staffService: StaffService, private location: Location) { }

  ngOnInit() {
    this.getStaff();
  }

  getStaff(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.staffService.getStaff(id)
  .subscribe(staff => this.staff = staff);
  }

  goBack(): void {
    this.location.back();
  }

}
