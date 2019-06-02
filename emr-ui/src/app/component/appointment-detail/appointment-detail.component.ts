import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppointmentService } from '../../service/appointment.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  public appointment;

  constructor(private route: ActivatedRoute, private appointmentService: AppointmentService, private location: Location) { }

  ngOnInit() {
    this.getAppointment();
  }

  getAppointment(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.appointmentService.getAppointment(id)
  .subscribe(appointment => this.appointment = appointment);
  }

  goBack(): void {
    this.location.back();
  }

}
