import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StaffComponent } from './component/staff/staff.component';
import { StaffDetailComponent } from './component/staff-detail/staff-detail.component';
import { StaffCreateComponent } from './component/staff-create/staff-create.component';
import { PatientComponent } from './component/patient/patient.component';
import { PatientDetailComponent } from './component/patient-detail/patient-detail.component';
import { PatientCreateComponent } from './component/patient-create/patient-create.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { AppointmentDetailComponent } from './component/appointment-detail/appointment-detail.component';
import { AppointmentCreateComponent } from './component/appointment-create/appointment-create.component';
import { LabComponent } from './component/lab/lab.component';
import { LabDetailComponent } from './component/lab-detail/lab-detail.component';
import { LabCreateComponent } from './component/lab-create/lab-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'staffDetail/:id', component: StaffDetailComponent },
  { path: 'staffCreate', component: StaffCreateComponent },
	{ path: 'staffs', component: StaffComponent },
  { path: 'patientDetail/:id', component: PatientDetailComponent },
  { path: 'patientCreate', component: PatientCreateComponent },
	{ path: 'patients', component: PatientComponent },
  { path: 'appointmentDetail/:id', component: AppointmentDetailComponent },
  { path: 'appointmentCreate', component: AppointmentCreateComponent },
	{ path: 'appointments', component: AppointmentComponent },
  { path: 'labDetail/:id', component: LabDetailComponent },
  { path: 'labCreate', component: LabCreateComponent },
  { path: 'labs', component: LabComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
