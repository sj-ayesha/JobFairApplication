import { Venue } from './venue';
import { Job } from './job';

export class VenueJob{
    venueJobId: number;
    venue: Venue;
    job: Job;
    // message: string;
    venueJobDate: Date;
}
