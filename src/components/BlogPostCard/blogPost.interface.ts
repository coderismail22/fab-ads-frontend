export interface IBlogPost {
  _id: string;
  title: string;
  author: string;
  image?: string;
  body: string;
  category?: string[];
  comments?: string[];
  isDeleted?: boolean;
  createdAt: Date | string;
}
