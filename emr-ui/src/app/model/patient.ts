import { Address } from './address';
import { Phone } from './phone';
import { Email } from './email';

export class Patient {
	id: number;
	ssn: string;
	firstName: string;
	middleName: string;
	lastName: string;
	appointments: number[];
	labRecords: number[];
	addresses: Address[];
	phoneNumbers: Phone[];
	emailAddresses: Email[];

  fromJson(patient: any): void
  {
    this.id = patient['id'];
    this.ssn = patient['ssn'];
    this.firstName = patient['firstName'];
    this.middleName = patient['middleName'];
    this.lastName = patient['lastName'];
		this.addresses = [];
		if (patient['addresses'])
		{
			patient['addresses'].forEach(item =>
			{
				let addr = new Address();
				addr.fromJson(item);
				this.addresses.push(addr);
			});
		}

		this.phoneNumbers = [];
		if (patient['phoneNumbers'])
		{
			patient['phoneNumbers'].forEach(item =>
			{
				let p = new Phone();
				p.fromJson(item);
				this.phoneNumbers.push(p);
			});
		}

		this.emailAddresses = [];
		if (patient['emailAddresses'])
		{
			patient['emailAddresses'].forEach(item =>
			{
				let e = new Email();
				e.fromJson(item);
				this.emailAddresses.push(e);
			});
		}
    this.appointments = patient['appointments'] ? patient['appointments'] : [];
    this.labRecords = patient['labRecords'] ? patient['labRecords'] : [];
  }
}
