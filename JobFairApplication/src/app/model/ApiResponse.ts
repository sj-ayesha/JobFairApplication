import { RoleDto } from './roleDto';

export class ApiResponse {
    status: number;
    message: number;
    result: Result;
}

export class Result {
    token: any;
    visa: string;
    roleDto: RoleDto
}