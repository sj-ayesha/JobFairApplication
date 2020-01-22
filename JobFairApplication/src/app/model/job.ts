export class Job {
    jobId: number;
    title: string;
    level: string;
    category: string;
    description: string;
    minimumExperience: string;
    qualificationNeeded: string;
}


export class JobResponseList {
    jobDtoList: Job[];
    totalElements: number;
    totalPages: number;
}
