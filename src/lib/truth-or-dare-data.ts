// AI 真心话大冒险 — 题库

export type Mode = 'truth' | 'dare'

export interface Challenge {
  id: number
  content_zh: string
  content_en: string
}

// ==================== 真心话题库 ====================
const TRUTHS: Challenge[] = [
  { id: 1, content_zh: '你最近一次在微信上偷偷搜了谁的聊天记录？', content_en: 'Whose chat history did you secretly search for last time?' },
  { id: 2, content_zh: '你做过最社死的一件事是什么？不要害羞。', content_en: 'What\'s the most embarrassing thing you\'ve ever done? Don\'t be shy.' },
  { id: 3, content_zh: '你手机里有没有不想让别人看到的 App？是什么？', content_en: 'Is there an app on your phone you don\'t want anyone to see? What is it?' },
  { id: 4, content_zh: '你曾经在别人面前假装开心，实际上特别难过是什么时候？', content_en: 'When was the last time you pretended to be happy in front of others but were actually sad?' },
  { id: 5, content_zh: '你上一次撒谎是什么时候？说了什么谎？', content_en: 'When was the last time you lied? What did you lie about?' },
  { id: 6, content_zh: '你偷看过别人的朋友圈但没有点赞，是谁？', content_en: 'Whose social media do you stalk without ever liking their posts?' },
  { id: 7, content_zh: '你有没有说过关于在场某人的坏话？在什么情况下？', content_en: 'Have you ever talked behind someone\'s back? Under what circumstances?' },
  { id: 8, content_zh: '你最近花钱买的最没用的东西是什么？多少钱？', content_en: 'What\'s the most useless thing you bought recently? How much?' },
  { id: 9, content_zh: '你最羡慕身边哪个朋友的哪一点？', content_en: 'Which friend are you most envious of, and what exactly?' },
  { id: 10, content_zh: '你删过的最后悔删的人是谁？', content_en: 'Who is the one person you regret deleting from your contacts?' },
  { id: 11, content_zh: '你做梦梦到过在场的人吗？内容是什么？（可以说模糊点）', content_en: 'Have you dreamed about someone here? What happened? (Keep it vague!)' },
  { id: 12, content_zh: '你有没有因为面子做过后来特别后悔的事？', content_en: 'Have you ever done something to save face that you deeply regretted later?' },
  { id: 13, content_zh: '你上一次爆哭是为什么？', content_en: 'What made you cry the hardest recently?' },
  { id: 14, content_zh: '你在网上发过最羞耻的东西是什么？还留着吗？', content_en: 'What\'s the cringiest thing you\'ve ever posted online? Is it still up?' },
  { id: 15, content_zh: '你有没有假装很懂某个话题，实际上完全不了解？', content_en: 'Have you ever pretended to know a lot about something you actually know nothing about?' },
  { id: 16, content_zh: '如果让你重新选一次大学专业或第一份工作，你会选什么？', content_en: 'If you could re-choose your major or first job, what would you pick?' },
  { id: 17, content_zh: '你手机相册里最后一张自拍拍了几次才满意？', content_en: 'How many takes did your last selfie need before you were satisfied?' },
  { id: 18, content_zh: '你跟 AI 聊过天吗？有没有说过什么奇怪的对话？', content_en: 'Have you ever chatted with an AI? Say anything weird?' },
  { id: 19, content_zh: '你最难以启齿的一个小秘密是什么？（可以说模糊版）', content_en: 'What\'s one little secret you find hardest to admit? (Vague version allowed!)' },
  { id: 20, content_zh: '你对在场的哪个人有好感或者有过好感？', content_en: 'Do you have (or have you had) a crush on anyone present?' },
  { id: 21, content_zh: '你做过最冲动的一件事是什么？', content_en: 'What\'s the most impulsive thing you\'ve ever done?' },
  { id: 22, content_zh: '你曾经偷吃过什么东西然后栽赃给了别人或宠物？', content_en: 'Have you ever eaten something you shouldn\'t have and blamed it on someone else or a pet?' },
  { id: 23, content_zh: '你最希望自己拥有什么超能力？别说什么世界和平，说真的。', content_en: 'What superpower do you really want? No "world peace" — be honest.' },
  { id: 24, content_zh: '你觉得自己最吸引人的一点是什么？至少说出一个。', content_en: 'What do you think is your most attractive quality? Name at least one.' },
  { id: 25, content_zh: '你上一次对别人说谎不眨眼是什么时候？说了什么？', content_en: 'When was the last time you lied effortlessly? What did you say?' },
]

// ==================== 大冒险题库 ====================
const DARES: Challenge[] = [
  { id: 1, content_zh: '模仿你最喜欢的表情包，让旁边的人帮你录下来。', content_en: 'Imitate your favorite emoji/meme and have someone record it.' },
  { id: 2, content_zh: '用你对面那个人的手机给 TA 的最近联系人发一条「我想你了」。', content_en: 'Send "I miss you" to the last person the person across from you texted — using their phone.' },
  { id: 3, content_zh: '用最深情的语气念一段商品说明书，越深情越好。', content_en: 'Read a product manual in the most romantic voice possible.' },
  { id: 4, content_zh: '在朋友圈发一张你最丑的自拍，配文「这就是最美的我」。保留至少 10 分钟。', content_en: 'Post your ugliest selfie with the caption "This is me at my best." Keep it up at least 10 minutes.' },
  { id: 5, content_zh: '用另一种性别的声音说话直到你的下一轮。', content_en: 'Speak in the voice of the opposite gender until your next turn.' },
  { id: 6, content_zh: '对着镜子夸自己 30 秒，必须用第三人称。', content_en: 'Give yourself a 30-second compliment in third person, looking in a mirror.' },
  { id: 7, content_zh: '在微信上给你妈妈发「妈，我有个秘密要告诉你…」然后等 1 分钟再回复「算了」。', content_en: 'Text your mom "I have a secret to tell you..." wait 1 minute, then reply "Never mind."' },
  { id: 8, content_zh: '做一个瑜伽动作并保持 20 秒，让在场的打分。', content_en: 'Hold a yoga pose for 20 seconds while everyone rates you.' },
  { id: 9, content_zh: '把一首流行歌的歌词用新闻联播的语气念出来。', content_en: 'Recite pop song lyrics in a serious news anchor voice.' },
  { id: 10, content_zh: '用一支笔当麦克风，即兴采访你右边的人，持续 1 分钟。', content_en: 'Use a pen as a mic and interview the person to your right for 1 minute.' },
  { id: 11, content_zh: '拍一段 15 秒对口型唱歌视频发朋友圈。', content_en: 'Record a 15-second lip-sync video and post it publicly.' },
  { id: 12, content_zh: '走到窗边大喊一声「我太棒了！」，如果没窗就原地大喊。', content_en: 'Go to the window and yell "I\'M AWESOME!" — or just yell it wherever you are.' },
  { id: 13, content_zh: '闭着眼睛画在场的一个人，然后让对方猜你画的是谁。', content_en: 'Draw someone present with your eyes closed and let them guess who.' },
  { id: 14, content_zh: '把你今天穿的袜子的颜色发到朋友圈，只发两个字「懂的」。', content_en: 'Post the color of your socks on social media with just the word "You know."' },
  { id: 15, content_zh: '换一个搞笑铃声，然后让别人给你打电话。', content_en: 'Change your ringtone to something ridiculous and have someone call you.' },
  { id: 16, content_zh: '用最严肃的表情讲一个冷笑话，不许笑。', content_en: 'Tell a dad joke with the most serious face. Don\'t crack.' },
  { id: 17, content_zh: '把手机语言改成一种你看不懂的语言，直到游戏结束。', content_en: 'Change your phone language to one you don\'t understand. Keep it until the game ends.' },
  { id: 18, content_zh: '跟 Siri/Google 助手深情表白，录下来发朋友圈。', content_en: 'Confess your love to Siri/Google Assistant. Record and share it.' },
  { id: 19, content_zh: '原地做 10 个俯卧撑或 15 个深蹲。', content_en: 'Drop and do 10 push-ups or 15 squats right now.' },
  { id: 20, content_zh: '用身体摆出字母「X」的形状并拍照留念。', content_en: 'Shape your body into the letter "X" and take a photo.' },
  { id: 21, content_zh: '给外卖/快递小哥的下一单备注写一首 4 行打油诗。', content_en: 'Write a 4-line poem in your next delivery order notes.' },
  { id: 22, content_zh: '在抖音或小红书上搜索「沙雕视频」，点赞评论前三个。', content_en: 'Search "fail compilation" on YouTube/TikTok and comment on the first 3 videos.' },
  { id: 23, content_zh: '模仿三个不同的动物叫声，让别人猜。', content_en: 'Imitate 3 different animal sounds and have others guess them.' },
  { id: 24, content_zh: '给你最近通话的第一个人发一个随机 emoji 序列（至少 10 个），不回解释。', content_en: 'Text a random string of at least 10 emojis to your most recent call contact. No explanation.' },
  { id: 25, content_zh: '抱起你左边的人（如果 TA 同意）转一圈，抱不动就公主抱空气 10 秒。', content_en: 'Pick up the person to your left (with consent) and spin them — or mime carrying someone for 10 seconds.' },
]

// ==================== AI 反应 ====================
const AI_REACTIONS_ZH = [
  '哈哈哈哈你做到了！AI 给你的表现打 10 分！',
  '可以可以！这个完成度我给满分，你比我想象中勇敢。',
  '我作证：你刚才确实完成了，虽然姿势有点好笑但勇气可嘉！',
  '完成！AI 表示：没想到你真敢来，respect！',
  '好家伙，你眼都不眨就完成了。我敬你是条汉子！',
  '不错不错，虽然你可能内心在流泪，但表面非常淡定！',
  'AI 震惊！你的表现超出了我的训练数据的认知范围。',
  '完成质量：⭐⭐⭐⭐⭐ 沙雕程度：⭐⭐⭐⭐⭐ 社死程度：看你自己了。',
  '太棒了！你已经超越了 99% 的人类勇气值。',
  '哇哦，你这个完成方式，连我这个 AI 都没想到。创意满分！',
  '完成的很好，但我猜你心里已经在后悔了。欢迎来到大人世界！',
  'AI 鉴定：你是一个说到做到的人，虽然过程有点狼狈。',
]

const AI_REACTIONS_EN = [
  'HAHA you actually did it! AI rates your performance 10/10!',
  'Impressive! Full marks for completion. You\'re braver than I thought.',
  'For the record: you just did that. The execution was questionable but the courage was real!',
  'Done! AI says: I didn\'t think you\'d actually go through with it. Respect!',
  'Whoa, you didn\'t even blink. I salute your boldness!',
  'Nice one! You might be crying inside but you looked cool doing it.',
  'AI is shocked! Your performance exceeded my training data comprehension.',
  'Quality: ⭐⭐⭐⭐⭐ Absurdity: ⭐⭐⭐⭐⭐ Dignity: we\'ll check back later.',
  'Amazing! You\'ve surpassed 99% of human courage levels.',
  'Wow, even I — an AI — didn\'t see that creative execution coming. Full marks!',
  'Great job! I bet you\'re already regretting it. Welcome to adulthood!',
  'AI verdict: You\'re someone who follows through. The execution was messy but the spirit was pure.',
]

// ==================== 称号 ====================
const TITLES_ZH = [
  '社牛天花板 🗣️',
  '抽象大冒险家 🎪',
  '沙雕勇士 ⚔️',
  '朋友圈社死冠军 🏆',
  '无所畏惧的灵魂 🔥',
  '今日最佳真话王 👑',
]
const TITLES_EN = [
  'Social Butterfly 🗣️',
  'Abstract Adventurer 🎪',
  'Fearless Warrior ⚔️',
  'Cringe Champion 🏆',
  'Soul of No Fear 🔥',
  'Truth Royalty 👑',
]

// ==================== 工具函数 ====================

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

export function getShuffledTruths(): Challenge[] {
  return shuffle(TRUTHS)
}

export function getShuffledDares(): Challenge[] {
  return shuffle(DARES)
}

export function getAIRection(isEn: boolean): string {
  const pool = isEn ? AI_REACTIONS_EN : AI_REACTIONS_ZH
  return pool[Math.floor(Math.random() * pool.length)]!
}

export function getRandomTitle(isEn: boolean): string {
  const pool = isEn ? TITLES_EN : TITLES_ZH
  return pool[Math.floor(Math.random() * pool.length)]!
}
