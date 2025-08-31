import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SliderService } from '../../services/SliderService/slider.service';
import { Slider } from '../../entities/Slider/slider.entity';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post()
  create(@Body() createSliderDto: Partial<Slider>) {
    return this.sliderService.create(createSliderDto);
  }

  @Get()
  findAll() {
    return this.sliderService.findAll();
  }

  @Get('news/:newsId')
  findByNewsId(@Param('newsId', ParseIntPipe) newsId: number) {
    return this.sliderService.findByNewsId(newsId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sliderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSliderDto: Partial<Slider>,
  ) {
    return this.sliderService.update(id, updateSliderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sliderService.remove(id);
  }
}