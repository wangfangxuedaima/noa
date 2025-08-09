import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicService } from './public.service';
import { CreatePublicItemDto } from './dto/create-public-item.dto';
import { UpdatePublicItemDto } from './dto/update-public-item.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Post()
  @ApiOperation({ summary: '创建公共项目' })
  async create(@Body() createPublicItemDto: CreatePublicItemDto) {
    return await this.publicService.create(createPublicItemDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有公共项目' })
  async findAll() {
    return await this.publicService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定公共项目' })
  async findOne(@Param('id') id: string) {
    return await this.publicService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新公共项目' })
  async update(@Param('id') id: string, @Body() updatePublicItemDto: UpdatePublicItemDto) {
    return await this.publicService.update(+id, updatePublicItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除公共项目' })
  async remove(@Param('id') id: string) {
    await this.publicService.remove(+id);
    return null;
  }
}