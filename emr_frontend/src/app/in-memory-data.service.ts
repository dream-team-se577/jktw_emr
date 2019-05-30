import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Staff } from './staff';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const staffs = [
			{ uuid: 11, name: 'Mr. Nice', contact: 'contact 1', role: 1},
			{ uuid: 12, name: 'Narco', contact: 'contact 2', role: 2 },
			{ uuid: 13, name: 'Bombasto', contact: 'contact 3', role: 3 },
			{ uuid: 14, name: 'Celeritas', contact: 'contact 4', role: 4 },
			{ uuid: 15, name: 'Magneta', contact: 'contact 5', role: 5 },
			{ uuid: 16, name: 'RubberMan', contact: 'contact 6', role: 6 },
			{ uuid: 17, name: 'Dynama', contact: 'contact 7', role: 7 },
			{ uuid: 18, name: 'Dr IQ', contact: 'contact 8', role: 8 },
			{ uuid: 19, name: 'Magma', contact: 'contact 9', role: 9 },
			{ uuid: 22, name: 'Tornado', contact: 'contact 10', role: 10 }
		];
		return {staffs};
	}

	// Overrides the genId method to ensure that a staff always has an id.
	// If the staffs array is empty,
	// the method below returns the initial number (11).
	// if the staffs array is not empty, the method below returns the highest
	// staff id + 1.
	genId(staffs: Staff[]): number {
		return staffs.length > 0 ? Math.max(...staffs.map(staff => staff.uuid)) + 1 : 11;
	}
}