import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AdminApiGuard } from "../auth/admin-api.guard";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { FindTopicsQueryDto } from "./dto/find-topics-query.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { TopicsService } from "./topics.service";

@Controller("topics")
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  findAll(@Query() query: FindTopicsQueryDto) {
    return this.topicsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.topicsService.findOne(id);
  }

  @Post()
  @UseGuards(AdminApiGuard)
  create(@Body() dto: CreateTopicDto) {
    return this.topicsService.create(dto);
  }

  @Patch(":id")
  @UseGuards(AdminApiGuard)
  update(@Param("id") id: string, @Body() dto: UpdateTopicDto) {
    return this.topicsService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(AdminApiGuard)
  remove(@Param("id") id: string) {
    return this.topicsService.remove(id);
  }
}
