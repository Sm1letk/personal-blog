export const CATEGORY_LABELS: Record<string, string> = {
  'life-thoughts': '生活思考',
  'ai-exploration': 'AI 探索',
  'photography': '摄影',
  'language-culture': '语言与文化',
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category
}
