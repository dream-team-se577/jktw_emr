import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StaffComponent } from './component/staff/staff.component';
import { StaffFormComponent } from './component/staff-form/staff-form.component';
import { StaffCreateComponent } from './component/staff-create/staff-create.component';
import { PatientComponent } from './component/patient/patient.component';
import { PatientFormComponent } from './component/patient-form/patient-form.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { AppointmentFormComponent } from './component/appointment-form/appointment-form.component';
import { LabComponent } from './component/lab/lab.component';
import { LabFormComponent } from './component/lab-form/lab-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'staffDetail/:id', component: StaffFormComponent },
  { path: 'staffCreate', component: StaffCreateComponent },
	{ path: 'staffs', component: StaffComponent },
  { path: 'patientDetail/:id', component: PatientFormComponent },
	{ path: 'patients', component: PatientComponent },
  { path: 'appointmentDetail/:id', component: AppointmentFormComponent },
	{ path: 'appointments', component: AppointmentComponent },
  { path: 'labDetail/:id', component: LabFormComponent },
  { path: 'labs', component: LabComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
