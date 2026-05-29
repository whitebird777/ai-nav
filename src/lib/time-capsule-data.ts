// AI 时间胶囊 — 语料库
// 基于情绪生成：未来信 + 封印文案 + 情绪回应

export type Mood = '期待' | '迷茫' | '坚定' | '感恩' | '遗憾' | '热血'

export const MOODS: { value: Mood; label: string; label_en: string; emoji: string }[] = [
  { value: '期待', label: '期待', label_en: 'Hopeful', emoji: '🌟' },
  { value: '迷茫', label: '迷茫', label_en: 'Lost', emoji: '🌫️' },
  { value: '坚定', label: '坚定', label_en: 'Determined', emoji: '💪' },
  { value: '感恩', label: '感恩', label_en: 'Grateful', emoji: '🙏' },
  { value: '遗憾', label: '遗憾', label_en: 'Regretful', emoji: '🌙' },
  { value: '热血', label: '热血', label_en: 'Fired Up', emoji: '🔥' },
]

interface CapsuleTemplates {
  letters: string[][]
  seals: string[][]
  responses: string[][]
}

const TEMPLATES: Record<Mood, CapsuleTemplates> = {
  '期待': {
    letters: [
      [
        '致未来的你：\n\n当你读到这封信时，时间已经向前走了很远。现在的你，是否已经到达了当初向往的那个地方？\n\n我相信你会的。因为你一直在路上。\n\n记住此刻的期待——它是最纯粹的燃料。\n\n—— 来自过去的你',
        "To the future you:\n\nWhen you read this, time has traveled far. Have you reached the place you once dreamed of?\n\nI believe you have. Because you've always been on the way.\n\nRemember this anticipation — it's the purest fuel.\n\n— From your past self",
      ],
      [
        '嘿，未来的自己：\n\n不知道你现在过得怎么样。但我希望当你看到这些话的时候，嘴角是上扬的。\n\n此刻的我，正满怀期待地想象着你。请别让我失望。\n\n世界很大，但你也很强。\n\n—— 过去的你 留',
        "Hey future self:\n\nI wonder how you're doing. I hope when you read these words, you're smiling.\n\nRight now, I'm imagining you with full of hope. Please don't let me down.\n\nThe world is vast, but so are you.\n\n— Your past self",
      ],
    ],
    seals: [
      ['✦ 此信封印于时间折叠之处 ✦\n待星辰归位之日，自会开启', '✦ Sealed where time folds ✦\nTo open when the stars align'],
      ['⏳ 时空管理局 · 第 7 号胶囊\n加密等级：S级 · 仅限收件人开启', '⏳ Temporal Bureau · Capsule No.7\nClearance: S-Class · Recipient Only'],
    ],
    responses: [
      ['我感受到了你的期待。它像一道光，穿透时间的迷雾。\n\n这个胶囊已经封存。当你准备好的时候，未来会给你答案。\n\n现在，继续向前走吧。✨', "I feel your anticipation. It's like a light piercing through the fog of time.\n\nThis capsule is sealed. When you're ready, the future will answer.\n\nNow, keep moving forward. ✨"],
      ['你的眼神里有星星。\n\n我已经把这份期待加密存储在了时间的深处。等到那一天——\n\n你会发现，所有的等待都是值得的。', "There are stars in your eyes.\n\nI've encrypted this anticipation deep in time. When that day comes—\n\nYou'll find every wait was worth it."],
    ],
  },
  '迷茫': {
    letters: [
      [
        '致未来的你：\n\n现在的我很迷茫。不知道该往哪走，不知道该选什么。\n\n但我相信时间会给出答案。\n\n我希望未来的你，回头看时，能对我笑一笑。说一句：没事，你走对了。\n\n—— 来自迷雾中的你',
        "To the future you:\n\nI'm lost right now. Don't know which way to go, what to choose.\n\nBut I trust time will give answers.\n\nI hope when you look back, you'll smile at me and say: It's okay, you chose right.\n\n— From you in the fog",
      ],
    ],
    seals: [
      ['🌫️ 封存于迷雾纪元\n待云开雾散之日，胶囊自解', '🌫️ Sealed in the Era of Fog\nTo dissolve when the clouds part'],
    ],
    responses: [
      ['迷茫不是坏事。它意味着你在思考，在寻找，在拒绝随波逐流。\n\n这封信会穿越迷雾，抵达那个已经找到方向的你手中。\n\n在那之前——迷茫也是前进的一部分。🌫️', "Being lost isn't bad. It means you're thinking, searching, refusing to drift.\n\nThis letter will travel through the fog to reach the you who has found direction.\n\nUntil then — being lost is part of moving forward. 🌫️"],
    ],
  },
  '坚定': {
    letters: [
      [
        '致未来的你：\n\n我现在的信念像一块石头，沉在心底，不会漂走。\n\n不管前面是什么，我会走下去。\n\n希望未来的你，比现在更坚定。但如果你累了，可以歇一歇。你已经做得很好了。\n\n—— 来自正在咬牙坚持的你',
        "To the future you:\n\nMy conviction now is like a stone, sunk deep, won't drift away.\n\nWhatever lies ahead, I'll walk on.\n\nI hope you're even stronger. But if you're tired, rest. You've done well.\n\n— From you, grinding through",
      ],
    ],
    seals: [
      ['💎 意志结晶体 · 封印完成\n此胶囊由纯粹的决心构成', '💎 Will Crystallized · Seal Complete\nThis capsule is forged of pure resolve'],
    ],
    responses: [
      ['我看见了。你眼中的火焰，不会轻易熄灭。\n\n这种坚定，会被时间压缩成钻石。当未来的你打开它——\n\n你会发现，你比自己想象的更强大。💪', "I see it. The fire in your eyes won't easily go out.\n\nThis determination will be compressed into diamond by time. When you open it—\n\nYou'll find you're stronger than you ever imagined. 💪"],
    ],
  },
  '感恩': {
    letters: [
      [
        '致未来的你：\n\n我想对你说一声谢谢。谢谢你成为了现在的我。\n\n也请你谢谢此刻的我——因为我正在努力成为你。\n\n生命中的每一份善意，都值得被铭记。\n\n—— 来自心怀感激的你',
        "To the future you:\n\nI want to say thank you. Thank you for becoming who I am now.\n\nPlease also thank me — because I'm working hard to become you.\n\nEvery kindness in life is worth remembering.\n\n— From your grateful self",
      ],
    ],
    seals: [
      ['🙏 感恩之光 · 封印于此\n此胶囊由善意与温暖编织而成', '🙏 Light of Gratitude · Sealed Here\nThis capsule is woven from kindness and warmth'],
    ],
    responses: [
      ['感恩是最温柔的力量。\n\n你的心意会被时间珍藏。当未来的你打开这封信——\n\n它会像一束光，照亮那个瞬间。🙏', "Gratitude is the gentlest power.\n\nYour heart will be treasured by time. When you open this—\n\nIt will shine like a beam of light. 🙏"],
    ],
  },
  '遗憾': {
    letters: [
      [
        '致未来的你：\n\n有些事我没做好，有些话我没说出口。\n\n但我不后悔——因为每一个遗憾，都让我成为了现在的我。\n\n希望未来的你，已经和这些遗憾和解了。\n\n—— 来自正在学着放下的你',
        "To the future you:\n\nSome things I didn't do well, some words I never said.\n\nBut I don't regret them — every regret shaped who I am.\n\nI hope you've made peace with them by now.\n\n— From you, learning to let go",
      ],
    ],
    seals: [
      ['🌙 月下的遗憾 · 已封印\n时间会把它变成琥珀', '🌙 Regret Under the Moon · Sealed\nTime will turn it into amber'],
    ],
    responses: [
      ['遗憾是时间的琥珀。它在当下很重，在未来很美。\n\n把这份遗憾封存在这里吧。当你再打开时——\n\n你会发现，它已经变成了一颗温柔的珍珠。🌙', "Regret is time's amber. Heavy now, beautiful later.\n\nSeal it here. When you open it again—\n\nYou'll find it's become a gentle pearl. 🌙"],
    ],
  },
  '热血': {
    letters: [
      [
        '致未来的你：\n\n燃烧吧！不要停！\n\n此刻的我觉得整个世界都是我的舞台。我希望未来的你，没有被生活磨平棱角。\n\n你还是那个敢想敢干的少年吗？\n\n—— 来自正在燃烧的你',
        "To the future you:\n\nBurn! Don't stop!\n\nRight now I feel like the whole world is my stage. I hope you haven't been dulled by life.\n\nAre you still that fearless kid who dares to dream?\n\n— From you, on fire",
      ],
    ],
    seals: [
      ['🔥 热血封印 · 第 1 号战斗胶囊\n警告：开启时请确保心率正常', '🔥 Fired Up · Combat Capsule No.1\nWarning: Ensure stable heart rate before opening'],
    ],
    responses: [
      ['我感受到了你的能量！🔥\n\n这种热血不会消失——它只是被暂时封存，等待爆发的那一天。\n\n当未来的你打开它，你会重新点燃此刻的火焰。\n\n冲吧，世界是你的！', "I feel your energy! 🔥\n\nThis fire won't disappear — it's just temporarily sealed, waiting to erupt.\n\nWhen you open it, you'll rekindle this very flame.\n\nGo! The world is yours!"],
    ],
  },
}

function pick(arr: string[][]): [string, string] {
  const idx = Math.floor(Math.random() * arr.length)
  return [arr[idx][0], arr[idx][1]]
}

export interface CapsuleContent {
  letterZh: string
  letterEn: string
  sealZh: string
  sealEn: string
  responseZh: string
  responseEn: string
}

export function generateCapsule(mood: Mood): CapsuleContent {
  const t = TEMPLATES[mood]
  const [letterZh, letterEn] = t.letters[Math.floor(Math.random() * t.letters.length)]
  const [sealZh, sealEn] = t.seals[Math.floor(Math.random() * t.seals.length)]
  const [responseZh, responseEn] = t.responses[Math.floor(Math.random() * t.responses.length)]

  return { letterZh, letterEn, sealZh, sealEn, responseZh, responseEn }
}
