import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FindSimulationsQueryDto } from "./dto/find-simulations-query.dto";

@Injectable()
export class SimulationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: FindSimulationsQueryDto) {
    return this.prisma.simulation.findMany({
      where: {
        ...(query.search
          ? {
              OR: [
                { title: { contains: query.search, mode: "insensitive" } },
                { description: { contains: query.search, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(query.topicId ? { topicId: query.topicId } : {}),
        ...(query.courseId ? { topic: { courseId: query.courseId } } : {}),
        ...(query.publishedOnly ? { isPublished: true } : {}),
      },
      orderBy: [{ createdAt: "desc" }],
      include: {
        topic: {
          include: {
            course: true,
          },
        },
      },
    });
  }
}
