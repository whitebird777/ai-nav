// AI 塔罗占卜 — 22 张大阿尔卡纳 + 解读生成

export interface TarotCard {
  id: number
  name_zh: string
  name_en: string
  image_url: string
  upright_zh: string
  upright_en: string
  reversed_zh: string
  reversed_en: string
}

export interface DrawnCard {
  card: TarotCard
  isUpright: boolean
}

const CARDS: TarotCard[] = [
  {
    id: 0,
    name_zh: '愚者',
    name_en: 'The Fool',
    image_url: 'https://picsum.photos/seed/tarot-fool/200/300',
    upright_zh: '新的开始，无限可能。勇敢迈出第一步，宇宙在为你让路。别想太多，干就完了。',
    upright_en: 'A new beginning full of possibility. Take the leap — the universe clears the path. Stop overthinking and just go.',
    reversed_zh: '你正在犹豫不决，想太多做太少。别让自己困在原地，有时候最傻的决定就是不决定。',
    reversed_en: 'Paralyzed by indecision. You\'re thinking more than doing. Sometimes the dumbest choice is making no choice at all.',
  },
  {
    id: 1,
    name_zh: '魔术师',
    name_en: 'The Magician',
    image_url: 'https://picsum.photos/seed/tarot-magician/200/300',
    upright_zh: '你拥有所需的一切技能和资源。现在就是行动的最佳时机，你的能力超乎想象。',
    upright_en: 'You have every tool and resource you need. Now is the perfect moment to act. Your abilities exceed your imagination.',
    reversed_zh: '你在浪费自己的天赋。要么是技能没点对方向，要么是在用高端操作做低端局。',
    reversed_en: 'You\'re wasting your talents. Either you aimed your skills at the wrong target, or you\'re playing beginner mode with pro-level abilities.',
  },
  {
    id: 2,
    name_zh: '女祭司',
    name_en: 'The High Priestess',
    image_url: 'https://picsum.photos/seed/tarot-priestess/200/300',
    upright_zh: '相信你的直觉。答案不在外面在内心。平静下来，你会听到灵魂的低语。',
    upright_en: 'Trust your intuition. Answers lie within, not without. Quiet your mind and hear the whisper of your soul.',
    reversed_zh: '你忽略了内心的声音，在意外界意见太多。别人说的都对，但你自己的呢？',
    reversed_en: 'Ignoring your inner voice while obsessing over outside opinions. Everyone else seems right — but what do YOU think?',
  },
  {
    id: 3,
    name_zh: '皇后',
    name_en: 'The Empress',
    image_url: 'https://picsum.photos/seed/tarot-empress/200/300',
    upright_zh: '丰盈、创造力、收获的季节。对自己好一点，该享受的时候就享受，你是值得被宠爱的。',
    upright_en: 'Abundance, creativity, harvest season. Be kind to yourself. You deserve to be spoiled — enjoy it.',
    reversed_zh: '你最近对自己太苛刻了。光顾着搬砖忘了浇水，记得给自己的花园也浇点水。',
    reversed_en: 'You\'ve been too harsh on yourself lately. Busy grinding while your inner garden is drying up. Water it.',
  },
  {
    id: 4,
    name_zh: '皇帝',
    name_en: 'The Emperor',
    image_url: 'https://picsum.photos/seed/tarot-emperor/200/300',
    upright_zh: '秩序、权威、掌控力。你是自己人生的 CEO，现在该制定计划并严格执行。',
    upright_en: 'Order, authority, control. You\'re the CEO of your life. Make a plan and execute it with discipline.',
    reversed_zh: '控制欲太强了！你连老天爷都想管一管。适当放手，不是所有事情都要你说了算。',
    reversed_en: 'Control freak alert! You want to micromanage the universe. Let go a little — not everything needs your sign-off.',
  },
  {
    id: 5,
    name_zh: '教皇',
    name_en: 'The Hierophant',
    image_url: 'https://picsum.photos/seed/tarot-hierophant/200/300',
    upright_zh: '传统、智慧、导师指引。找一位靠谱的人取取经，或者遵循已验证的规则行事。',
    upright_en: 'Tradition, wisdom, mentorship. Seek guidance from someone experienced, or follow the proven path.',
    reversed_zh: '规则是用来打破的。你需要的不是随大流，而是走一条属于自己的路，哪怕看起来很怪。',
    reversed_en: 'Rules are meant to be broken. You don\'t need to follow the herd — find your own path, even if it looks weird.',
  },
  {
    id: 6,
    name_zh: '恋人',
    name_en: 'The Lovers',
    image_url: 'https://picsum.photos/seed/tarot-lovers/200/300',
    upright_zh: '重要的选择即将来临，或者一段深厚的联结正在形成。跟随你的心，它会带你到对的地方。',
    upright_en: 'A major choice approaches, or a deep connection is forming. Follow your heart — it knows the way.',
    reversed_zh: '选择困难症发作。你在两条路之间反复横跳，但拖延本身就是一种选择。',
    reversed_en: 'Decision paralysis. You\'re bouncing between two paths, but procrastinating IS a choice — and usually the worst one.',
  },
  {
    id: 7,
    name_zh: '战车',
    name_en: 'The Chariot',
    image_url: 'https://picsum.photos/seed/tarot-chariot/200/300',
    upright_zh: '冲！胜利在望，凭意志力碾压一切障碍。你比想象中更强大，油门踩到底。',
    upright_en: 'Charge! Victory is in sight. Crush every obstacle with sheer willpower. You\'re stronger than you think — floor it.',
    reversed_zh: '你太急躁了，方向盘都快被你掰断了。慢下来，方向比速度更重要。',
    reversed_en: 'Too aggressive — you\'re about to snap the steering wheel. Slow down. Direction matters more than speed.',
  },
  {
    id: 8,
    name_zh: '力量',
    name_en: 'Strength',
    image_url: 'https://picsum.photos/seed/tarot-strength/200/300',
    upright_zh: '温柔而坚定的力量。真正的强大不是咆哮，而是用耐心和爱驯服内心的野兽。',
    upright_en: 'Gentle yet firm strength. True power isn\'t roaring — it\'s taming the inner beast with patience and love.',
    reversed_zh: '你觉得自己不够强大。但看看你走过的路，你已经比99%的人厉害了。别低估自己。',
    reversed_en: 'You feel weak. But look at how far you\'ve come — you\'re tougher than 99% of people. Stop underestimating yourself.',
  },
  {
    id: 9,
    name_zh: '隐士',
    name_en: 'The Hermit',
    image_url: 'https://picsum.photos/seed/tarot-hermit/200/300',
    upright_zh: '是时候独处和内省了。最好的答案会在安静的时刻浮现。关掉手机，跟自己聊聊。',
    upright_en: 'Time for solitude and introspection. The best answers emerge in quiet moments. Turn off your phone and talk to yourself.',
    reversed_zh: '你躲太久了！再宅下去就要发芽了。该出去见见阳光和朋友了，世界还在等你。',
    reversed_en: 'You\'ve been hiding too long! You\'re about to sprout roots. Get some sunlight and see your friends — the world is waiting.',
  },
  {
    id: 10,
    name_zh: '命运之轮',
    name_en: 'Wheel of Fortune',
    image_url: 'https://picsum.photos/seed/tarot-wheel/200/300',
    upright_zh: '命运正在转向你这边！好运将至，准备好接住天上掉下来的馅饼吧。',
    upright_en: 'Fate is turning in your favor! Good luck is coming. Get ready to catch whatever fortune drops from the sky.',
    reversed_zh: '最近的运气像是被水逆劫持了。但别慌，风水轮流转，低谷之后就是反弹。',
    reversed_en: 'Your luck seems to have been kidnapped by Mercury retrograde. Don\'t panic — the wheel always turns. After the dip comes the bounce.',
  },
  {
    id: 11,
    name_zh: '正义',
    name_en: 'Justice',
    image_url: 'https://picsum.photos/seed/tarot-justice/200/300',
    upright_zh: '公平的结果即将到来。你种下了什么种子就会收获什么果实。真相不会缺席。',
    upright_en: 'A fair outcome is coming. You reap what you sow. The truth may be late, but it never misses.',
    reversed_zh: '不公正的事让你心灰意懒。但记住，有些报应可能只是迟到了而已。',
    reversed_en: 'Injustice has you feeling defeated. But remember — some karma just runs on a delayed schedule.',
  },
  {
    id: 12,
    name_zh: '倒吊人',
    name_en: 'The Hanged Man',
    image_url: 'https://picsum.photos/seed/tarot-hanged/200/300',
    upright_zh: '换个角度看世界。暂停一下，你所需要的是一个全新的视角，而不是更努力地往前冲。',
    upright_en: 'See the world from a different angle. Pause. What you need isn\'t harder effort — it\'s a fresh perspective.',
    reversed_zh: '你已经吊够了，该行动了！别再自我牺牲式感动，该为自己做点什么了。',
    reversed_en: 'You\'ve been hanging long enough. Time to act! Stop the self-sacrificing martyr act — do something for yourself.',
  },
  {
    id: 13,
    name_zh: '死神',
    name_en: 'Death',
    image_url: 'https://picsum.photos/seed/tarot-death/200/300',
    upright_zh: '不是真的死！是旧的结束、新的开始。放手那些不再属于你的东西，新世界在等你。',
    upright_en: 'It\'s not actual death! An ending that makes room for the new. Let go of what no longer serves you — a new world awaits.',
    reversed_zh: '你死抓着过去不放。一段关系、一份工作、一个想法……该放手了，不然手上永远没空间接新的。',
    reversed_en: 'You\'re clinging to the past — a relationship, a job, an old story. Let go, or your hands will be too full to receive anything new.',
  },
  {
    id: 14,
    name_zh: '节制',
    name_en: 'Temperance',
    image_url: 'https://picsum.photos/seed/tarot-temperance/200/300',
    upright_zh: '平衡是关键词。不偏不倚，恰到好处。工作与生活、理性与感性，找到那个甜点。',
    upright_en: 'Balance is the keyword. Not too much, not too little. Work and life, logic and emotion — find the sweet spot.',
    reversed_zh: '你最近有点极端了。要么996不要命，要么躺平到发霉。调一调，人生不是过山车。',
    reversed_en: 'You\'ve been a bit extreme lately. Either grinding 24/7 or rotting in bed. Recalibrate — life isn\'t a roller coaster.',
  },
  {
    id: 15,
    name_zh: '恶魔',
    name_en: 'The Devil',
    image_url: 'https://picsum.photos/seed/tarot-devil/200/300',
    upright_zh: '你可能被某种东西绑住了——物欲、执念、有毒的关系。看清它，你其实是可以挣脱的。',
    upright_en: 'Something has you trapped — materialism, obsession, a toxic bond. Recognize it. You actually CAN break free.',
    reversed_zh: '恭喜！你正在挣脱束缚，放开让你上瘾的东西。这是最难的一步，你已经做到了。',
    reversed_en: 'Congrats! You\'re breaking your chains and releasing what addicted you. This is the hardest step, and you\'ve already taken it.',
  },
  {
    id: 16,
    name_zh: '高塔',
    name_en: 'The Tower',
    image_url: 'https://picsum.photos/seed/tarot-tower/200/300',
    upright_zh: '计划赶不上变化！一个意料之外的冲击即将打破现状。别怕，塌了的都是该塌的。',
    upright_en: 'Suddenly, chaos! An unexpected shock is about to shake things up. Don\'t fear it — whatever crumbles needed to fall.',
    reversed_zh: '你预感到了暴风雨但选择硬扛。逃避可耻但有用，有时候提前撤离才是明智的。',
    reversed_en: 'You saw the storm coming but chose to tough it out. Running is shameful but effective — sometimes evacuating early is the smart move.',
  },
  {
    id: 17,
    name_zh: '星星',
    name_en: 'The Star',
    image_url: 'https://picsum.photos/seed/tarot-star/200/300',
    upright_zh: '希望、治愈、灵感。黑暗中出现了光。你正在被宇宙温柔地眷顾着，保持信念。',
    upright_en: 'Hope, healing, inspiration. A light appears in the darkness. The universe is gently blessing you. Keep the faith.',
    reversed_zh: '你觉得希望渺茫。但星星只是被云遮住了，不是消失了。再坚持一下，天就要亮了。',
    reversed_en: 'You feel hopeless. But the stars are just behind the clouds, not gone. Hold on — dawn is almost here.',
  },
  {
    id: 18,
    name_zh: '月亮',
    name_en: 'The Moon',
    image_url: 'https://picsum.photos/seed/tarot-moon/200/300',
    upright_zh: '迷雾重重，你看到的未必是真相。相信直觉，小心脚下的路，幻觉和现实只有一线之隔。',
    upright_en: 'Thick fog ahead — what you see may not be real. Trust your gut, watch your step. Illusion and reality are a hair\'s breadth apart.',
    reversed_zh: '迷雾正在散去。你之前的焦虑和困惑即将找到答案，真相马上浮出水面。',
    reversed_en: 'The fog is lifting. The anxiety and confusion you\'ve been feeling — answers are surfacing. Truth is about to emerge.',
  },
  {
    id: 19,
    name_zh: '太阳',
    name_en: 'The Sun',
    image_url: 'https://picsum.photos/seed/tarot-sun/200/300',
    upright_zh: '全场最佳！这是塔罗中最积极的一张牌。成功、活力、幸福正在向你狂奔而来。',
    upright_en: 'MVP card! This is the most positive card in all of tarot. Success, vitality, happiness — all sprinting towards you.',
    reversed_zh: '太阳被云遮了一点点，好事还是会来，只是比预期的慢一些。好饭不怕晚。',
    reversed_en: 'The sun is slightly clouded. Good things are still coming, just a bit later than expected. A good meal is worth the wait.',
  },
  {
    id: 20,
    name_zh: '审判',
    name_en: 'Judgement',
    image_url: 'https://picsum.photos/seed/tarot-judgement/200/300',
    upright_zh: '觉醒的时刻到了。你被召唤去做一件重要的事。回应它，不要假装没听见。',
    upright_en: 'Wake-up call. You\'re being summoned for something important. Answer it — don\'t pretend you didn\'t hear.',
    reversed_zh: '你在逃避内心的召唤。是害怕失败还是害怕成功？无论是哪个，你都欠自己一个机会。',
    reversed_en: 'You\'re dodging an inner calling. Afraid of failure or afraid of success? Either way, you owe yourself a shot.',
  },
  {
    id: 21,
    name_zh: '世界',
    name_en: 'The World',
    image_url: 'https://picsum.photos/seed/tarot-world/200/300',
    upright_zh: '圆满！一个周期的完美完结。你做到了。庆祝吧，然后准备开启下一个篇章。',
    upright_en: 'Completion! The perfect end of a cycle. You did it. Celebrate — then get ready for the next chapter.',
    reversed_zh: '马上就到终点了但你停下了。别在最后一步放弃，你离大圆满只差临门一脚。',
    reversed_en: 'You\'re inches from the finish line but you stopped. Don\'t quit on the last step — you\'re one kick away from the goal.',
  },
]

/** 洗牌：乱序排列 */
export function shuffleCards(): TarotCard[] {
  const arr = [...CARDS]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
  }
  return arr
}

/** 抽 3 张牌，随机正逆位 */
export function drawCards(count = 3): DrawnCard[] {
  const shuffled = shuffleCards()
  return shuffled.slice(0, count).map((card) => ({
    card,
    isUpright: Math.random() > 0.35, // 65% 正位, 35% 逆位
  }))
}

/** 位置名称 */
export function getPositionName(index: number, isEn: boolean): string {
  if (isEn) {
    return ['Past', 'Present', 'Future'][index] ?? `Card ${index + 1}`
  }
  return ['过去', '现在', '未来'][index] ?? `第${index + 1}张`
}

/** 随机占卜问题 */
export function getRandomQuestion(isEn: boolean): string {
  const zh = [
    '我最近的事业运怎么样？',
    '我和TA能走到最后吗？',
    '我该不该换工作？',
    '今年的财运如何？',
    '我的下一段恋情什么时候来？',
    '我最近有什么需要警惕的事？',
    '我适合创业还是打工？',
    '今年的桃花运怎么样？',
    '我和朋友的关系会好转吗？',
    '未来三个月有没有惊喜等着我？',
    '现在迷茫了，给我指个方向。',
    '我该不该去那个城市发展？',
  ]
  const en = [
    'How\'s my career luck lately?',
    'Will me and my partner make it?',
    'Should I change jobs?',
    'How\'s my financial luck this year?',
    'When will my next love come?',
    'Is there anything I should watch out for?',
    'Am I better off starting a business or working a job?',
    'How\'s my romantic luck this year?',
    'Will things get better between me and my friend?',
    'Any surprises coming in the next 3 months?',
    'I\'m lost. Point me in a direction.',
    'Should I move to that city?',
  ]
  const pool = isEn ? en : zh
  return pool[Math.floor(Math.random() * pool.length)]!
}

/** 生成 AI 解读 */
export function generateReading(
  question: string,
  drawnCards: DrawnCard[],
  isEn: boolean
): { intro: string; readings: string[]; summary: string } {
  const positions = drawnCards.map((_, i) => getPositionName(i, isEn))

  const intro = isEn
    ? `You asked: "${question}". The three cards have been drawn. Let me interpret what the universe is whispering to you... 🔮`
    : `你问的是：「${question}」。三张牌已经为你翻开，让我来解读宇宙对你发出的暗号…… 🔮`

  const readings = drawnCards.map((dc, i) => {
    const name = isEn ? dc.card.name_en : dc.card.name_zh
    const pos = positions[i]!
    const meaning = dc.isUpright
      ? (isEn ? dc.card.upright_en : dc.card.upright_zh)
      : (isEn ? dc.card.reversed_en : dc.card.reversed_zh)
    const orientation = dc.isUpright
      ? (isEn ? '(Upright)' : '（正位）')
      : (isEn ? '(Reversed)' : '（逆位）')

    return isEn
      ? `Card ${i + 1} — ${pos}: **${name}** ${orientation}\n${meaning}`
      : `第${i + 1}张 — ${pos}：**${name}** ${orientation}\n${meaning}`
  })

  // 生成总结
  const firstCard = drawnCards[0]!
  const lastCard = drawnCards[2]!
  const uprightCount = drawnCards.filter((d) => d.isUpright).length

  let summary: string
  if (isEn) {
    const mood =
      uprightCount >= 2
        ? 'the cards lean favorably! The overall energy is positive'
        : 'there\'s some turbulence in the cards. But turbulence is just growth in disguise'
    const advice =
      lastCard.isUpright
        ? `Your future card — ${lastCard.card.name_en} in upright position — tells me good things are heading your way. Stay open and keep moving forward.`
        : `Your future card — ${lastCard.card.name_en} reversed — suggests a challenge ahead, but you already have the tools from your past card (${firstCard.card.name_en}) to handle it.`
    const closer = [
      'Remember: the cards only point the way. The choice is always yours. ✨',
      'Tarot is like GPS — it shows the road, but you\'re still the driver. 🚗',
      'Fate is just probability with better branding. You write your own story. 📖',
      'The universe is big, but so is your potential. Go make it happen! 🌌',
    ]
    summary = `${mood}. ${advice}\n\n${closer[Math.floor(Math.random() * closer.length)]!}`
  } else {
    const mood =
      uprightCount >= 2
        ? '整体来看牌面偏暖，宇宙给你的信号还算友好'
        : '牌面有些波澜，但波澜本身就是成长的另一种写法'
    const advice =
      lastCard.isUpright
        ? `你的未来牌 —— ${lastCard.card.name_zh}（正位）—— 告诉你前方有好消息等着你。保持开放的心态，大胆往前走。`
        : `你的未来牌 —— ${lastCard.card.name_zh}（逆位）—— 提示前方有些小波折，但你从过去的牌（${firstCard.card.name_zh}）里获得的启示足以应对。`
    const closer = [
      '记住：塔罗只是指路的灯，走路的人还是你自己。✨',
      '塔罗就像高德地图——指路的是它，但开车的是你。🚗',
      '命运不过是包装得更体面的概率论。好命是自己闯出来的。📖',
      '宇宙很大，你的潜力更大。去搞事情吧！🌌',
    ]
    summary = `${mood}。${advice}\n\n${closer[Math.floor(Math.random() * closer.length)]!}`
  }

  return { intro, readings, summary }
}
