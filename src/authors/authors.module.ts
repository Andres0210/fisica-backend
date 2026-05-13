import { Module } from "@nestjs/common";
import { StorageModule } from "../storage/storage.module";
import { AuthorsController } from "./authors.controller";
import { AuthorsService } from "./authors.service";

@Module({
  imports: [StorageModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
