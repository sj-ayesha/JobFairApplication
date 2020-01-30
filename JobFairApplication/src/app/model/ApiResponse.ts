import { RoleDto } from './roleDto';

export class ApiResponse {
    status: string;
    message: string;
    result: Result;
}

export class Result {
    token: any;
    visa: string;
    roleDto: RoleDto;
}