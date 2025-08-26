import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from '../../entities/Slider/slider.entity';
import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';

@Module({
  imports: [TypeOrmModule.forFeature([Slider])],
  controllers: [SliderController],
  providers: [SliderService],
  exports: [SliderService],
})
export class SliderModule {}