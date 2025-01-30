export interface Post {
  title: string;
  date: string;
  category: 'life-thoughts' | 'ai-exploration' | 'photography' | 'language-culture';
  description: string;
  slug: string;
  content: string;
}