import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicItem } from './entities/public-item.entity';
import { CreatePublicItemDto } from './dto/create-public-item.dto';
import { UpdatePublicItemDto } from './dto/update-public-item.dto';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(PublicItem)
    private publicItemRepository: Repository<PublicItem>,
  ) {}

  async create(createPublicItemDto: CreatePublicItemDto): Promise<PublicItem> {
    const publicItem = this.publicItemRepository.create(createPublicItemDto);
    return await this.publicItemRepository.save(publicItem);
  }

  async findAll(): Promise<PublicItem[]> {
    return await this.publicItemRepository.find();
  }

  async findOne(id: number): Promise<PublicItem> {
    const publicItem = await this.publicItemRepository.findOne({ where: { id } });
    if (!publicItem) {
      throw new NotFoundException(`ID为${id}的公共项目不存在`);
    }
    return publicItem;
  }

  async update(id: number, updatePublicItemDto: UpdatePublicItemDto): Promise<PublicItem> {
    const publicItem = await this.findOne(id);
    Object.assign(publicItem, updatePublicItemDto);
    return await this.publicItemRepository.save(publicItem);
  }

  async remove(id: number): Promise<void> {
    const result = await this.publicItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID为${id}的公共项目不存在`);
    }
  }
}