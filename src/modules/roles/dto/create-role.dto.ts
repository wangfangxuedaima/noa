import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '角色描述', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '权限列表', type: [String], required: false })
  @IsArray()
  @IsOptional()
  permissions?: string[];
}