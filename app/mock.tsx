import { FeedbackModel, CategoryModel } from "./types/models";

export const mockedFeedbacks: FeedbackModel[] = [
  {
    id: 8,
    created_at: "2022-02-23T13:54:25.157033+00:00",
    title: "Add a dark theme option",
    user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
    description:
      "It would help people with light sensitivities and who prefer dark mode.",
    slug: "add-a-dark-theme-option",
    category_id: 5,
    status: "planned",
    category: {
      id: 5,
      name: "Feature",
      slug: "feature",
    },
    comments: [
      {
        id: 35,
        created_at: "2022-02-24T16:30:11.667834+00:00",
        user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
        content:
          "Good idea because this product feedback app is too light for me !!! ",
        feedback_id: 8,
        parent_id: null,
        has_replies: false,
        replying_to: null,
        user: {
          id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
          username: "Jdodo",
          avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
          full_name: "John DoeDoe",
        },
        replying_to_user: null,
      },
      {
        id: 36,
        created_at: "2022-02-24T17:55:15.416332+00:00",
        user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
        content: "Yes",
        feedback_id: 8,
        parent_id: 35,
        has_replies: false,
        replying_to: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
        user: {
          id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
          username: "Jdodo",
          avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
          full_name: "John DoeDoe",
        },
        replying_to_user: {
          id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
          username: "Jdodo",
          avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
          full_name: "John DoeDoe",
        },
      },
      {
        id: 37,
        created_at: "2022-02-24T18:25:57.677631+00:00",
        user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
        content: "Grat idea",
        feedback_id: 8,
        parent_id: null,
        has_replies: false,
        replying_to: null,
        user: {
          id: "201d83bd-d464-4d17-9e16-654942e3af15",
          username: "_philDL",
          avatar_url:
            "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
          full_name: "Philippe L'ATTENTION",
        },
        replying_to_user: null,
      },
      {
        id: 41,
        created_at: "2022-02-25T21:28:01.022239+00:00",
        user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
        content: "Cool reply",
        feedback_id: 8,
        parent_id: 36,
        has_replies: false,
        replying_to: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
        user: {
          id: "201d83bd-d464-4d17-9e16-654942e3af15",
          username: "_philDL",
          avatar_url:
            "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
          full_name: "Philippe L'ATTENTION",
        },
        replying_to_user: {
          id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
          username: "Jdodo",
          avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
          full_name: "John DoeDoe",
        },
      },
      {
        id: 42,
        created_at: "2022-02-25T21:28:31.745351+00:00",
        user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
        content: "This is another reply",
        feedback_id: 8,
        parent_id: 37,
        has_replies: false,
        replying_to: "201d83bd-d464-4d17-9e16-654942e3af15",
        user: {
          id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
          username: "Jdodo",
          avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
          full_name: "John DoeDoe",
        },
        replying_to_user: {
          id: "201d83bd-d464-4d17-9e16-654942e3af15",
          username: "_philDL",
          avatar_url:
            "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
          full_name: "Philippe L'ATTENTION",
        },
      },
      {
        id: 43,
        created_at: "2022-02-25T21:28:50.300604+00:00",
        user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It h",
        feedback_id: 8,
        parent_id: null,
        has_replies: false,
        replying_to: null,
        user: {
          id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
          username: "Jdodo",
          avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
          full_name: "John DoeDoe",
        },
        replying_to_user: null,
      },
    ],
    user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
    upvotes: [
      {
        user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
      },
      {
        user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
      },
    ],
  },
  {
    id: 10,
    created_at: "2022-02-23T20:54:15.546001+00:00",
    title: "Q&A within the challenge hubs",
    user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
    description:
      "Challenge-specific Q&A would make for easy reference. Not enough.",
    slug: "qa-within-the-challenge-hubs",
    category_id: 5,
    status: "in-progress",
    category: {
      id: 5,
      name: "Feature",
      slug: "feature",
    },
    comments: [],
    user: {
      id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
      username: "Jdodo",
      avatar_url: "https://avatars.dicebear.com/api/bottts/john-doedoe.svg",
      full_name: "John DoeDoe",
    },
    upvotes: [
      {
        user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
      },
    ],
  },
  {
    id: 17,
    created_at: "2022-02-24T20:44:50.433591+00:00",
    title: "Learning paths",
    user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
    description:
      "Sequenced projects for different goals to help people improve.",
    slug: "learning-paths",
    category_id: 5,
    status: undefined,
    category: {
      id: 5,
      name: "Feature",
      slug: "feature",
    },
    comments: [],
    user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
    upvotes: [
      {
        user_id: "f1d786b9-d049-4ede-9cbf-c8aa76e94c5b",
      },
    ],
  },
  {
    id: 20,
    created_at: "2022-02-24T20:45:40.435434+00:00",
    title: "Add micro-interactions",
    user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
    description:
      "Small animations at specific points can add delight. Cooler !",
    slug: "add-microinteractions",
    category_id: 4,
    status: "live",
    category: {
      id: 4,
      name: "Enhancement",
      slug: "enhancement",
    },
    comments: [],
    user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
    upvotes: [
      {
        user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
      },
    ],
  },
  {
    id: 16,
    created_at: "2022-02-24T20:44:37.463227+00:00",
    title: "More comprehensive reports",
    user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
    description:
      "It would be great to see a more detailed breakdown of solutions.",
    slug: "more-comprehensive-reports",
    category_id: 5,
    status: "planned",
    category: {
      id: 5,
      name: "Feature",
      slug: "feature",
    },
    comments: [],
    user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
    upvotes: [],
  },
  {
    id: 18,
    created_at: "2022-02-24T20:45:04.325744+00:00",
    title: "One-click portfolio generation",
    user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
    description:
      "Add ability to create professional looking portfolio from profile.",
    slug: "oneclick-portfolio-generation",
    category_id: 5,
    status: undefined,
    category: {
      id: 5,
      name: "Feature",
      slug: "feature",
    },
    comments: [],
    user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
    upvotes: [],
  },
  {
    id: 19,
    created_at: "2022-02-24T20:45:16.328527+00:00",
    title: "Animated solution screenshots",
    user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
    description:
      "Screenshots of solutions with animations don’t display correctly.",
    slug: "animated-solution-screenshots",
    category_id: 3,
    status: "in-progress",
    category: {
      id: 3,
      name: "Bug",
      slug: "bug",
    },
    comments: [],
    user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
    upvotes: [],
  },
  {
    id: 21,
    created_at: "2022-02-24T20:46:35.982967+00:00",
    title: "Bookmark challenges",
    user_id: "201d83bd-d464-4d17-9e16-654942e3af15",
    description:
      "It would be great to be able to bookmark challenges to take later on.",
    slug: "bookmark-challenges",
    category_id: 5,
    status: "in-progress",
    category: {
      id: 5,
      name: "Feature",
      slug: "feature",
    },
    comments: [],
    user: {
      id: "201d83bd-d464-4d17-9e16-654942e3af15",
      username: "_philDL",
      avatar_url:
        "https://avatars.dicebear.com/api/bottts/philippe-lattention.svg",
      full_name: "Philippe L'ATTENTION",
    },
    upvotes: [],
  },
];

export const mockedCategories: CategoryModel[] = [
  { id: 1, created_at: "2022-02-21T18:18:13+00:00", name: "UI" },
  { id: 2, created_at: "2022-02-21T18:18:20+00:00", name: "UX" },
  { id: 3, created_at: "2022-02-21T18:18:24+00:00", name: "Bug" },
  {
    id: 4,
    created_at: "2022-02-21T18:18:31+00:00",
    name: "Enhancement",
  },
  { id: 5, created_at: "2022-02-21T18:18:46+00:00", name: "Feature" },
];
