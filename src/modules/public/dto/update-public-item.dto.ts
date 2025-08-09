import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdatePublicItemDto {
  @IsOptional()
  @IsString({ message: '标题必须是字符串' })
  title?: string;

  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: '状态必须是布尔值' })
  isActive?: boolean;
}