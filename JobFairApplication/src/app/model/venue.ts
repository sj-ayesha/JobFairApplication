export class Venue{
    venueId: number;
    venueName: string;
    startDate: Date;
    endDate: Date;
    address: string;
    active: boolean;
}

export class VenueResponseList {
    venueDtoList: Venue[];
    totalElements: number;
    totalPages: number;
}
