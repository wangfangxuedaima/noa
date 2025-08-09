import { 
  Controller, 
  Get, 
  Post, 
  Param, 
  Delete, 
  UseInterceptors, 
  UploadedFile, 
  Res, 
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileResponseDto } from './dto/file-response.dto';

@ApiTags('文件管理')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: '文件上传成功', type: FileResponseDto })
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.create(file);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '获取所有文件列表(仅管理员)' })
  @ApiResponse({ status: 200, description: '文件列表', type: [FileResponseDto] })
  @ApiBearerAuth('JWT-auth')
  async findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取单个文件信息' })
  @ApiResponse({ status: 200, description: '文件信息', type: FileResponseDto })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @ApiBearerAuth('JWT-auth')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.findOne(id);
  }

  @Get('download/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '下载文件' })
  @ApiResponse({ status: 200, description: '文件下载' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @ApiBearerAuth('JWT-auth')
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const file = await this.filesService.findOne(id);
    res.download(file.path, file.originalname);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '删除文件(仅管理员)' })
  @ApiResponse({ status: 200, description: '文件删除成功' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  @ApiBearerAuth('JWT-auth')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.remove(id);
  }
}
