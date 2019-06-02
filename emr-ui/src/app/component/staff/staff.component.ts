import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public staffs;

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.getStaffs();
  }

  getStaffs(): void {
    this.staffService.getStaffs().subscribe(
      data => {this.staffs = data},
      err => console.error(err),
      () => console.log('staffs loaded')
    );
  }

}
