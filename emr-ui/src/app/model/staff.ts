import { Address } from './address';
import { Phone } from './phone';
import { Email } from './email';

export class Staff {
	id: number;
	name: string;
	addresses: Address[];
	phoneNumbers: Phone[];
	emailAddresses: Email[];
	role: number;
}
