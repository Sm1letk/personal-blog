import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

interface PostProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      metadata: data,
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: PostProps) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default async function BlogPost({ params }: PostProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
      <div className="mb-8">
        <h1 className="mb-2">{post.metadata.title}</h1>
        <div className="flex items-center gap-4 text-gray-500">
          <time>{post.metadata.date}</time>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {post.metadata.views}
          </span>
        </div>
      </div>
      {post.metadata.image && (
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={post.metadata.image}
            alt={post.metadata.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  );
}