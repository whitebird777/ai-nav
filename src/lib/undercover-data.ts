// AI 谁是卧底 — 词库 + AI 描述生成

export interface WordPair {
  civilian_zh: string
  spy_zh: string
  civilian_en: string
  spy_en: string
}

export type PlayerRole = 'civilian' | 'spy'

export interface GameState {
  wordPair: WordPair
  playerRole: PlayerRole
  spyIndex: number // 0=Player, 1=AI1, 2=AI2
  rounds: RoundData[]
}

export interface RoundData {
  round: number
  descriptions: [string, string, string] // [player, AI1, AI2]
}

// ==================== 词库 (10 组) ====================
const WORD_PAIRS: WordPair[] = [
  { civilian_zh: '苹果', spy_zh: '梨', civilian_en: 'Apple', spy_en: 'Pear' },
  { civilian_zh: '猫', spy_zh: '狗', civilian_en: 'Cat', spy_en: 'Dog' },
  { civilian_zh: '可乐', spy_zh: '雪碧', civilian_en: 'Cola', spy_en: 'Sprite' },
  { civilian_zh: '篮球', spy_zh: '足球', civilian_en: 'Basketball', spy_en: 'Soccer' },
  { civilian_zh: '手机', spy_zh: '平板', civilian_en: 'Phone', spy_en: 'Tablet' },
  { civilian_zh: '夏天', spy_zh: '春天', civilian_en: 'Summer', spy_en: 'Spring' },
  { civilian_zh: '牛奶', spy_zh: '豆浆', civilian_en: 'Milk', spy_en: 'Soy Milk' },
  { civilian_zh: '火锅', spy_zh: '烧烤', civilian_en: 'Hot Pot', spy_en: 'BBQ' },
  { civilian_zh: '飞机', spy_zh: '高铁', civilian_en: 'Airplane', spy_en: 'Bullet Train' },
  { civilian_zh: '医生', spy_zh: '护士', civilian_en: 'Doctor', spy_en: 'Nurse' },
]

// ==================== AI 描述模板 ====================
const CIVILIAN_TEMPLATES_ZH = [
  '这个东西…第一反应就是它，太经典了。',
  '我第一个想到的就是这个，应该没错吧？',
  '大家应该都接触过，我就不多说了。',
  '怎么说呢…它给我一种很舒服的感觉。',
  '生活中还挺常见的，不用解释吧。',
  '我觉得我这个词跟大家的应该一样…（心虚）',
  '它有一个很明显的特征，但我不能直接说。',
  '说太多容易暴露，点到为止哈。',
  '嗯…有种只可意会不可言传的感觉。',
  '你们应该都猜到了吧，我感觉挺明显的。',
  '这个东西对我挺重要的，懂得都懂。',
  '我每次见到它都有一种很特别的感觉。',
  '从我的角度来看，它还是挺好认的。',
  '反正就是那种…嗯，你们自己想吧。',
  '我相信大家跟我想的是一样的。',
  '不好说太多，说多了就违规了。',
  '特征很明显，但我嘴笨描述不出来。',
  '我觉得我们说的应该是同一个东西。',
  '大概就那样吧，很常见的。',
  '我的描述到此为止，下一轮再说。',
]

const CIVILIAN_TEMPLATES_EN = [
  'First thing that came to mind — it\'s a classic.',
  'Pretty sure everyone knows what I\'m talking about.',
  'It gives me a really comfortable vibe.',
  'You see this everywhere, no need to explain.',
  'There\'s an obvious feature, but I can\'t say it directly.',
  'Saying too much would be risky. I\'ll leave it there.',
  'Hard to put into words... you just know it.',
  'I bet you all guessed mine already.',
  'This thing means a lot to me personally.',
  'Every time I see it, it feels special.',
  'From my perspective, it\'s pretty recognizable.',
  'I think we\'re all describing the same thing... hopefully.',
  'Can\'t say more without breaking the rules.',
  'Very common, very familiar. Moving on.',
  'I trust everyone knows what this is.',
]

const SPY_TEMPLATES_ZH = [
  '嗯…我觉得它的颜色挺特别的…等一下，我说了颜色吗？',
  '这个东西吧…怎么说呢，形状上不太一样…算了当我没说。',
  '我感觉我这个词跟大家的不太一样，但可能是我多想了。',
  '它…闻起来不…不是，我是说感觉上…（慌张）',
  '我觉得大家都说得很对！我跟你们是一样的！（坚定）',
  '等等，让我重新组织一下语言…刚才的不算。',
  '它的大小…不对，我不是那个意思。',
  '嗯对，就是刚才他说的那样，我没补充了。',
  '这个东西摸起来…哦不对，不能这么描述。',
  '我的应该跟你们一样…吧？（心虚地看别人）',
]

const SPY_TEMPLATES_EN = [
  'Umm... its color is kind of special... wait, did I say color?',
  'This thing... how to put it... the shape is a bit different... never mind.',
  'I feel like my word might be different, but maybe I\'m overthinking.',
  'It... smells... no, I mean it feels... (panicking)',
  'I totally agree with everyone! Mine is the same! (nervous)',
  'Wait, let me rephrase that... forget what I just said.',
  'Its size is... no, that\'s not what I meant.',
  'Yeah, just like they said. Nothing to add.',
  'When you touch it... oh wait, can\'t describe that way.',
  'Mine should be the same as yours... right? (looking around nervously)',
]

// ==================== 工具函数 ====================

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

export function getRandomWordPair(): WordPair {
  return pick(WORD_PAIRS)
}

function getCivilianDesc(isEn: boolean): string {
  return pick(isEn ? CIVILIAN_TEMPLATES_EN : CIVILIAN_TEMPLATES_ZH)
}

function getSpyDesc(isEn: boolean): string {
  return pick(isEn ? SPY_TEMPLATES_EN : SPY_TEMPLATES_ZH)
}

function getSpyTypo(isEn: boolean): string {
  const zh = [
    '其实我也觉得有点不对劲，你们说的跟我的不一样。算了，可能是我想多了。',
    '我仔细想了一下，好像我的这个词跟大家的不太一致…',
    '呃，我可能暴露了。但没关系，我还是坚持我的判断！',
  ]
  const en = [
    'Actually, I feel like something\'s off. Your descriptions don\'t quite match mine. Maybe I\'m overthinking.',
    'After thinking about it... I think my word might be different from yours.',
    'Uh, I might have blown my cover. But whatever, I\'m sticking to my story!',
  ]
  return pick(isEn ? en : zh)
}

/** 生成一轮 AI 描述 (返回 AI1 和 AI2 的描述) */
export function generateAIDescriptions(
  spyIndex: number,
  round: number,
  isEn: boolean
): [string, string] {
  const desc1 =
    spyIndex === 1
      ? round >= 3 && Math.random() > 0.5
        ? getSpyTypo(isEn) // 后期卧底可能露馅
        : Math.random() > 0.55
          ? getSpyDesc(isEn)
          : getCivilianDesc(isEn)
      : getCivilianDesc(isEn)

  const desc2 =
    spyIndex === 2
      ? round >= 3 && Math.random() > 0.5
        ? getSpyTypo(isEn)
        : Math.random() > 0.55
          ? getSpyDesc(isEn)
          : getCivilianDesc(isEn)
      : getCivilianDesc(isEn)

  return [desc1, desc2]
}

/** AI 投票: 返回 AI 认为谁是卧底 (0=Player, 1=AI1, 2=AI2) */
export function aiVote(spyIndex: number, isPlayerSpy: boolean): { ai1Vote: number; ai2Vote: number } {
  if (isPlayerSpy) {
    // 玩家是卧底时 AI 投票 — 有一定概率发现
    const caught = Math.random() > 0.4
    if (caught) {
      return { ai1Vote: 0, ai2Vote: 0 } // 两个 AI 都发现玩家
    }
    // 一个发现一个没发现
    if (Math.random() > 0.5) {
      return { ai1Vote: 0, ai2Vote: spyIndex === 2 ? 0 : 2 }
    }
    return { ai1Vote: spyIndex === 1 ? 0 : 1, ai2Vote: 0 }
  } else {
    // 玩家是平民，AI 平民投票
    const correctVote = Math.random() > 0.35
    const wrongTarget = spyIndex === 1 ? 2 : 1
    if (correctVote || Math.random() > 0.6) {
      return { ai1Vote: spyIndex, ai2Vote: spyIndex }
    }
    return { ai1Vote: wrongTarget, ai2Vote: spyIndex } // 一个对，一个错
  }
}

/** 结果称号 */
export function getResultTitle(
  playerRole: PlayerRole,
  playerWon: boolean,
  isEn: boolean
): string {
  if (isEn) {
    if (playerRole === 'spy' && playerWon) return 'Master of Deception 🎭'
    if (playerRole === 'spy' && !playerWon) return 'Exposed Spy 😅'
    if (playerRole === 'civilian' && playerWon) return 'Elite Detective 🔍'
    return 'Wrongly Accused 😵'
  }
  if (playerRole === 'spy' && playerWon) return '影帝级卧底 🎭'
  if (playerRole === 'spy' && !playerWon) return '露馅的卧底 😅'
  if (playerRole === 'civilian' && playerWon) return '火眼金睛 🔍'
  return '冤枉了好人 😵'
}

export function getResultMessage(
  playerRole: PlayerRole,
  playerWon: boolean,
  wordPair: WordPair,
  isEn: boolean
): string {
  if (isEn) {
    const cw = wordPair.civilian_en
    const sw = wordPair.spy_en
    if (playerRole === 'spy') {
      return playerWon
        ? `You were the spy with "${sw}" while others had "${cw}" — and you got away with it! Your poker face is legendary.`
        : `You were the spy with "${sw}". The civilians had "${cw}". Your cover was blown — better luck next time, agent.`
    }
    return playerWon
      ? `You found the spy! The civilians had "${cw}" and the spy tried to hide with "${sw}". Justice is served!`
      : `You voted wrong! The spy had "${sw}" while you and the other civilian shared "${cw}". The spy is still at large!`
  }
  const cw = wordPair.civilian_zh
  const sw = wordPair.spy_zh
  if (playerRole === 'spy') {
    return playerWon
      ? `你是卧底！你的词是「${sw}」，平民的词是「${cw}」——你成功骗过了所有人！演技能拿奥斯卡了。`
      : `你是卧底！你的词是「${sw}」，平民的词是「${cw}」——你的身份暴露了！下次伪装得更深一点吧。`
  }
  return playerWon
    ? `你找到了卧底！平民词是「${cw}」，卧底拿着「${sw}」想蒙混过关——被你的火眼金睛识破了！`
    : `你投错了！平民词是「${cw}」，卧底拿着「${sw}」成功潜伏——真正的卧底还在逍遥法外！`
}
