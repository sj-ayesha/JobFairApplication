import { CandidatesPerMonth } from './CandidatesPerMonth';

export class Dashboard {
    totalJobsByVenue: number;
    totalCandidatesPerMonthVenue: CandidatesPerMonth;
    totalProceedScreeningStatusByVenue: number;
    totalApprovedScreeningStatusByVenue: number;
    totalRejectedScreeningStatusByVenue: number;

    totalCandidatesByAllVenue: number;
    totalProceedScreeningStatusByAllVenue: number;
    totalApprovedScreeningStatusByAllVenue: number;
    totalRejectedScreeningStatusByAllVenue: number;

    totalCandidatesPerSoftwareEngineerByAllVenue: number;
    totalCandidatesPerBusinessAnalystByAllVenue: number;
    totalCandidatesPerQualityAssuranceByAllVenue: number;
    totalCandidatesPerManagerByAllVenue: number;
    totalCandidatesPerHumanResourceByAllVenue: number;
    totalCandidatesPerArchitectByAllVenue: number;
}