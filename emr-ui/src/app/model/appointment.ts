export class Appointment {
	id: number;
	date: string;
	description: string;
	patient: number;
	type: string;
	staff: number[];

	public static Types : string[] = [
    'Check-up',
    'Follow-up',
    'Treatment',
  ];

	fromJson(appointment: any): void
  {
    this.id = appointment['id'];
    this.patient = appointment['patient'];
    this.date = appointment['date'];
    this.description = appointment['description'];
    this.type = appointment['type'];
    this.staff = appointment['staff'] ? appointment['staff'] : [];
  }
}
