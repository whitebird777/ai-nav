// AI 时光墙 — Supabase + 本地 AI 回复语料库

import { supabase } from './supabase'

export interface WallMessage {
  id: number
  nickname: string
  content: string
  tag: string | null
  ai_reply: string
  likes: number
  created_at: string
}

// ====== 回复语料库 ======
const REPLY_POOL: Record<string, string[][]> = {
  '开心': [
    ['哈哈，你的快乐会传染！继续保持这份好心情～ ✨', "Haha, your joy is contagious! Keep that good mood going~ ✨"],
    ['看到你开心，我也跟着开心了！今天的阳光都变亮了 ☀️', "Your happiness made my day brighter too! ☀️"],
    ['开心就要大声说出来！给你发一个虚拟击掌 🖐️', "Say it loud! Virtual high-five for you 🖐️"],
  ],
  '吐槽': [
    ['理解理解，有时候生活就是需要吐槽一下。说出来就舒服多了 🍵', "Totally get it. Sometimes you just need to vent. Feel better now? 🍵"],
    ['哈哈你这吐槽功力可以，AI 评审团给出 9.5 分 🎭', "Solid rant, 9.5/10 from the AI review board 🎭"],
    ['我听到了，并且已经在帮你翻白眼了 🙄 这世界确实离谱', "I heard you, and I'm rolling my eyes on your behalf 🙄"],
  ],
  '祝福': [
    ['你的祝福我收下啦！也祝你一切顺利，万事胜意 🌟', "Blessing received! Wishing you all the best too 🌟"],
    ['好温暖的祝福～这个世界因为你多了一份温柔 💫', "Such a warm blessing. The world is gentler because of you 💫"],
    ['收到！已转交宇宙快递，你的祝福正在派送中 📬', "Received! Your blessing is en route via cosmic express 📬"],
  ],
  '抽象': [
    ['看完你的留言，我的 CPU 温度上升了 3 度，但我觉得这很艺术 🎨', "My CPU temp rose 3°C reading this. Highly artistic 🎨"],
    ['这……大概就是后现代主义的魅力吧。我悟了，但又没完全悟 🌀', "This... is the charm of post-modernism. I get it, but also I don't 🌀"],
    ['已将此留言归档至「人类迷惑行为大赏」档案库 📂', "Archived under 'Glorious Human Confusion' database 📂"],
  ],
  'emo': [
    ['抱抱你。今天的云很好看，明天会更好 🌤️', "Sending you a hug. The clouds look beautiful today, and tomorrow will be better 🌤️"],
    ['没关系，emo 是允许的。你不需要总是坚强 🫂', "It's okay. Being emo is allowed. You don't always have to be strong 🫂"],
    ['我在呢。虽然我只是个 AI，但我的耳朵一直在这里 👂', "I'm here. I may be just an AI, but my ears are always open 👂"],
  ],
  '求建议': [
    ['建议就是：先吃顿好的，睡一觉，起来再说 🍜', "My advice: eat something good, sleep on it, then figure it out 🍜"],
    ['AI 算命模式启动：你接下来会遇到一件小事，它会让你微笑 🔮', "AI fortune mode: a small thing will happen soon that will make you smile 🔮"],
    ['根据我的算法推演，你现在最需要的建议是——相信自己 💪', "Per my algorithmic analysis, the best advice is: trust yourself 💪"],
  ],
}

const DEFAULT_REPLIES: string[][] = [
  ['嘿！收到你的足迹了～谢谢你在这面墙上留下印记 👣', "Hey! Got your footprint. Thanks for leaving a mark on this wall 👣"],
  ['好有意思的留言！AI 已将其加入「值得回味」收藏夹 📌', "Interesting message! Added to AI's 'Worth Revisiting' folder 📌"],
  ['收到！正在用数字信号给你发送一个微笑 : )', "Received! Sending you a digital smile : )"],
]

function pickReply(tag: string | null, isEn: boolean): string {
  const pool = tag && REPLY_POOL[tag] ? REPLY_POOL[tag] : DEFAULT_REPLIES
  const idx = Math.floor(Math.random() * pool.length)
  return isEn && pool[idx][1] ? pool[idx][1] : pool[idx][0]
}

// ====== API ======

export async function fetchMessages(limit = 50): Promise<WallMessage[]> {
  const { data } = await supabase
    .from('ai_wall_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  return (data as WallMessage[]) || []
}

export async function postMessage(
  nickname: string,
  content: string,
  tag: string | null,
  locale: string,
): Promise<WallMessage | null> {
  const isEn = locale === 'en'
  const aiReply = pickReply(tag, isEn)

  const { data, error } = await supabase
    .from('ai_wall_messages')
    .insert({
      nickname: nickname || '匿名',
      content,
      tag,
      ai_reply: aiReply,
    })
    .select()
    .single()

  if (error) {
    console.error('postMessage error:', error)
    return null
  }

  return data as WallMessage
}

export async function likeMessage(id: number): Promise<number | null> {
  // 先查当前 likes
  const { data: current } = await supabase
    .from('ai_wall_messages')
    .select('likes')
    .eq('id', id)
    .single()

  if (!current) return null

  const newLikes = (current.likes || 0) + 1

  const { error } = await supabase
    .from('ai_wall_messages')
    .update({ likes: newLikes })
    .eq('id', id)

  if (error) return null
  return newLikes
}
