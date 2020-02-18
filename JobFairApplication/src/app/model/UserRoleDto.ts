import { UserDto } from './UserDto';
import { RoleDto } from './roleDto';

export class UserRoleDto {
    UserDto: UserDto;
    RoleDto: RoleDto;
}


export class UserRoleDtoResponseList {
    UserRoleDtoList: UserRoleDto[];
}
