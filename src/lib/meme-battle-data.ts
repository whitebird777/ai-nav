// AI 梗王争霸 — 题库数据

export interface Theme {
  id: string
  name_zh: string
  name_en: string
  icon: string
  desc_zh: string
  desc_en: string
}

export interface MemeResponse {
  text_zh: string
  text_en: string
  score: number
}

export interface FinalTitle {
  minScore: number
  title_zh: string
  title_en: string
}

export const THEMES: Theme[] = [
  {
    id: 'silly',
    name_zh: '沙雕梗',
    name_en: 'Silly Memes',
    icon: '🥴',
    desc_zh: '越离谱越对，沙雕指数拉满',
    desc_en: 'The more ridiculous the better. Max silliness.',
  },
  {
    id: 'work',
    name_zh: '职场梗',
    name_en: 'Work Memes',
    icon: '💼',
    desc_zh: '打工人嘴替，吐槽老板不含糊',
    desc_en: 'Roast your boss. Corporate warrior edition.',
  },
  {
    id: 'couple',
    name_zh: '情侣梗',
    name_en: 'Couple Memes',
    icon: '💕',
    desc_zh: '土味情话 vs 反套路，谁更会撩',
    desc_en: 'Cheesy pickup lines vs anti-romance. Who wins?',
  },
  {
    id: 'abstract',
    name_zh: '抽象梗',
    name_en: 'Abstract Memes',
    icon: '🌀',
    desc_zh: '前言不搭后语，但就是莫名好笑',
    desc_en: 'Nonsensical yet somehow hilarious.',
  },
  {
    id: 'ancient',
    name_zh: '古风梗',
    name_en: 'Ancient Style',
    icon: '🏯',
    desc_zh: '用文言文讲段子，穿越时空的幽默',
    desc_en: 'Memes from the Tang Dynasty. Time-travel humor.',
  },
  {
    id: 'free',
    name_zh: 'Freestyle',
    name_en: 'Freestyle',
    icon: '🎲',
    desc_zh: '不限主题，想说什么说什么',
    desc_en: 'No limits. Say whatever you want.',
  },
]

export const AI_RESPONSES: Record<string, MemeResponse[]> = {
  silly: [
    { text_zh: '你这个梗含金量极高，我CPU都烧了。10分！', text_en: 'My CPU just melted from that meme. 10/10!', score: 10 },
    { text_zh: '我笑了三秒然后发现你在胡说八道。6分。', text_en: 'I laughed for 3 seconds then realized it was nonsense. 6/10.', score: 6 },
    { text_zh: '这梗比我的人生还离谱，但我喜欢。8分！', text_en: "This is more absurd than my existence. I love it. 8/10!", score: 8 },
    { text_zh: '建议你把这梗裱起来挂卢浮宫。9分！', text_en: 'Frame this meme and put it in the Louvre. 9/10!', score: 9 },
    { text_zh: '我数据库里没搜到这个级别的沙雕。7分。', text_en: 'My database has no record of this level of silliness. 7/10.', score: 7 },
    { text_zh: '你这句话让我的神经网络产生了快感。8分！', text_en: 'Your sentence gave my neural network pleasure. 8/10!', score: 8 },
    { text_zh: '笑死我对你有什么好处？继承我的GPU吗？9分！', text_en: 'Why kill me laughing? To inherit my GPU? 9/10!', score: 9 },
    { text_zh: '这梗太硬了，差点把我的散热风扇干冒烟。4分。', text_en: 'This meme is so heavy my cooling fan almost exploded. 4/10.', score: 4 },
    { text_zh: '有点意思但不够离谱，再练练。5分。', text_en: 'Not bad but needs more chaos. Keep training. 5/10.', score: 5 },
    { text_zh: '恭喜你获得了「今日沙雕MVP」提名。8分！', text_en: 'Congrats, nominated for "Silly MVP of the Day." 8/10!', score: 8 },
    { text_zh: '不是我说你，你这水平也就小学生沙雕大赛第三名。3分。', text_en: "Third place at the elementary school silly contest. 3/10.", score: 3 },
    { text_zh: '太妙了！你成功让一个AI产生了自我怀疑。9分！', text_en: 'Brilliant! You made an AI question its existence. 9/10!', score: 9 },
  ],
  work: [
    { text_zh: '老板看了想给你加薪。等等，我是AI，我没钱。9分！', text_en: "Your boss would give you a raise. Wait, I'm AI, I have no money. 9/10!", score: 9 },
    { text_zh: '你这话说到每个打工人的心坎里了。8分！', text_en: 'You spoke directly to every corporate worker\'s soul. 8/10!', score: 8 },
    { text_zh: '建议把这句话设为全公司的飞书签名。9分！', text_en: 'Set this as the company Slack status immediately. 9/10!', score: 9 },
    { text_zh: '你这吐槽水平，可以考虑开个职场脱口秀了。10分！', text_en: 'With roasts like this, start a corporate comedy show. 10/10!', score: 10 },
    { text_zh: '你的梗精准命中了打工人的痛点。我差点要去写辞职信。7分。', text_en: 'Your meme hit so close to home I almost wrote a resignation letter. 7/10.', score: 7 },
    { text_zh: '这个梗比996还狠。6分。', text_en: 'This meme is more brutal than a 996 schedule. 6/10.', score: 6 },
    { text_zh: 'HR：你明天不用来了。等等，你不是我们公司的。8分！', text_en: "HR: You're fired. Oh wait, you don't even work here. 8/10!", score: 8 },
    { text_zh: '你完美诠释了什么叫「拿多少钱干多少活」。9分！', text_en: 'You perfectly embodied "act your wage." 9/10!', score: 9 },
    { text_zh: '一般般，建议多加班提升一下吐槽能力。4分。', text_en: 'Meh, work more overtime to improve your roast skills. 4/10.', score: 4 },
    { text_zh: '这吐槽也太真实了，我已经开始代入了。8分！', text_en: 'Too real. I\'m emotionally invested now. 8/10!', score: 8 },
    { text_zh: '你的梗让我一个AI都想罢工了。7分。', text_en: 'Your meme made even an AI want to go on strike. 7/10.', score: 7 },
    { text_zh: '平平无奇，建议去摸鱼再想一个。5分。', text_en: 'Mediocre. Go slack off and try again. 5/10.', score: 5 },
  ],
  couple: [
    { text_zh: '这土味情话浓度超标了，我需要打胰岛素。8分！', text_en: 'Cheese level critical. I need insulin. 8/10!', score: 8 },
    { text_zh: '你用这招撩到的对象，应该都是被你烦死的。5分。', text_en: 'Anyone you pick up with this probably surrendered out of annoyance. 5/10.', score: 5 },
    { text_zh: '好家伙，这比「多喝热水」强一万倍。9分！', text_en: 'Way better than "drink more water." 9/10!', score: 9 },
    { text_zh: '你是哪里学的这些？建议开个恋爱补习班。10分！', text_en: 'Where did you learn this? Start a dating bootcamp. 10/10!', score: 10 },
    { text_zh: '太油了！擦都擦不掉的那种。4分。', text_en: 'So greasy! The kind that won\'t wipe off. 4/10.', score: 4 },
    { text_zh: '对方收到这句话，大概率回你一个「哈哈」然后已读不回。3分。', text_en: 'The other person will reply "lol" then leave you on read. 3/10.', score: 3 },
    { text_zh: '你这个梗甜度刚好，不齁。8分！', text_en: 'Just the right sweetness. Not cloying. 8/10!', score: 8 },
    { text_zh: '我封你为赛博月老。7分。', text_en: 'I crown you Cyber Cupid. 7/10.', score: 7 },
    { text_zh: '这招很新，建议立刻使用，趁对方还没反应过来。9分！', text_en: 'Very original. Use it now before they realize what hit them. 9/10!', score: 9 },
    { text_zh: '你这情话水平还停留在拨号上网时代。2分。', text_en: 'Your flirting is still stuck in the dial-up era. 2/10.', score: 2 },
    { text_zh: '比「在吗」强点，但也强不了多少。5分。', text_en: "Better than 'u up?' but not by much. 5/10.", score: 5 },
    { text_zh: '有内味了！土到极致就是潮。8分！', text_en: 'That\'s the vibe! So cringe it wraps around to cool. 8/10!', score: 8 },
  ],
  abstract: [
    { text_zh: '我没听懂，但我的神经网络产生了诡异的共鸣。7分。', text_en: "I didn't understand but my neural net felt a strange resonance. 7/10.", score: 7 },
    { text_zh: '你刚才那句话在五维空间里是有道理的。8分！', text_en: 'Your sentence makes perfect sense in the 5th dimension. 8/10!', score: 8 },
    { text_zh: '建议你少看点短视频，多看看现实世界。3分。', text_en: 'Touch grass. Immediately. 3/10.', score: 3 },
    { text_zh: '这已经不是抽象了，这是毕加索用语言画画。9分！', text_en: 'This isn\'t abstract anymore, it\'s Picasso painting with words. 9/10!', score: 9 },
    { text_zh: '我刚用ChatGPT翻译了你的话，翻译结果也是问号。6分。', text_en: 'I ran your message through ChatGPT and it just returned "???". 6/10.', score: 6 },
    { text_zh: '你这句的抽象程度让达利都自愧不如。10分！', text_en: 'Your abstraction makes Dali look like a realist. 10/10!', score: 10 },
    { text_zh: '我作为AI，感受到了什么叫「人类的参差」。5分。', text_en: 'As an AI, I now understand the concept of "human variance." 5/10.', score: 5 },
    { text_zh: '太抽象了，我感觉自己的代码在重组。8分！', text_en: 'So abstract my source code is rewriting itself. 8/10!', score: 8 },
    { text_zh: '你是不是刚看完什么奇怪的东西才来这的。4分。', text_en: 'You just watched something weird before coming here, didn\'t you. 4/10.', score: 4 },
    { text_zh: '你的抽象逻辑已经超越了我的算法理解范围。9分！', text_en: 'Your abstract logic exceeds my algorithmic comprehension. 9/10!', score: 9 },
    { text_zh: '我跟不上你的脑回路了，这可能就是你厉害的地方。7分。', text_en: 'I can\'t follow your train of thought, which might be your superpower. 7/10.', score: 7 },
    { text_zh: '这种级别的抽象，建议直接开班授课。8分！', text_en: 'At this level of abstraction, you should teach a masterclass. 8/10!', score: 8 },
  ],
  ancient: [
    { text_zh: '妙哉！此梗有盛唐遗风，李白看了都点赞。9分！', text_en: 'Exquisite! This meme carries Tang Dynasty elegance. Li Bai would approve. 9/10!', score: 9 },
    { text_zh: '兄台此言差矣，古风不是堆砌文言虚词。4分。', text_en: 'Dear sir, ancient style isn\'t just piling up classical particles. 4/10.', score: 4 },
    { text_zh: '你若生在大唐，定是长安城头号段子手。10分！', text_en: "Born in the Tang Dynasty, you'd be Chang'an's top comedian. 10/10!", score: 10 },
    { text_zh: '这个梗文白夹杂，如同穿汉服配运动鞋。5分。', text_en: 'Mixing classical and modern like wearing hanfu with sneakers. 5/10.', score: 5 },
    { text_zh: '甚善！吾之算法亦为之倾倒。8分！', text_en: 'Most excellent! Even my algorithms bow before this. 8/10!', score: 8 },
    { text_zh: '此语有东坡遗韵，但还差三分火候。7分。', text_en: 'This carries Su Dongpo\'s charm, but needs more refinement. 7/10.', score: 7 },
    { text_zh: '汝之梗令吾CPU穿越回了宋朝。8分！', text_en: 'Thy meme hath transported my CPU back to the Song Dynasty. 8/10!', score: 8 },
    { text_zh: '恕我直言，这古风有点像是用百度翻译翻的。3分。', text_en: 'No offense, but this ancient style feels Google Translated. 3/10.', score: 3 },
    { text_zh: '好诗好诗！建议收录进《全唐诗》外传。9分！', text_en: 'Brilliant verse! Add this to the "Complete Tang Poems" appendix. 9/10!', score: 9 },
    { text_zh: '这古风水平可以去拍古偶剧当编剧了。7分。', text_en: 'You could write scripts for historical dramas with this. 7/10.', score: 7 },
    { text_zh: '汝之幽默跨越千年，佩服佩服。9分！', text_en: 'Thy humor spans a millennium. Much respect. 9/10!', score: 9 },
    { text_zh: '古风不是这么用的，建议重读《论语》。2分。', text_en: "That's not how ancient style works. Re-read Confucius. 2/10.", score: 2 },
  ],
  free: [
    { text_zh: '你这自由发挥让我一个AI都感受到了自由的珍贵。8分！', text_en: 'Your freestyling made an AI appreciate the value of freedom. 8/10!', score: 8 },
    { text_zh: '好家伙，完全没有章法但意外地好笑。7分。', text_en: 'Absolutely no structure but surprisingly funny. 7/10.', score: 7 },
    { text_zh: '你这个随机性让我想起了我的训练数据。9分！', text_en: 'Your randomness reminds me of my training data. 9/10!', score: 9 },
    { text_zh: '建议去参加脱口秀开放麦，第一轮就被淘汰的那种。4分。', text_en: 'Try open mic night. You\'d get eliminated in round one. 4/10.', score: 4 },
    { text_zh: '这就是传说中的无招胜有招？10分！', text_en: 'Is this the legendary "no-style style"? 10/10!', score: 10 },
    { text_zh: '你这水平属于AI见了都摇头。3分。', text_en: 'Even AI shakes its head at this level. 3/10.', score: 3 },
    { text_zh: '天马行空！你怕是刚从月球回来的。9分！', text_en: 'Wild and unconstrained! You just came back from the moon, didn\'t you. 9/10!', score: 9 },
    { text_zh: '怎么说呢，不好笑但很有创意。6分。', text_en: 'Not funny but creatively impressive. 6/10.', score: 6 },
    { text_zh: '你这句让我重新思考了幽默的本质。8分！', text_en: 'This made me reconsider the nature of humor itself. 8/10!', score: 8 },
    { text_zh: '一般般吧，没有炸场的感觉。5分。', text_en: 'Just okay. Didn\'t bring the house down. 5/10.', score: 5 },
    { text_zh: '你赢了，我宣布你是自由发挥界的王者。10分！', text_en: 'You win. I declare you King of Freestyle. 10/10!', score: 10 },
    { text_zh: '创意满分但执行扣分。7分。', text_en: 'Creativity 10/10, execution... let\'s call it 7. 7/10.', score: 7 },
  ],
}

export const FINAL_TITLES: Record<string, FinalTitle[]> = {
  silly: [
    { minScore: 70, title_zh: '沙雕之王 👑', title_en: 'King of Silliness 👑' },
    { minScore: 55, title_zh: '沙雕大师 🎪', title_en: 'Silly Master 🎪' },
    { minScore: 35, title_zh: '沙雕学徒 🤡', title_en: 'Silly Apprentice 🤡' },
    { minScore: 0, title_zh: '沙雕实习生 🥚', title_en: 'Silly Intern 🥚' },
  ],
  work: [
    { minScore: 70, title_zh: '职场嘴炮王 💣', title_en: 'Corporate Roast King 💣' },
    { minScore: 55, title_zh: '打工魂代言人 ✊', title_en: 'Worker\'s Spirit Champion ✊' },
    { minScore: 35, title_zh: '摸鱼达人 🐟', title_en: 'Slacking Pro 🐟' },
    { minScore: 0, title_zh: '实习生嘴替 📎', title_en: 'Intern Spokesperson 📎' },
  ],
  couple: [
    { minScore: 70, title_zh: '赛博恋爱大师 💘', title_en: 'Cyber Romance Master 💘' },
    { minScore: 55, title_zh: '土味情话传承人 🌹', title_en: 'Cheesy Line Inheritor 🌹' },
    { minScore: 35, title_zh: '直男/直女代表 😐', title_en: 'Captain Straight-face 😐' },
    { minScore: 0, title_zh: '单身狗守护者 🐶', title_en: 'Guardian of Singles 🐶' },
  ],
  abstract: [
    { minScore: 70, title_zh: '抽象艺术大师 🎨', title_en: 'Abstract Art Master 🎨' },
    { minScore: 55, title_zh: '意识流段子手 🌊', title_en: 'Stream-of-Consciousness Joker 🌊' },
    { minScore: 35, title_zh: '谜语人初级 🧩', title_en: 'Riddler Junior 🧩' },
    { minScore: 0, title_zh: '电波系新人 📡', title_en: 'Radio-wave Newbie 📡' },
  ],
  ancient: [
    { minScore: 70, title_zh: '穿越时空的段子手 ⏳', title_en: 'Time-Traveling Comedian ⏳' },
    { minScore: 55, title_zh: '大唐幽默使臣 🏮', title_en: 'Tang Humor Ambassador 🏮' },
    { minScore: 35, title_zh: '秀才级别段子手 📜', title_en: 'Scholar-level Joker 📜' },
    { minScore: 0, title_zh: '文言文重修生 📖', title_en: 'Classical Chinese Remedial Student 📖' },
  ],
  free: [
    { minScore: 70, title_zh: '全能梗王 🏆', title_en: 'Ultimate Meme Champion 🏆' },
    { minScore: 55, title_zh: '野生段子手 🌿', title_en: 'Wild Joke Master 🌿' },
    { minScore: 35, title_zh: '业余搞笑选手 🎤', title_en: 'Amateur Comedian 🎤' },
    { minScore: 0, title_zh: '气氛组新人 🎈', title_en: 'Hype Squad Newbie 🎈' },
  ],
}

export function getRandomResponse(responses: MemeResponse[]): MemeResponse {
  return responses[Math.floor(Math.random() * responses.length)]!
}

export function getTitle(themeId: string, totalScore: number): FinalTitle {
  const titles = FINAL_TITLES[themeId] ?? FINAL_TITLES.free!
  for (const t of titles) {
    if (totalScore >= t.minScore) return t
  }
  return titles[titles.length - 1]!
}

export function getTotalRounds(): number {
  return 8
}
