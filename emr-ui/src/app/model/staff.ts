import { Address } from './address';
import { Phone } from './phone';
import { Email } from './email';

export class Staff {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	addresses: Address[];
	phoneNumbers: Phone[];
	emailAddresses: Email[];
	role: string;

	fromJson(staff: any): void
  {
    this.id = staff['id'];
    this.role = staff['role'];
    this.firstName = staff['firstName'];
    this.middleName = staff['middleName'];
    this.lastName = staff['lastName'];
		this.addresses = [];
		if (staff['addresses'])
		{
			staff['addresses'].forEach(item =>
			{
				let addr = new Address();
				addr.fromJson(item);
				this.addresses.push(addr);
			});
		}

		this.phoneNumbers = [];
		if (staff['phoneNumbers'])
		{
			staff['phoneNumbers'].forEach(item =>
			{
				let p = new Phone();
				p.fromJson(item);
				this.phoneNumbers.push(p);
			});
		}

		this.emailAddresses = [];
		if (staff['emailAddresses'])
		{
			staff['emailAddresses'].forEach(item =>
			{
				let e = new Email();
				e.fromJson(item);
				this.emailAddresses.push(e);
			});
		}
  }
}
