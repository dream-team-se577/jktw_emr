import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StaffComponent } from './component/staff/staff.component';
import { StaffDetailComponent } from './component/staff-detail/staff-detail.component';
import { StaffByIdComponent } from './component/staff-by-id/staff-by-id.component';
import { PatientComponent } from './component/patient/patient.component';
import { PatientDetailComponent } from './component/patient-detail/patient-detail.component';
import { PatientByIdComponent } from './component/patient-by-id/patient-by-id.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { AppointmentDetailComponent } from './component/appointment-detail/appointment-detail.component';
import { AppointmentByIdComponent } from './component/appointment-by-id/appointment-by-id.component';
import { LabComponent } from './component/lab/lab.component';
import { LabDetailComponent } from './component/lab-detail/lab-detail.component';
import { LabByIdComponent } from './component/lab-by-id/lab-by-id.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'staffDetail/:id', component: StaffDetailComponent },
  { path: 'staffsById/:id', component: StaffByIdComponent },
	{ path: 'staffs', component: StaffComponent },
  { path: 'patientDetail/:id', component: PatientDetailComponent },
  { path: 'patientsById/:id', component: PatientByIdComponent },
	{ path: 'patients', component: PatientComponent },
  { path: 'appointmentDetail/:id', component: AppointmentDetailComponent },
  { path: 'appointmentsById/:id', component: AppointmentByIdComponent },
	{ path: 'appointments', component: AppointmentComponent },
  { path: 'labDetail/:id', component: LabDetailComponent },
  { path: 'labsById/:id', component: LabByIdComponent },
  { path: 'labs', component: LabComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
