import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { Staff } from "../../model/staff";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public staffs;
  staffDetail : boolean;
  staffId: number;
  staff : Staff;

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.getStaffs();
  }

  registerStaff() {
    this.staffDetail = true;
    this.staff = null;
  }

  getStaff(id: number) {
    this.staffDetail = true;
    this.staffService.getStaff(id).subscribe(
      data => this.staff = <Staff> data,
      err => console.error(err),
      () => console.log('staff loaded')
    );
  }

  getStaffs(): void {
    this.staffService.getStaffs().subscribe(
      data => {this.staffs = data},
      err => console.error(err),
      () => console.log('staffs loaded')
    );
  }

}
