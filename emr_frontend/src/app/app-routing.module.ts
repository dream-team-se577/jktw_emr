import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { StaffsComponent }      from './staffs/staffs.component';
import { StaffDetailComponent }      from './staff-detail/staff-detail.component';
import { PatientsComponent }      from './patients/patients.component';
import { PatientDetailComponent }      from './patient-detail/patient-detail.component';
import { AddressesComponent }      from './addresses/addresses.component';
import { AddressDetailComponent }      from './address-detail/address-detail.component';
import { AppointmentsComponent }      from './appointments/appointments.component';
import { AppointmentDetailComponent }      from './appointment-detail/appointment-detail.component';
import { ContactsComponent }      from './contacts/contacts.component';
import { ContactDetailComponent }      from './contact-detail/contact-detail.component';
import { DocumentsComponent }      from './documents/documents.component';
import { DocumentDetailComponent }      from './document-detail/document-detail.component';
import { LabsComponent }      from './labs/labs.component';
import { LabDetailComponent }      from './lab-detail/lab-detail.component';
import { NamesComponent }      from './names/names.component';
import { NameDetailComponent }      from './name-detail/name-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'staffDetail/:uuid', component: StaffDetailComponent },
	{ path: 'staffs', component: StaffsComponent },
	{ path: 'patientDetail/:uuid', component: PatientDetailComponent },
	{ path: 'patients', component: PatientsComponent },
	{ path: 'addressDetail/:uuid', component: AddressDetailComponent },
	{ path: 'addresses', component: AddressesComponent },
	{ path: 'appointmentDetail/:uuid', component: AppointmentDetailComponent },
	{ path: 'appointments', component: AppointmentsComponent },
	{ path: 'contactDetail/:uuid', component: ContactDetailComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'documentDetail/:uuid', component: DocumentDetailComponent },
	{ path: 'documents', component: DocumentsComponent },
	{ path: 'labDetail/:uuid', component: LabDetailComponent },
	{ path: 'labs', component: LabsComponent }, 
	{ path: 'nameDetail/:uuid', component: NameDetailComponent },
	{ path: 'names', component: NamesComponent },   
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
