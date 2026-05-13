import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

const CATEGORIES = [
  { num: '01', title: '生活思考', desc: '日常观察与个人反思' },
  { num: '02', title: 'AI 领域探索', desc: 'AI 工具与应用实践' },
  { num: '03', title: '摄影', desc: '街头影像与光影记录' },
  { num: '04', title: '语言与文化', desc: '语言学习与跨文化思考' },
]

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5)

  return (
    <div className="max-w-[760px] mx-auto px-6">
      {/* Hero */}
      <section className="text-center py-16 pb-12 border-b border-[#ddd]">
        <h1 className="text-[42px] font-bold tracking-[-1.5px] text-[#111] leading-none mb-0" style={{ fontFamily: 'Georgia, serif' }}>
          Sm1le&apos;s Odyssey
        </h1>
        <div className="w-12 h-0.5 bg-black mx-auto my-3" />
        <p className="text-[14px] italic text-[#666]" style={{ fontFamily: 'Georgia, serif' }}>记录 AI 与生活的交汇处</p>
      </section>

      {/* Category Grid */}
      <section className="py-10">
        <div className="text-[10px] tracking-[3px] uppercase text-[#aaa] mb-5">探索</div>
        <div className="border border-[#111] grid grid-cols-2">
          {CATEGORIES.map((cat, i) => {
            const isRightCol = i % 2 === 1
            const isLastRow = i >= 2
            return (
              <div
                key={cat.num}
                className={`p-6 cursor-default transition-colors hover:bg-[#f9f9f9] ${!isRightCol ? 'border-r border-[#111]' : ''} ${!isLastRow ? 'border-b border-[#111]' : ''}`}
              >
                <div className="text-[10px] tracking-[2px] uppercase text-[#aaa] mb-2">{cat.num}</div>
                <div className="text-[15px] font-bold text-[#111] mb-1" style={{ fontFamily: 'Georgia, serif' }}>{cat.title}</div>
                <div className="text-[12px] text-[#888]">{cat.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-10">
        <div className="text-[10px] tracking-[3px] uppercase text-[#aaa] mb-5">最新文章</div>
        <div>
          {posts.map((post, idx) => (
            <div key={post.slug} className={`py-5 flex justify-between items-start gap-8 ${idx < posts.length - 1 ? 'border-b border-[#eee]' : ''}`}>
              <div>
                <div className="text-[10px] tracking-[1.5px] uppercase text-[#bbb] mb-1">
                  {post.category} · {post.date}
                </div>
                <div className="text-[18px] font-bold text-[#111] leading-snug mb-1" style={{ fontFamily: 'Georgia, serif' }}>{post.title}</div>
                <div className="text-[12px] text-[#777] leading-relaxed mb-2">{post.excerpt}</div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[10px] tracking-[1.5px] uppercase text-[#111] border-b border-[#111] pb-px no-underline hover:text-[#666]"
                >
                  阅读全文
                </Link>
              </div>
              <div className="text-[11px] text-[#ccc] whitespace-nowrap shrink-0 mt-1">— 次阅读</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black py-6 text-center">
        <div className="text-[10px] tracking-[2px] uppercase text-[#bbb]">© 2025 Sm1le&apos;s Odyssey</div>
      </footer>
    </div>
  )
}
