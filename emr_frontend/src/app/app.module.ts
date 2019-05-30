import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';  /* Comment out later */
import { InMemoryDataService }  from './in-memory-data.service'; /* Comment out later */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { LabsComponent } from './labs/labs.component';
import { DocumentsComponent } from './documents/documents.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddressesComponent } from './addresses/addresses.component';
import { NamesComponent } from './names/names.component';
import { StaffsComponent } from './staffs/staffs.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { NameDetailComponent } from './name-detail/name-detail.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { LabDetailComponent } from './lab-detail/lab-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffSearchComponent } from './staff-search/staff-search.component';

@NgModule({
	declarations: [
		AppComponent,
		PatientsComponent,
		LabsComponent,
		DocumentsComponent,
		AppointmentsComponent,
		ContactsComponent,
		AddressesComponent,
		NamesComponent,
		StaffsComponent,
		StaffDetailComponent,
		NameDetailComponent,
		AddressDetailComponent,
		ContactDetailComponent,
		AppointmentDetailComponent,
		DocumentDetailComponent,
		PatientDetailComponent,
		LabDetailComponent,
		MessagesComponent,
		DashboardComponent,
		StaffSearchComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		HttpClientModule,
		// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
		// and returns simulated server responses.
		// Remove it when a real server is ready to receive requests.
		HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }) /* Comment out later */
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }
