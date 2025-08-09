import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePublicItemDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须是字符串' })
  title: string;

  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: '状态必须是布尔值' })
  isActive?: boolean;
}