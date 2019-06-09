import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mode = "";

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onStaffPicked(staff: any[]): void {
    this.router.navigate(["../staffDetail/" + staff['id']], { relativeTo: this.route });
  }

  onAppointmentPicked(appointment: any[]): void {
    this.router.navigate(["../appointmentDetail/" + appointment['id']], { relativeTo: this.route });
  }

  onPatientPicked(patient: any[]): void {
    this.router.navigate(["../patientDetail/" + patient['id']], { relativeTo: this.route });
  }

  onLabRecordPicked(lab: any[]): void {
    this.router.navigate(["../labDetail/" + lab['id']], { relativeTo: this.route });
  }
}
