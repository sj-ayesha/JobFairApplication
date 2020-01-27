export class Job {
    jobId: number;
    title: string;
    level: string;
    category: string;
    description: string;
    minimumExperience: string;
    qualificationNeeded: string;
    checked: boolean;
}


export class JobResponseList {
    jobDtoList: Job[];
    totalElements: number;
    totalPages: number;
    // checked = false;
}
