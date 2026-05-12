import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getCategoryLabel } from './categories'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export interface PostMeta {
  slug: string
  title: string
  date: string       // YYYY-MM-DD
  category: string   // raw key e.g. 'ai-exploration'
  categoryLabel: string  // display label e.g. 'AI 探索'
  excerpt: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const source = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
      const { data } = matter(source)

      const date: string = DATE_RE.test(data.date ?? '') ? data.date : '1970-01-01'
      if (!DATE_RE.test(data.date ?? '')) {
        console.warn(`[posts] Missing or invalid date in ${file}, falling back to 1970-01-01`)
      }

      const category: string = data.category ?? 'uncategorized'

      return {
        slug,
        title: data.title ?? slug,
        date,
        category,
        categoryLabel: getCategoryLabel(category),
        excerpt: data.excerpt ?? '',
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const mdPath = path.join(POSTS_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null

  if (!filePath) return null

  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)

  const date: string = DATE_RE.test(data.date ?? '') ? data.date : '1970-01-01'
  const category: string = data.category ?? 'uncategorized'

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date,
      category,
      categoryLabel: getCategoryLabel(category),
      excerpt: data.excerpt ?? '',
    },
    content,
  }
}
