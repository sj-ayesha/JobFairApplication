import { Venue } from './venue';
import { Job } from './job';

export class VenueJob {
    venueJobId: number;
    venue: Venue;
    job: Job;
}
export class VenueJobResponseList {
    venueJobDtoList: VenueJob[];
    totalElements: number;
    totalPages: number;
}
