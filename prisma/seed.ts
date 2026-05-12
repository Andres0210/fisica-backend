import { PrismaClient } from "@prisma/client";
import { seedAuthors, seedCourses, seedResources, seedTopics, seedUsers } from "./seed-data";

const prisma = new PrismaClient();

async function upsertUsers() {
  for (const user of seedUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      create: user,
    });
  }
}

async function upsertAuthors() {
  for (const author of seedAuthors) {
    await prisma.author.upsert({
      where: { id: author.id },
      update: {
        name: author.name,
        slug: author.slug,
        profession: author.profession,
        bio: author.bio,
        avatarUrl: author.avatarUrl,
      },
      create: author,
    });
  }
}

async function upsertCourses() {
  for (const course of seedCourses) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: {
        title: course.title,
        slug: course.slug,
        description: course.description,
        level: course.level,
        isPublished: course.isPublished,
      },
      create: course,
    });
  }
}

async function upsertTopics() {
  for (const topic of seedTopics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
      update: {
        title: topic.title,
        slug: topic.slug,
        description: topic.description,
        position: topic.position,
        courseId: topic.courseId,
      },
      create: topic,
    });
  }
}

async function upsertResources() {
  for (const resource of seedResources) {
    await prisma.resource.upsert({
      where: { id: resource.id },
      update: {
        title: resource.title,
        slug: resource.slug,
        description: resource.description,
        type: resource.type,
        category: resource.category,
        status: resource.status,
        storageUrl: resource.storageUrl,
        storageBucket: resource.storageBucket,
        storagePath: resource.storagePath,
        originalFileName: resource.originalFileName,
        mimeType: resource.mimeType,
        thumbnailUrl: resource.thumbnailUrl,
        durationMinutes: resource.durationMinutes,
        fileSizeMb: resource.fileSizeMb,
        publishedAt: resource.publishedAt,
        authorId: resource.authorId,
        authorProfileId: resource.authorProfileId,
        courseId: resource.courseId,
        topicId: resource.topicId,
      },
      create: resource,
    });
  }
}

async function main() {
  await upsertUsers();
  await upsertAuthors();
  await upsertCourses();
  await upsertTopics();
  await upsertResources();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.info("Seed completed safely.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
