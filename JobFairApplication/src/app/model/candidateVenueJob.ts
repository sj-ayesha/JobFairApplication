export class CandidateVenueJob {

    candidateVenueJob: Number;
    venueJob: {
        venueJobId: Number;
        venue: {
            venueId: Number;
            venueName: String;
            startDate: Date;
            endDate: Date;
            address: String;
            active: boolean;
        },
        job: {
            jobId: Number;
            title: String;
            level: String;
            category: String;
            description: String;
            minimumExperience: String;
            qualificationNeeded: String;
        }
        candidate: {
            candidateId: Number;
            firstName: String;
            lastName: String;
            email: String;
            telNumber: Number;
            mobileNumber: Number;
            gender: String;
            address: String;
            nationality: String;
            registrationDate: Date;
            availabilityDate: Date;
            currentLevel: String;
            jobType: String;
            currentAcademicYear: String;
        },
        jobPriority: String;
        message:String;
    }
}