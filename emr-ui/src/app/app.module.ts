import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentService } from './service/appointment.service';
import { LabService } from './service/lab.service';
import { PatientService } from './service/patient.service';
import { StaffService } from './service/staff.service';
import { StaffComponent } from './component/staff/staff.component';
import { PatientComponent } from './component/patient/patient.component';
import { LabComponent } from './component/lab/lab.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { PatientDetailComponent } from './component/patient-detail/patient-detail.component';
import { StaffDetailComponent } from './component/staff-detail/staff-detail.component';
import { LabDetailComponent } from './component/lab-detail/lab-detail.component';
import { AppointmentDetailComponent } from './component/appointment-detail/appointment-detail.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppointmentByIdComponent } from './component/appointment-by-id/appointment-by-id.component';
import { StaffByIdComponent } from './component/staff-by-id/staff-by-id.component';
import { PatientByIdComponent } from './component/patient-by-id/patient-by-id.component';
import { LabByIdComponent } from './component/lab-by-id/lab-by-id.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    PatientComponent,
    LabComponent,
    AppointmentComponent,
    PatientDetailComponent,
    StaffDetailComponent,
    LabDetailComponent,
    AppointmentDetailComponent,
    DashboardComponent,
    AppointmentByIdComponent,
    StaffByIdComponent,
    PatientByIdComponent,
    LabByIdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AppointmentService,LabService,PatientService,StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
