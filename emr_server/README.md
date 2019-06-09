# EMR Server
Software Project for SE577:  Software Architecture

## How to build/run this server

1. You will first need to start a mySQL database with name emr_server, username "root" and password "se577sql".  For more details, see the "Starting the database" section of this README
2. Use the Maven wrapper in this repo to build with Maven.  See the "To Build and Run Without IntelliJ" sectio below.

## How it's made

This code was built in the following steps:
1. Using the Spring Boot Initializer (https://start.spring.io/), using the following dependencies:  Web, JPA, mySQL.
    - Also manually add the jaxb-api maven library
2. The database was created by installing MySQL's community server (https://dev.mysql.com/downloads/windows/installer/8.0.html)
    - For more information see "Starting the database", below
3. The rest of the code was created using IntelliJ to build (https://www.jetbrains.com/idea/download/#section=windows)
4. For testing without the client, Postman (https://www.getpostman.com/) to perform actions against the REST API

For more information on how to create projects with these, see the HELP.md in this same directory.

## Starting the database:

Download MySQL Community Server:  https://dev.mysql.com/downloads/mysql/
- For windows, I suggest using the MSI installer
- Install with the default settings (no need to hook up to InnerDB)
- Set credentials to:  username = "root", password = "se577sql"

Once installed, make sure the MySQL 8.0 server is running
- In Windows, you can use services.msc (or use the task manager) to turn on the MYSQL 8.0 service

Next, use a command prompt to open mysql.exe
- Your prompt should now have "mysql>" at the start (if not, navigate to your "Program Files" directory where it should be in MySQL\MySQL Server 8.0\bin)
- Type ```CREATE DATABASE emr_server```

And now it's ready to be used by the emr_server code.  If you want to see the database at anytime, go back into mysql and type "USE emr_server" to view the database.

If any any point you need to reset the database, use the following script:

```
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS appointment;
DROP TABLE IF EXISTS appointment_staff;
DROP TABLE IF EXISTS contact;
DROP TABLE IF EXISTS contact_addresses;
DROP TABLE IF EXISTS contact_email_addresses;
DROP TABLE IF EXISTS contact_phone_numbers;
DROP TABLE IF EXISTS hibernate_sequence;
DROP TABLE IF EXISTS lab_record;
DROP TABLE IF EXISTS patient;
DROP TABLE IF EXISTS patient_appointments;
DROP TABLE IF EXISTS patient_lab_records;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS staff_appointments;
DROP TABLE IF EXISTS person_phone_numbers;
DROP TABLE IF EXISTS person_email_addresses;
DROP TABLE IF EXISTS person_addresses;
SET FOREIGN_KEY_CHECKS = 1;
```  

## To Build and Run Without IntelliJ

If you do not have an IDE to build this (or if you don't care about debugging), follow these steps [on UNIX systems, replaced "mvnw.cmd" with "mvnw"]:
1. Navigate to the emr_server/ directory (the directory this README is in)
2. Run:  `mvnw.cmd clean`
3. Run:  `mvnw.cmd validate`
4. Run:  `mvnw.cmd compile`
5. Run:  `mvnw.cmd package`
6. This should build the project into the `target` directory, navigate to there
7. Run the .jar file using `java -jar emr_server-0.0.1-SNAPSHOT.jar`
8. From here, you can run the emr_ui or use Postman (https://www.getpostman.com/) to test

## Example Usage

### Making a patient

POST http://localhost:8080/patients with body (MIME type application/json):  
  
```
{
	"ssn": "123456789",
	"firstName":"Doe",
	"lastName": "Jurko",
	"addresses" : [],
	"emailAddresses" : [],
	"phoneNumbers" : [],
	"appointments" : [],
	"labRecords" : []
}
```

Should recieve back:

```
{
    "id": 1,
    "firstName": "Doe",
    "middleName": null,
    "lastName": "Jurko",
    "addresses": [],
    "phoneNumbers": [],
    "emailAddresses": [],
    "ssn": "123456789",
    "labRecords": [],
    "appointments": []
}
```

### Editting a patient to add an address

PUT http://localhost:8080/patients with body (MIME type application/json):

```
{
	"id" : 1,
	"ssn": "123456789",
	"firstName":"Doe",
	"lastName": "Jurko",
	"addresses" : [
        {
            "streetNumber": "8",
            "addressLine2": "",
            "streetName": "Madison Steet",
            "cityName": "Cokeburg",
            "stateName": "PA",
            "zipCode": "15324",
            "countryName": "United States of America"
        }
    ],
	"emailAddresses" : [
        {
            "domain": "drexel.edu",
            "localPart": "jsd94"
        }
    ],
	"phoneNumbers" : [
        {
            "prefix": "555",
            "areaCode": "555",
            "lineNumber": "5555"
        }
    ],
	"appointments" : [],
	"labRecords" : []
}
```


Should receieve back:

```
{
    "id": 1,
    "firstName": "Doe",
    "middleName": null,
    "lastName": "Jurko",
    "addresses": [
        {
            "streetNumber": "8",
            "addressLine2": "",
            "streetName": "Madison Steet",
            "cityName": "Cokeburg",
            "stateName": "PA",
            "zipCode": "15324",
            "countryName": "United States of America"
        }
    ],
    "phoneNumbers": [
        {
            "areaCode": "555",
            "prefix": "555",
            "lineNumber": "5555"
        }
    ],
    "emailAddresses": [
        {
            "localPart": "jsd94",
            "domain": "drexel.edu"
        }
    ],
    "ssn": "123456789",
    "labRecords": [],
    "appointments": []
}
```

### Creating a staff member

POST http://localhost:8080/staffMembers with body (MIME type application/json):

```
{  
	"firstName": "Michael",
	"lastName" : "Johnson",
	"addresses": [],
	"emailAddresses" : [],
	"phoneNumbers" : [],
	"role" : "Doctor"
}
```
  
Should receive back:

```
{
    "id": 2,
    "firstName": "Michael",
    "middleName": null,
    "lastName": "Johnson",
    "addresses": [],
    "phoneNumbers": [],
    "emailAddresses": [],
    "role": "Doctor"
}
```

### Creating an appointment

POST http://localhost:8080/appointments with body (MIME type application/json):

```
{
	"date" : "2018-9-12 12:00",
	"description" : "Regular check-up",
	"type" : "Check up",
	"staff" : [
		2
	],
	"patient" : 1
}
```
  
Should return (patient 1 should have its "appointments" updated):
```
{
    "id": 1,
    "date": "2018-09-12 12:00",
    "description": "Regular check-up",
    "patient": 1,
    "type": "Check up",
    "staff": [
        2
    ]
}
```

### Changing the date of an appointment

PUT http://localhost:8080/appointments with body (MIME type application/json):
```
{
    "id": 1,
    "date": "2019-09-12 12:00",
    "description": "Regular check-up",
    "patient": 1,
    "type": "Check up",
    "staff": [
        2
    ]
}
```
  
Should receive back:
```
{
    "id": 1,
    "date": "2019-09-12 12:00",
    "description": "Regular check-up",
    "patient": 1,
    "type": "Check up",
    "staff": [
        2
    ]
}
```

### Adding a second staff member to the appointment

#### First, add a second staff member to the model

POST http://localhost:8080/staffMembers with body (MIME type application/json):

```
{
	"firstName": "Mehmet",
	"lastName" : "Oz",
	"addresses": [],
	"emailAddresses" : [],
	"phoneNumbers" : [],
	"role" : "Doctor"
}
```

Should receive back:

```
{
    "id": 3,
    "firstName": "Mehmet",
    "middleName": null,
    "lastName": "Oz",
    "addresses": [],
    "phoneNumbers": [],
    "emailAddresses": [],
    "role": "Doctor"
}
```


#### Next, edit the appointment

PUT http://localhost:8080/appointments with body (MIME type application/json):  
```
{
    "id": 1,
    "date": "2019-09-12 12:00",
    "description": "Regular check-up",
    "patient": 1,
    "type": "Check up",
    "staff": [
        2,
        3
    ]
}
```  

Should recieve back (patient perserved its "appoointments" property):  
```
{
    "id": 1,
    "date": "2019-09-12 12:00",
    "description": "Regular check-up",
    "patient": 1,
    "type": "Check up",
    "staff": [
        2,
        3
    ]
}
```

### To cancel an appointment

DELETE http://localhost:8080/appointments/1  

Should return nothing.

Staff members are not deleted; patients is not deleted (but patient's "appointments" is updated)

### To create a lab record of an existing patient

POST http://localhost:8080/labRecords with body (MIME type application/json):
```
{
	"date" : "2017-12-31 12:00",
	"results" : "Was fine...",
	"type" : "MRI",
	"patient" : 1
}
```

Should recieve back (patient's "labRecords" updated):
```
{
    "id": 1,
    "date": "2017-12-31 12:00",
    "results": "Was fine...",
    "patient": 1,
    "type": "MRI"
}
```

## Search Functionality

There are a few different search endpoints that can be used in each of the services.  These can be accessed by adding "/search/\<queryName>?\<param>=\<value>&..." to the end of the address.
	Objects can be specified using their id's

### Patient

findBySsn(ssn);  
findByFirstName(firstName);  
findByLastName(lastName);  
findByFirstNameAndLastName(firstName, lastName);  
findByFirstNameAndMiddleNameAndLastName(firstName, middleName, lastName);  

### Staff Members

findByRole(role);  
findByFirstName(firstName);  
findByLastName(lastName);  
findByFirstNameAndLastName(firstName, lastName);  
findByFirstNameAndMiddleNameAndLastName(firstName, middleName, lastName);  

### Lab Records

findByDateBetween(  
&nbsp;&nbsp;&nbsp;&nbsp;@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") startDate,  
&nbsp;&nbsp;&nbsp;&nbsp;@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") endDate);  
  
findByPatient(patient);  
  
### Appointments

findByDateBetween(  
&nbsp;&nbsp;&nbsp;&nbsp;@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") startDate,  
&nbsp;&nbsp;&nbsp;&nbsp;@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") endDate);  
  
findByPatient(patient);  