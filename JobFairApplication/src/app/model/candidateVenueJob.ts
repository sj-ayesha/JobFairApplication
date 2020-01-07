import { VenueJob } from './venueJob';
import { Candidate } from './candidate';
import { Job } from './job';

export class CandidateVenueJob {

    candidateVenueJob: number;
    VenueJobDto: VenueJob;
    candidate: Candidate;
    jobPriority: string;
    jobList: Job[];
}
