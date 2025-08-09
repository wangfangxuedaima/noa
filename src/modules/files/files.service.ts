import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create(file: Express.Multer.File) {
    const newFile = this.fileRepository.create({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    });

    return await this.fileRepository.save(newFile);
  }

  async findAll() {
    return await this.fileRepository.find();
  }

  async findOne(id: number) {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException(`文件ID ${id} 不存在`);
    }
    return file;
  }

  async remove(id: number) {
    const file = await this.findOne(id);
    
    // 删除物理文件
    try {
      fs.unlinkSync(file.path);
    } catch (error) {
      console.error('删除文件失败:', error);
    }
    
    return await this.fileRepository.remove(file);
  }

  getFilePath(filename: string) {
    return path.join(process.cwd(), 'uploads/files', filename);
  }
}
