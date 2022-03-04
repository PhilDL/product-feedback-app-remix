import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  // const user = await db.user.upsert({
  //   where: {
  //     email: "philippe.lattention@hotmail.fr",
  //   },
  //   update: {
  //     role: "ADMIN",
  //   },
  //   create: {
  //     email: "philippe.lattention@hotmail.fr",
  //     username: "_PhilDL",
  //     passwordHash:
  //       "$2a$12$Jo.wAtBev4KbpfEHPvaG5.AHTnO/vjBTJFhNGd2mXse8Ou9qRTWui",
  //     fullName: "Philippe L'ATTENTION",
  //     avatarUrl: "https://avatars.githubusercontent.com/u/4941205?s=400&v=4",
  //     role: "ADMIN",
  //   },
  // });
  const UICategory = await db.category.upsert({
    where: { slug: "ui" },
    update: {},
    create: {
      name: "UI",
      slug: "ui",
    },
  });
  const UXCategory = await db.category.upsert({
    where: { slug: "ux" },
    update: {},
    create: {
      name: "UX",
      slug: "ux",
    },
  });
  const bugCategory = await db.category.upsert({
    where: { slug: "bug" },
    update: {},
    create: {
      name: "Bug",
      slug: "bug",
    },
  });
  const enhancementCategory = await db.category.upsert({
    where: { slug: "enhancement" },
    update: {},
    create: {
      name: "Enhancement",
      slug: "enhancement",
    },
  });
  const featureCategory = await db.category.upsert({
    where: { slug: "feature" },
    update: {},
    create: {
      name: "Feature",
      slug: "feature",
    },
  });

  // const feedback = await db.feedback.upsert({
  //   where: { slug: "oneclick-portfolio-generation" },
  //   update: {},
  //   create: {
  //     title: "One-click portfolio generation",
  //     userId: user.id,
  //     description:
  //       "Add ability to create professional looking portfolio from profile.",
  //     slug: "oneclick-portfolio-generation",
  //     categoryId: featureCategory.id,
  //   },
  // });
}

seed();
