export class Appointment {
    _id: string;
    shortId: string;
    contact: string;
    endDate: Date;
    startDate: Date;
    description: string;
    status: number;
    approved: boolean;
    subsidiary: any;
}