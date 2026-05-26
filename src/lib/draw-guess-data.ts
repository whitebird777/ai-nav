// AI 你画我猜 — 词库

export interface DrawWord {
  id: number
  word_zh: string
  word_en: string
  image_url: string
  hints_zh: string[]
  hints_en: string[]
  category_zh: string
  category_en: string
}

const WORDS: DrawWord[] = [
  {
    id: 1, word_zh: '猫', word_en: 'Cat',
    image_url: 'https://picsum.photos/seed/draw-cat/400/300',
    hints_zh: ['毛茸茸的宠物', '会喵喵叫'], hints_en: ['Furry pet', 'It meows'],
    category_zh: '动物', category_en: 'Animal',
  },
  {
    id: 2, word_zh: '狗', word_en: 'Dog',
    image_url: 'https://picsum.photos/seed/draw-dog/400/300',
    hints_zh: ['人类最好的朋友', '会汪汪叫'], hints_en: ['Man\'s best friend', 'It barks'],
    category_zh: '动物', category_en: 'Animal',
  },
  {
    id: 3, word_zh: '飞机', word_en: 'Airplane',
    image_url: 'https://picsum.photos/seed/draw-plane/400/300',
    hints_zh: ['在天上飞的交通工具', '有机翼和引擎'], hints_en: ['Flies in the sky', 'Has wings and engines'],
    category_zh: '交通工具', category_en: 'Vehicle',
  },
  {
    id: 4, word_zh: '自行车', word_en: 'Bicycle',
    image_url: 'https://picsum.photos/seed/draw-bike/400/300',
    hints_zh: ['两个轮子', '用脚踩的'], hints_en: ['Two wheels', 'Pedal powered'],
    category_zh: '交通工具', category_en: 'Vehicle',
  },
  {
    id: 5, word_zh: '汉堡', word_en: 'Hamburger',
    image_url: 'https://picsum.photos/seed/draw-burger/400/300',
    hints_zh: ['快餐店常见', '面包夹肉饼'], hints_en: ['Fast food classic', 'Bun with a patty'],
    category_zh: '食物', category_en: 'Food',
  },
  {
    id: 6, word_zh: '太阳', word_en: 'Sun',
    image_url: 'https://picsum.photos/seed/draw-sun/400/300',
    hints_zh: ['白天能看到', '又圆又亮又热'], hints_en: ['Seen during the day', 'Round, bright, and hot'],
    category_zh: '自然', category_en: 'Nature',
  },
  {
    id: 7, word_zh: '月亮', word_en: 'Moon',
    image_url: 'https://picsum.photos/seed/draw-moon/400/300',
    hints_zh: ['晚上能看到', '有时弯有时圆'], hints_en: ['Seen at night', 'Sometimes crescent, sometimes full'],
    category_zh: '自然', category_en: 'Nature',
  },
  {
    id: 8, word_zh: '鱼', word_en: 'Fish',
    image_url: 'https://picsum.photos/seed/draw-fish/400/300',
    hints_zh: ['生活在水里', '有鳞片和鳍'], hints_en: ['Lives in water', 'Has scales and fins'],
    category_zh: '动物', category_en: 'Animal',
  },
  {
    id: 9, word_zh: '花', word_en: 'Flower',
    image_url: 'https://picsum.photos/seed/draw-flower/400/300',
    hints_zh: ['有花瓣', '闻起来很香'], hints_en: ['Has petals', 'Smells nice'],
    category_zh: '自然', category_en: 'Nature',
  },
  {
    id: 10, word_zh: '大树', word_en: 'Tree',
    image_url: 'https://picsum.photos/seed/draw-tree/400/300',
    hints_zh: ['有树干和树叶', '公园里很多'], hints_en: ['Has a trunk and leaves', 'Found in parks'],
    category_zh: '自然', category_en: 'Nature',
  },
  {
    id: 11, word_zh: '房子', word_en: 'House',
    image_url: 'https://picsum.photos/seed/draw-house/400/300',
    hints_zh: ['人住在里面', '有门有窗有屋顶'], hints_en: ['People live in it', 'Has doors, windows, and a roof'],
    category_zh: '物品', category_en: 'Object',
  },
  {
    id: 12, word_zh: '汽车', word_en: 'Car',
    image_url: 'https://picsum.photos/seed/draw-car/400/300',
    hints_zh: ['四个轮子', '需要加油或充电'], hints_en: ['Four wheels', 'Needs fuel or charging'],
    category_zh: '交通工具', category_en: 'Vehicle',
  },
  {
    id: 13, word_zh: '大象', word_en: 'Elephant',
    image_url: 'https://picsum.photos/seed/draw-elephant/400/300',
    hints_zh: ['体型最大的陆地动物', '有长鼻子'], hints_en: ['Largest land animal', 'Has a long trunk'],
    category_zh: '动物', category_en: 'Animal',
  },
  {
    id: 14, word_zh: '吉他', word_en: 'Guitar',
    image_url: 'https://picsum.photos/seed/draw-guitar/400/300',
    hints_zh: ['弦乐器', '可以弹唱'], hints_en: ['String instrument', 'Used for singing along'],
    category_zh: '物品', category_en: 'Object',
  },
  {
    id: 15, word_zh: '雨伞', word_en: 'Umbrella',
    image_url: 'https://picsum.photos/seed/draw-umbrella/400/300',
    hints_zh: ['下雨天用的', '可以撑开收起来'], hints_en: ['Used on rainy days', 'Opens and closes'],
    category_zh: '物品', category_en: 'Object',
  },
  {
    id: 16, word_zh: '蛋糕', word_en: 'Cake',
    image_url: 'https://picsum.photos/seed/draw-cake/400/300',
    hints_zh: ['甜点', '过生日时会吃'], hints_en: ['Dessert', 'Eaten at birthdays'],
    category_zh: '食物', category_en: 'Food',
  },
  {
    id: 17, word_zh: '星星', word_en: 'Star',
    image_url: 'https://picsum.photos/seed/draw-star/400/300',
    hints_zh: ['夜空中闪烁', '五角形状'], hints_en: ['Twinkles in the night sky', 'Five-pointed shape'],
    category_zh: '自然', category_en: 'Nature',
  },
  {
    id: 18, word_zh: '杯子', word_en: 'Cup',
    image_url: 'https://picsum.photos/seed/draw-cup/400/300',
    hints_zh: ['用来喝水的', '有把手'], hints_en: ['Used for drinking', 'Has a handle'],
    category_zh: '物品', category_en: 'Object',
  },
  {
    id: 19, word_zh: '眼镜', word_en: 'Glasses',
    image_url: 'https://picsum.photos/seed/draw-glasses/400/300',
    hints_zh: ['戴在脸上的', '帮助看得更清楚'], hints_en: ['Worn on the face', 'Helps you see better'],
    category_zh: '物品', category_en: 'Object',
  },
  {
    id: 20, word_zh: '鞋子', word_en: 'Shoe',
    image_url: 'https://picsum.photos/seed/draw-shoe/400/300',
    hints_zh: ['穿在脚上的', '走路必备'], hints_en: ['Worn on feet', 'Essential for walking'],
    category_zh: '物品', category_en: 'Object',
  },
]

/** 随机打乱并取 N 个词 */
export function getWordSet(count = 10): DrawWord[] {
  const arr = [...WORDS]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
  }
  return arr.slice(0, count)
}

/** 搞笑猜对文案 */
export function getSuccessMessage(isEn: boolean): string {
  const zh = [
    '太强了！你是怎么从这团线条里认出来的？！',
    '对！AI 画得这么抽象你都能猜出来，你是 AI 的知音。',
    '正确！你的脑回路跟 AI 的审美完美匹配。',
    '恭喜！AI 表示：遇到懂我的人了！',
    '没错！看来你已经掌握了 AI 抽象艺术的鉴赏方法。',
    '666！这都认得出来，你是天才吧？',
  ]
  const en = [
    'Amazing! How did you recognize that from this mess of lines?!',
    'Correct! You and this AI share the same aesthetic wavelength.',
    'Yes! Your brain is perfectly synced with AI art logic.',
    'Congrats! The AI says: finally, someone who gets me!',
    'Right! You\'ve clearly mastered AI abstract art appreciation.',
    'Whoa! You actually saw it. That\'s impressive.',
  ]
  return zh[Math.floor(Math.random() * zh.length)]!
}

export function getFailMessage(answer: string, isEn: boolean): string {
  const zh = [
    `不对哦～正确答案是「${answer}」。AI 表示：我画的明明很像啊！`,
    `答案是「${answer}」！AI 说：你再仔细看看，这花纹明明就是${answer}的标志。`,
    `其实是「${answer}」啦。AI 委屈：是我画得太抽象了吗？`,
  ]
  const en = [
    `Nope! The answer is "${answer}". The AI insists: it looks exactly like one!`,
    `It was "${answer}"! The AI says: look closer, those squiggles are clearly ${answer}.`,
    `Actually "${answer}". The AI mutters: was my drawing too abstract?`,
  ]
  return zh[Math.floor(Math.random() * zh.length)]!
}

/** 结束称号 */
export function getFinalTitle(score: number, total: number, isEn: boolean): string {
  const ratio = score / total
  if (isEn) {
    if (ratio >= 0.9) return 'AI Art Whisperer 👁️'
    if (ratio >= 0.7) return 'Abstract Decoder 🧠'
    if (ratio >= 0.5) return 'Casual Guesser 🤔'
    return 'Needs More AI Art Training 📚'
  }
  if (ratio >= 0.9) return 'AI 灵魂画手鉴赏家 👁️'
  if (ratio >= 0.7) return '抽象艺术破译员 🧠'
  if (ratio >= 0.5) return '普通路人猜画家 🤔'
  return '还需多看 AI 画展 📚'
}
