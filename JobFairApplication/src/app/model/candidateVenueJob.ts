import { VenueJob } from './venueJob';
import { Candidate } from './candidate';
import { Job } from './job';
import { NumberSymbol } from '@angular/common';

export class CandidateVenueJob {

    candidateVenueJob: number;
    venueJob: VenueJob;
    candidate:{
        candidateId: number;
        firstName: string;
        lastName: string;
        email: string;
        telNumber: number;
        mobileNumber: number;
        gender: string;
        address: string;
        nationality: string;
        registrationDate: Date;
        availabilityDate: Date;
        currentLevel: string;
        jobType: string;
        currentAcademicYear: string;
    }
    jobPriority: string;
    jobList: Job[];
}
