import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About — Sm1le's Odyssey",
}

const EXPERIENCE = [
  { period: '2023 — 至今', role: 'AI 产品研究员', org: '某公司', desc: '专注 AI 工具在实际工作场景中的落地研究。' },
  { period: '2021 — 2023', role: '产品经理', org: '某公司', desc: '' },
  { period: '2017 — 2021', role: '本科', org: 'XX 大学 · XX 专业', desc: '' },
]

const SKILLS = ['AI Tools', 'Prompt Engineering', 'Street Photography', '中文', 'English', 'Français B1', 'Next.js']

const NOW = [
  'AI 工具深度评测系列',
  '法语 B1 备考',
  '每月一组街头摄影',
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[10px] tracking-[3px] uppercase text-[#aaa] whitespace-nowrap">{children}</span>
      <div className="flex-1 h-px bg-[#eee]" />
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="max-w-[760px] mx-auto px-6">
      {/* Header */}
      <header className="py-12 pb-9 border-b border-[#ddd] mb-12">
        <div className="text-[10px] tracking-[3px] uppercase text-[#aaa] mb-3">About Me</div>
        <h1 className="text-[36px] font-bold tracking-[-1px] text-[#111] leading-none mb-3">Sm1le</h1>
        <p className="text-[14px] italic text-[#666] leading-relaxed">
          AI 工具探索者，街头摄影师，同时在学习法语。
        </p>
      </header>

      {/* Experience */}
      <section className="mb-10">
        <SectionLabel>经历</SectionLabel>
        <div className="relative pl-5">
          <div className="absolute left-0 top-1.5 bottom-0 w-px bg-[#ddd]" />
          {EXPERIENCE.map((item) => (
            <div key={item.period} className="relative mb-7 last:mb-0">
              <div className="absolute -left-[22px] top-1.5 w-[7px] h-[7px] rounded-full bg-white border border-[#111]" />
              <div className="text-[10px] tracking-[1.5px] uppercase text-[#aaa] mb-0.5">{item.period}</div>
              <div className="text-[15px] font-bold text-[#111] mb-0.5">{item.role}</div>
              <div className="text-[12px] text-[#888] mb-1">{item.org}</div>
              {item.desc && <div className="text-[12px] text-[#777] leading-relaxed">{item.desc}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <SectionLabel>技能 & 兴趣</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {SKILLS.map((skill) => (
            <span key={skill} className="text-[10px] tracking-[1px] uppercase border border-[#ddd] px-2.5 py-1 text-[#666]">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Now */}
      <section className="mb-10">
        <SectionLabel>现在在做</SectionLabel>
        <div>
          {NOW.map((item) => (
            <div key={item} className="flex gap-2.5 text-[13px] text-[#555] leading-relaxed py-1.5 border-b border-[#f5f5f5] last:border-0">
              <span className="text-[#111] shrink-0">→</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <SectionLabel>联系</SectionLabel>
        <div className="flex gap-6">
          {/* TODO: replace with actual profile URLs */}
          <a href="https://github.com/sm1le" className="text-[11px] tracking-[1.5px] uppercase text-[#111] border-b border-[#ddd] pb-0.5 no-underline hover:border-[#111] transition-colors">GitHub</a>
          <a href="https://twitter.com/sm1le" className="text-[11px] tracking-[1.5px] uppercase text-[#111] border-b border-[#ddd] pb-0.5 no-underline hover:border-[#111] transition-colors">Twitter</a>
          <a href="mailto:hello@sm1le.dev" className="text-[11px] tracking-[1.5px] uppercase text-[#111] border-b border-[#ddd] pb-0.5 no-underline hover:border-[#111] transition-colors">Email</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black py-6 text-center">
        <div className="text-[10px] tracking-[2px] uppercase text-[#bbb]">© 2025 Sm1le&apos;s Odyssey</div>
      </footer>
    </div>
  )
}
