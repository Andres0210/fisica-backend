import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FindSimulationsQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  courseId?: string;

  @IsOptional()
  @IsString()
  topicId?: string;

  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  publishedOnly?: boolean;
}
