export class Candidate {
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
    experienceDtos: [{
      companyName: string;
      position: string;
      duration: string;
    }];
    qualificationDtos: [{
      title: string;
      division: string;
      institution: string;
      graduationDate: Date;
    }];
    candidateSkillDtos: [{
      skillId: number;
      checked: boolean;
    }];
    candidateVenueJobSaveDto: [{
      venueId: number;
      jobId: number;
      jobPriority: string;
    }];
}
