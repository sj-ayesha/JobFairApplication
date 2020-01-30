import { RoleDto } from './roleDto';

export class ApiResponse {
    status: number;
    message: string;
    result: Result;
}

export class Result {
    token: any;
    visa: string;
    roleDto: RoleDto;
}