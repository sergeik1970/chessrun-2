import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Slider } from "../../entities/Slider/slider.entity";
import { SliderController } from "../../controllers/SliderController/slider.controller";
import { SliderService } from "../../services/SliderService/slider.service";

@Module({
    imports: [TypeOrmModule.forFeature([Slider])],
    controllers: [SliderController],
    providers: [SliderService],
    exports: [SliderService],
})
export class SliderModule {}
