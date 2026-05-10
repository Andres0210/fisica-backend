import { Controller, Get, Query } from "@nestjs/common";
import { FindSimulationsQueryDto } from "./dto/find-simulations-query.dto";
import { SimulationsService } from "./simulations.service";

@Controller("simulations")
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Get()
  findAll(@Query() query: FindSimulationsQueryDto) {
    return this.simulationsService.findAll(query);
  }
}
