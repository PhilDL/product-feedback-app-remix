import type { UserProfile, Feedback, Comment, Category } from "./database";

export interface CommentModel extends Comment {
  user: UserProfile;
  replies?: CommentModel[];
  replying_to_user: UserProfile | null;
}

export interface FeedbackUpvotes {
  feedback_id?: number;
  user_id: string;
}

export interface FeedbackModel extends Feedback {
  user: UserProfile;
  category: Category;
  comments: CommentModel[];
  upvotes: FeedbackUpvotes[];
}

export interface CategoryModel extends Category {}

export interface FeedbackStatusAggregate {
  name: string;
  key: string;
  color: string;
  count: number;
}
