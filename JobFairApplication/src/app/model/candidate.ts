import { CandidateSkill } from './CandidateSkill';
import { Experience } from './experience';
import { Qualification } from './qualification';
import { CandidateVenueJob } from './candidateVenueJob';
import { CandidateScreening } from './candidateScreening';

export class Candidate {
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
    fileName: string;
    currentAcademicYear: string;
    experienceDtos: Experience[];
    qualificationDtos: Qualification[];
    candidateSkillDtos: CandidateSkill[];
    candidateVenueJobSaveDto: CandidateVenueJob[];
    candidateScreeningDtos: CandidateScreening[];
}

export class CandidateResponseList {
    candidateDtoList: Candidate[];
    totalElements: number;
    totalPages: number;
}
