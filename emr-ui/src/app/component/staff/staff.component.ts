import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { StaffFormComponent } from "../staff-form/staff-form.component";
import { Staff } from "../../model/staff";
import { Location } from '@angular/common';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staff: number[];
  staffCreate : boolean;

  constructor(private staffService: StaffService,
              private location: Location) { }

  ngOnInit() {
    this.getStaffs();
  }

  staffCreated(message: string): void {
    location.reload();
  }

  getStaffs(): void {
    this.staffService.getStaffs().subscribe(
      (data : any[]) =>{this.staff = data.map(x => x.id)},
      err => console.error(err),
      () => console.log('staffs loaded')
    );
  }
}
