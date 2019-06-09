# JKTW Electronic Medical Record System
Software Project for SE577:  Software Architecture

## About this Repository

This repository is for the final project for SE577:  Software Architecture at Drexel University.  It puts to use many different design patterns to implement a Electronic Medical Record (EMR) system.

For instructions on how to build/run the server, see emr_server/README.md.

For instructions on how to build/run the UI, see emr-ui/README.md.

For more information on the architecture, see READEME.pdf.

## Mission

Our mission is to provide better technological solutions for the people working in healthcare by allowing for simpler data retrieval.

## Problem

JKTW Medical Center is having trouble storing and retrieving their medical records for patients and their appointments.  Patient records are not properly secured in the current Electronic Medical Record system (EMR/EMS).  Due to the loose restrictions on patient record entry, the hospital staff consistently has to correct record errors associated with manual client data entry.  Furthermore, records are stored in unparsable scanned PDF’s organized in directories on a central server.  Because of this, searching for records based off patient information requires an unreasonable amount of searching through the scanned PDF files. Simple tasks such as finding the phone number of a patient who needs a follow-up consultation can take sometimes hours and the scheduling is similarly hectic as the schedule is maintained by an employee who updates an Excel spreadsheet weekly.  There’s also an issue where reporting and auditing takes whole weeks to find the correct scanned forms for certain patients.

## Users

The users for this system are the Staff Members at JKTW Medical Center.  This includes the doctors, nurses, clerical staff and hospital administrators.  These employees require interacting with patient records including their appointments with doctors and nurses.  Note that the patient is presumed to not have access to this system.

## Features

| User  | Feature Name | Description |
| ------------- | ------------- | ------------- |
| Staff Member  | Dashboard  | As a staff member, I would like to navigate the dashboard Register patient, retrieve patient  create appointments and schedule follow-up|
| Staff Member  | Retrieve Staff Information  | As a hospital administrator, I would like to  delete accounts for doctors, nurses and clerical staff. |
| Staff Member  | Update Staff Information  | As a staff member, I would like to update staff information in case contact information needs updated or the staff member switches roles. |
| Staff Member  | Register Patient  | As a staff member, I would like to register a patient into the system when they visit for the first time including their name, social security number, medical history and contact information. |
| Staff Member  | Medical Record Retrieval  | As a staff member, I would like to use a patient’s social security number or name to retrieve their information such as lab/diagnostic records, appointment history, and contact information. |
| Staff Member  | Update Contact Information  | As a staff member, I would like the ability to update existing contact information on a patient. |
| Staff Member  | Update Medical Information  | As a staff member, I would like to update the medical information of a patient including their appointments and lab tests. |
| Staff Member  | Search Appointments and Lab Records  | As a staff member, I would like to search for medical records of patients including a date range of appointments and lab records. |

 
These features will remedy the problems plaguing the current system(s) utilized by JKTW staff.  Record retrieval can be achieved based off a number of fields such as name and SSN.  They can also schedule appointments and lab visits easier by using queries to search within a date range.  The search functions will allow for easy recall on patients who have visited previously so that medical staff can view health and contact information.

For more information on design decisions and use cases, read attached README.pdf.

## The Team

- Joseph Durko (jsd94@Drexel.edu) 			-  Engineer
- Kaushik Mukherjee (km3762@Drexel.edu)		-  Architect
- Taiwo Oyesanmi (ot22@Drexel.edu) 		-  Engineer
- Wendy Prayer (wp86@Drexel.edu)			-  Architect
