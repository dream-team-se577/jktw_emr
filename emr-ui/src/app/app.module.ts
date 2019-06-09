import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { StaffCreateComponent } from './component/staff-create/staff-create.component';
import { PatientCreateComponent } from './component/patient-create/patient-create.component';
import { LabCreateComponent } from './component/lab-create/lab-create.component';
import { AppointmentCreateComponent } from './component/appointment-create/appointment-create.component';
import { AddressFormSubComponent } from './component/address/address.subcomponent';
import { EmailFormSubComponent } from './component/email/email.subcomponent';
import { PhoneFormSubComponent } from './component/phone/phone.subcomponent';
import { PatientFormComponent } from './component/patient-form/patient-form.component';
import { StaffFormComponent } from './component/staff-form/staff-form.component';
import { PatientSearchComponent } from './component/patient-search/patient-search.component';
import { LabSearchComponent } from './component/lab-search/lab-search.component';
import { StaffSearchComponent } from './component/staff-search/staff-search.component';
import { AppointmentSearchComponent } from './component/appointment-search/appointment-search.component';
import { LabFormComponent } from './component/lab-form/lab-form.component';
import { AppointmentFormComponent } from './component/appointment-form/appointment-form.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';
import { LabListComponent } from './component/lab-list/lab-list.component';
import { PatientListComponent } from './component/patient-list/patient-list.component';
import { StaffListComponent } from './component/staff-list/staff-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    PatientComponent,
    LabComponent,
    AppointmentComponent,
    DashboardComponent,
    StaffCreateComponent,
    PatientCreateComponent,
    LabCreateComponent,
    AppointmentCreateComponent,
    AddressFormSubComponent,
    EmailFormSubComponent,
    PhoneFormSubComponent,
    PatientFormComponent,
    StaffFormComponent,
    PatientSearchComponent,
    LabSearchComponent,
    StaffSearchComponent,
    AppointmentSearchComponent,
    LabFormComponent,
    AppointmentFormComponent,
    AppointmentListComponent,
    LabListComponent,
    PatientListComponent,
    StaffListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AppointmentService,LabService,PatientService,StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
