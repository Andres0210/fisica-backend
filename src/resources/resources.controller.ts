import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminApiGuard } from "../auth/admin-api.guard";
import { CreateResourceDto } from "./dto/create-resource.dto";
import { FindResourcesQueryDto } from "./dto/find-resources-query.dto";
import { UploadResourceAssetDto } from "./dto/upload-resource-asset.dto";
import { UpdateResourceDto } from "./dto/update-resource.dto";
import { ResourcesService } from "./resources.service";

@Controller("resources")
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  findAll(@Query() query: FindResourcesQueryDto) {
    return this.resourcesService.findAll(query);
  }

  @Post("upload")
  @UseGuards(AdminApiGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 250 * 1024 * 1024,
      },
    }),
  )
  upload(
    @UploadedFile() file: any,
    @Body() body: UploadResourceAssetDto,
  ) {
    return this.resourcesService.uploadResourceAsset(file, body);
  }

  @Get("catalog/:kind")
  findCatalog(@Param("kind") kind: "videos" | "documentos" | "libros" | "cartillas", @Query("subject") subject?: string) {
    return this.resourcesService.findCatalog(kind, subject);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.resourcesService.findOne(id);
  }

  @Post()
  @UseGuards(AdminApiGuard)
  create(@Body() dto: CreateResourceDto) {
    return this.resourcesService.create(dto);
  }

  @Patch(":id")
  @UseGuards(AdminApiGuard)
  update(@Param("id") id: string, @Body() dto: UpdateResourceDto) {
    return this.resourcesService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(AdminApiGuard)
  remove(@Param("id") id: string) {
    return this.resourcesService.remove(id);
  }
}
