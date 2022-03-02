import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const user = await db.user.upsert({
    where: {
      email: "philippe.lattention@hotmail.fr",
    },
    update: {
      role: "ADMIN",
    },
    create: {
      email: "philippe.lattention@hotmail.fr",
      username: "_PhilDL",
      passwordHash:
        "$2a$12$Jo.wAtBev4KbpfEHPvaG5.AHTnO/vjBTJFhNGd2mXse8Ou9qRTWui",
      fullName: "Philippe L'ATTENTION",
      avatarUrl: "https://avatars.githubusercontent.com/u/4941205?s=400&v=4",
      role: "ADMIN",
    },
  });
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

  const feedback = await db.feedback.upsert({
    where: { slug: "oneclick-portfolio-generation" },
    update: {},
    create: {
      title: "One-click portfolio generation",
      userId: user.id,
      description:
        "Add ability to create professional looking portfolio from profile.",
      slug: "oneclick-portfolio-generation",
      categoryId: featureCategory.id,
    },
  });

  //   {
  //     id: 18,
  //     created_at: "2022-02-24T20:45:04.325744+00:00",
  //     title: "One-click portfolio generation",
  //     user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
  //     description:
  //       "Add ability to create professional looking portfolio from profile.",
  //     slug: "oneclick-portfolio-generation",
  //     category_id: 5,
  //     status: undefined,
  //     category: {
  //       id: 5,
  //       name: "Feature",
  //       slug: "feature",
  //     },
  //     comments: [],
  //     user: {
  //       id: "201d83bd-d464-4d17-9e16-654942e3af15",
  //       username: "_philDL",
  //       avatar_url:
  //         "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
  //       full_name: "Philippe L'ATTENTION",
  //     },
  //     upvotes: [],
  //   },
  //   {
  //     id: 19,
  //     created_at: "2022-02-24T20:45:16.328527+00:00",
  //     title: "Animated solution screenshots",
  //     user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
  //     description:
  //       "Screenshots of solutions with animations don’t display correctly.",
  //     slug: "animated-solution-screenshots",
  //     category_id: 3,
  //     status: "in-progress",
  //     category: {
  //       id: 3,
  //       name: "Bug",
  //       slug: "bug",
  //     },
  //     comments: [],
  //     user: {
  //       id: "201d83bd-d464-4d17-9e16-654942e3af15",
  //       username: "_philDL",
  //       avatar_url:
  //         "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
  //       full_name: "Philippe L'ATTENTION",
  //     },
  //     upvotes: [],
  //   },
  //   {
  //     id: 21,
  //     created_at: "2022-02-24T20:46:35.982967+00:00",
  //     title: "Bookmark challenges",
  //     user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
  //     description:
  //       "It would be great to be able to bookmark challenges to take later on.",
  //     slug: "bookmark-challenges",
  //     category_id: 5,
  //     status: "in-progress",
  //     category: {
  //       id: 5,
  //       name: "Feature",
  //       slug: "feature",
  //     },
  //     comments: [],
  //     user: {
  //       id: "201d83bd-d464-4d17-9e16-654942e3af15",
  //       username: "_philDL",
  //       avatar_url:
  //         "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
  //       full_name: "Philippe L'ATTENTION",
  //     },
  //     upvotes: [],
  //   },
}

seed();
