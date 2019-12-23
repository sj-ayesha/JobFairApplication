export class CandidateVenueJob {

    candidateVenueJob: number;
    venueJob: {
        venueJobId: number;
        venue: {
            venueId: number;
            venueName: string;
            startDate: Date;
            endDate: Date;
            address: string;
            active: boolean;
        },
        job: {
            jobId: number;
            title: string;
            level: string;
            category: string;
            description: string;
            minimumExperience: string;
            qualificationNeeded: string;
        }
    };
    candidate: {
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
    };
    jobPriority: string;
    message: string;
}
