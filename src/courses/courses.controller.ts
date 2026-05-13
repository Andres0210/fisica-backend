import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AdminApiGuard } from "../auth/admin-api.guard";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  @UseGuards(AdminApiGuard)
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Patch(":id")
  @UseGuards(AdminApiGuard)
  update(@Param("id") id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(AdminApiGuard)
  remove(@Param("id") id: string) {
    return this.coursesService.remove(id);
  }
}
