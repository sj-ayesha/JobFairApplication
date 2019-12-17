export class Candidate {
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
    experienceDtos: [{
      companyName: String;
      position: String;
      duration: String;
    }]
    qualificationDtos: [{
      title: String;
      division: String;
      institution: String;
      graduationDate: Date;
    }]
    candidateSkillDtos: [{
      skillId: Number;
      checked: boolean;
    }]
    candidateVenueJobSaveDto: [{
      venueId: Number;
      jobId: Number;
      jobPriority: String;
    }]
}
