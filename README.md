# JKTW Electronic Medical Record System
Software Project for SE577:  Software Architecture

## About this Repository

Our society is becoming more and more health conscious, people are living longer - often past their 70’s.  Science can do amazing things to preserve and extend life through new cures to previously untreatable ailments and diseases. Therefore, the health industry is a huge and growing market with hospitals and health centers being built frequently to meet the needs of an ever-growing market.  Our customer, JKTW Health Center, is one of these establishments.  Due to ever-increasing demands, they have exceeded the capability to efficiently run their establishment.  Records are poorly secured, processes are typically manual, and their Electronic Medical Record (EMR) system is based on several fragmented systems.

We aim to improve the way staff at JKTW Health Center handle and view their customers’ records through a comprehensive and expandable software system.  In this way, we hope to lower clerical errors and bolster the customer experience when choosing their health provider.

This repository is for a system that will accept logins from hospital staff and allow them to edit and view patient records.

## Mission

Develop a comprehensive secure electronic medical record system with a user-friendly interface for doctors, nurses and clerical staff at JKTW medical center.

## Problem

Patient records are not properly secured in the current Electronic Medical Record (EMR) system - every member of staff in the existing system has access to the same patient information and can edit them willingly.  Due to the loose restrictions on patient record entry, the hospital staff consistently has to correct record errors associated with manual client data entry.  Furthermore, searching for records based off patient information requires an unreasonable amount of searching through scanned PDF files. Simple tasks such as finding the phone number of a patient who needs a follow-up consultation can take sometimes hours.  There’s also an issue where reporting and auditing takes whole weeks to find the correct scanned forms for certain patients.

## Users

The users of this system are broken down into two groups:
Hospital Administrator - The person who manages the EMS system including user logins and permissions.
Medical Staff - JKTW employees who interact with patient records (also referred to as “hospital employees”)

The medical staff can be broken down further into:
Doctors
Nurses
Clerical Staff

## Features

| User  | Feature Name | Description |
| ------------- | ------------- | ------------- |
| Hospital Admin  | Create Account(s)  | As a hospital administrator, I would like to create accounts for doctors, nurses and clerical staff. |
| Hospital Admin  | Delete Account(s)  | As a hospital administrator, I would like to  delete accounts for doctors, nurses and clerical staff. |
| Hospital Admin  | Edit Account(s)  | As a hospital administrator, I would like to edit account information for doctors, nurses and clerical staff  such as name, contact information, role, permissions, password resets |
| Hospital Admin  | Retrieve Account(s)  | As a hospital administrator, i would like to retrieve accounts for doctors, nurses and clerical staff currently in the system |
| Medical Staff  | Login Portal  | As a hospital employee, I would like to be able to log into the EMS Dashboard |
| Medical Staff  | Dashboard  | As a member of the medical staff, I would like to navigate the dashboard and search for patient(s) |
| Clerical Staff  | Dashboard  | As a member of clerical staff, I would like to navigate the dashboard Register patient, retrieve patient  create appointments and schedule follow-up |
| Clerical Staff  | Register Patient  | As a member of clerical staff, I would like to register a patient into the system when they visit for the first time including their demographic, medical history and contact information. |
| Medical Staff  | Medical Record Retrieval  | As a hospital employee, I would like to use a patient’s social security number to retrieve their information such as lab/diagnostic records, referrals, personal health record, and visit summary. |
| Clerical Staff  | Update Contact Information  | As a member of clerical staff, I would like the ability to update existing contact information and demographic information on a patient. |
| Doctors/Nurses  | Update Medical Information   | As a doctor/nurse, I would like to update the medical information of a patient including their prescriptions, diagnoses, and recommendation for lab tests. |
| Clerical Staff  | Attach Document Feature  | As a member of clerical staff, I would like to attach scanned paper-based documents to a patient’s file. |
| Medical Staff  | Search Medical Record  | As a hospital employee, I would like to search for medical records of employees based off contact information and previous visits. |

 
These features will remedy the problems plaguing the current system(s) utilized by JKTW staff.  In addition, being able to create accounts via a hospital administrator will assure that only the employees of JKTW have encrypted logins that facilitate viewing and updating patient records.  Furthermore, the system supports roles and permissions, with roles such as “doctor”, “nurse” and “clerical staff” so that only specific roles have permissions to edit,  read and access certain patient information.  The search functions will allow for easy recall on patients who have visited previously so that medical staff can view health and contact information.  Finally, allowing scanned documents to appear on patient records will also provide a paper trail for auditing and quality control.

For more information on design decisions and use cases, read attached README.pdf.

## The Team

- Joseph Durko (jsd94@Drexel.edu) 			-  Engineer
- Kaushik Mukherjee (km3762@Drexel.edu)		-  Architect
- Taiwo Oyesanmi (ot22@Drexel.edu) 		-  Engineer
- Wendy Prayer (wp86@Drexel.edu)			-  Architect
