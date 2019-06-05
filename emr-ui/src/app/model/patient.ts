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
}
