import { Component, Input,  Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Staff } from "../../model/staff";
import { StaffService } from '../../service/staff.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, OnChanges {
  staffList: Staff[] = [];
  @Input() removable: boolean = false;
  @Input() staff: number[] = [];
  @Output() onStaffRemoved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    if (!this.staff)
    {
      return;
    }

    this.staffList = [];
    this.staff.forEach(s => {
      this.staffService.getStaff(s).subscribe(
        data => {
          let newStaff = new Staff();
          newStaff.fromJson(data);

          if (this.staffList.some(s => s.id === newStaff.id))
          {
            return true;
          }

          this.staffList.push(newStaff);
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  remove(staff: Staff): void {
    const index = this.staffList.indexOf(staff, 0);
    if (index > -1) {
       this.staffList.splice(index, 1);
    }

    this.onStaffRemoved.emit(staff);
  }
}
