import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Sm1le's Odyssey</h1>
        <div className="text-lg text-gray-600 mb-8 space-y-2">
          <p>Life is an odyssey of learning, creating, and evolving.</p>
          <p>Here's my journey through AI and personal growth</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/life" className="group p-6 border rounded-lg hover:border-gray-400 transition-colors">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-gray-600">生活思考</h2>
            <p className="text-gray-600">健身、音乐、人际关系、教育对比等个人随笔</p>
          </Link>
          <Link href="/ai" className="group p-6 border rounded-lg hover:border-gray-400 transition-colors">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-gray-600">AI领域探索</h2>
            <p className="text-gray-600">AI工具应用场景、技术趋势与深度思考</p>
          </Link>
          <Link href="/photography" className="group p-6 border rounded-lg hover:border-gray-400 transition-colors">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-gray-600">摄影</h2>
            <p className="text-gray-600">月度摄影集、旅行专辑、摄影技巧分享</p>
          </Link>
          <Link href="/culture" className="group p-6 border rounded-lg hover:border-gray-400 transition-colors">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-gray-600">语言与文化</h2>
            <p className="text-gray-600">语言学习方法、多语种探索、文化交流思考</p>
          </Link>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">最新文章</h2>
        <div className="space-y-6">
          <div className="p-6 border rounded-lg hover:border-gray-400 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">2024-01-20</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                1.2k
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">January in Frames: 冬日街头掠影</h3>
            <p className="text-gray-600 mb-4">本月的街头摄影集锦，记录城市中的温暖瞬间...</p>
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/images/winter-street.jpg"
                alt="冬日街头掠影"
                fill
                className="object-cover"
              />
            </div>
            <Link href="/blog/winter-street" className="text-blue-600 hover:text-blue-800 transition-colors">阅读全文 →</Link>
          </div>

          <div className="p-6 border rounded-lg hover:border-gray-400 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">2024-01-15</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                856
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI助手在日常工作中的实践与思考</h3>
            <p className="text-gray-600 mb-4">探讨如何有效地将AI工具整合到日常工作流程中...</p>
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/images/ai-workspace.jpg"
                alt="AI工作流程"
                fill
                className="object-cover"
              />
            </div>
            <Link href="/blog/ai-workspace" className="text-blue-600 hover:text-blue-800 transition-colors">阅读全文 →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
