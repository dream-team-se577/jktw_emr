export class Lab {
	id: number;
	date: string;
	results: string;
	patient: number;
	type: string;
	staff: number[];

	public static Types : string[] = [
	    'Blood',
	    'Urine',
	    'MRI',
	    'CT-Scan',
	  ];

	fromJson(lab: any): void
  {
    this.id = lab['id'];
    this.patient = lab['patient'];
    this.date = lab['date'];
    this.results = lab['results'];
    this.type = lab['type'];
    this.staff = lab['staff'] ? lab['staff'] : [];
  }
}
