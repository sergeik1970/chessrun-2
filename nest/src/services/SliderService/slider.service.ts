import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slider } from '../../entities/Slider/slider.entity';

@Injectable()
export class SliderService {
  constructor(
    @InjectRepository(Slider)
    private sliderRepository: Repository<Slider>,
  ) {}

  async findAll(): Promise<Slider[]> {
    return this.sliderRepository.find();
  }

  async findByNewsId(newsId: number): Promise<Slider[]> {
    return this.sliderRepository.find({
      where: { newsId },
    });
  }

  async findOne(id: number): Promise<Slider> {
    return this.sliderRepository.findOne({
      where: { id },
    });
  }

  async create(sliderData: Partial<Slider>): Promise<Slider> {
    const slider = this.sliderRepository.create(sliderData);
    return this.sliderRepository.save(slider);
  }

  async update(id: number, sliderData: Partial<Slider>): Promise<Slider> {
    await this.sliderRepository.update(id, sliderData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sliderRepository.delete(id);
  }
}