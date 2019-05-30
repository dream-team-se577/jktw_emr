import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { Patient } from '../patient';
import { Staff } from '../staff';
import { AppointmentService } from '../appointment.service';
import { PatientService } from '../patient.service';
import { StaffService } from '../staff.service';
 
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
	staffs: Staff[] = [];
 
	constructor(private staffService: StaffService) { }
 
	ngOnInit() {
		this.getStaffs();
	}
 
	getStaffs(): void {
		this.staffService.getStaffs()
      .subscribe(staffs => this.staffs = staffs.slice(1, 5));
	}
}
