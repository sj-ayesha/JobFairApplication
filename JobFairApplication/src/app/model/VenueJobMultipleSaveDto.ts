import { Venue } from './venue'
import { Job } from './job';

export class VenueJobMultipleSaveDto {
    venue: Venue;
    job: Job[];
    venueJobDate: Date;
}