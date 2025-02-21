// Type definition for a single blog post
export interface BlogPost {
  _id: string;
  title: string;
  author: string;
  image?: string;
  body: string;
  category: string[];
  createdAt: string;
}
