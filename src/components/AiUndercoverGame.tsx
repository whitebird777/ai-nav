'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ArrowRight, RefreshCw, Share2, Send, Eye, EyeOff, Users, HelpCircle } from 'lucide-react'
import {
  getRandomWordPair,
  generateAIDescriptions,
  aiVote,
  getResultTitle,
  getResultMessage,
  type PlayerRole,
  type RoundData,
  type WordPair,
} from '@/lib/undercover-data'

type Stage = 'start' | 'identity' | 'rounds' | 'vote' | 'result'

const TOTAL_ROUNDS = 4

export default function AiUndercoverGame({ locale }: { locale: string }) {
  const [stage, setStage] = useState<Stage>('start')
  const [wordPair, setWordPair] = useState<WordPair | null>(null)
  const [playerRole, setPlayerRole] = useState<PlayerRole>('civilian')
  const [spyIndex, setSpyIndex] = useState(0)
  const [rounds, setRounds] = useState<RoundData[]>([])
  const [currentRound, setCurrentRound] = useState(1)
  const [playerDesc, setPlayerDesc] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [playerVote, setPlayerVote] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isEn = locale === 'en'

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [rounds])

  useEffect(() => {
    if (stage === 'rounds') inputRef.current?.focus()
  }, [stage, currentRound])

  // ==================== 开始游戏 ====================
  const handleStart = useCallback(() => {
    const wp = getRandomWordPair()
    const spy = Math.floor(Math.random() * 3) // 0=Player, 1=AI1, 2=AI2
    const role = spy === 0 ? 'spy' : 'civilian'

    setWordPair(wp)
    setPlayerRole(role)
    setSpyIndex(spy)
    setRounds([])
    setCurrentRound(1)
    setPlayerDesc('')
    setPlayerVote(null)
    setShowResult(false)
    setStage('identity')
  }, [])

  // ==================== 确认身份 ====================
  const handleIdentityConfirm = useCallback(() => {
    setStage('rounds')
  }, [])

  // ==================== 玩家提交描述 ====================
  const handleSubmitDesc = useCallback(() => {
    const desc = playerDesc.trim()
    if (!desc || isThinking || !wordPair) return

    setPlayerDesc('')
    setIsThinking(true)

    // AI 思考延迟
    setTimeout(() => {
      const [ai1Desc, ai2Desc] = generateAIDescriptions(spyIndex, currentRound, isEn)

      const newRound: RoundData = {
        round: currentRound,
        descriptions: [desc, ai1Desc, ai2Desc],
      }

      setRounds((prev) => [...prev, newRound])
      setIsThinking(false)

      if (currentRound >= TOTAL_ROUNDS) {
        if (spyIndex === 0) {
          // 玩家是卧底 → AI 投票
          setShowResult(true)
          setStage('result')
        } else {
          // 玩家是平民 → 进入投票
          setStage('vote')
        }
      } else {
        setCurrentRound((prev) => prev + 1)
      }
    }, 800 + Math.random() * 900)
  }, [playerDesc, isThinking, wordPair, spyIndex, currentRound, isEn])

  // ==================== 玩家投票 ====================
  const handleVote = useCallback(
    (target: number) => {
      setPlayerVote(target)
      setShowResult(true)
      setStage('result')
    },
    []
  )

  // ==================== 分享 ====================
  const handleShare = useCallback(() => {
    if (!wordPair) return
    const playerWon = getPlayerWon()
    const title = getResultTitle(playerRole, playerWon, isEn)
    const text = isEn
      ? `I played AI Undercover and got "${title}"! Can you find the spy? 🕵️`
      : `我玩了 AI 谁是卧底，获得了「${title}」！你能找出谁是卧底吗？🕵️`
    const url = `${window.location.origin}/${locale}/play/ai-undercover`

    if (navigator.share) {
      navigator.share({ title: isEn ? 'AI Undercover' : 'AI 谁是卧底', text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).catch(() => {})
    }
  }, [wordPair, playerRole, isEn, locale])

  // ==================== 辅助 ====================
  const getPlayerWon = (): boolean => {
    if (spyIndex === 0) {
      // 玩家是卧底，AI 投票
      const { ai1Vote, ai2Vote } = aiVote(spyIndex, true)
      return !(ai1Vote === 0 && ai2Vote === 0) // 不被两人同时发现就算赢
    }
    // 玩家是平民，投票正确算赢
    return playerVote === spyIndex
  }

  // ==================== 开始页 ====================
  if (stage === 'start') {
    return (
      <div className="text-center">
        <div className="mb-2 text-5xl">🕵️</div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
          {isEn ? 'AI Undercover' : 'AI 谁是卧底'}
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {isEn
            ? 'You and 2 AI players each get a secret word. One of you is the spy with a different word. Can you find them — or fool everyone?'
            : '你和两个 AI 玩家各拿到一个词，其中有一个卧底的词和大家不一样。通过描述找出谁是卧底！'}
        </p>

        {/* 规则 */}
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-900/50">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {isEn ? 'Rules' : '游戏规则'}
          </h3>
          <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            <li>
              {isEn
                ? '1. Each player gets a secret word (spy gets a different one)'
                : '1. 每人拿到一个词，卧底的词跟别人不一样'}
            </li>
            <li>
              {isEn
                ? '2. Take turns describing your word — don\'t say it directly!'
                : '2. 轮流描述你的词，但不能直接说出来'}
            </li>
            <li>
              {isEn
                ? '3. After 4 rounds, vote for who you think the spy is'
                : '3. 4 轮描述后进行投票，找出你怀疑的人'}
            </li>
            <li>
              {isEn
                ? '4. If you\'re the spy — blend in and don\'t get caught!'
                : '4. 如果你是卧底——别暴露自己！'}
            </li>
          </ul>
        </div>

        <button
          onClick={handleStart}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 active:scale-[0.98] dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          {isEn ? 'Start Game' : '开始游戏'}
          <ArrowRight size={16} />
        </button>
      </div>
    )
  }

  // ==================== 身份确认 ====================
  if (stage === 'identity' && wordPair) {
    const playerWord =
      playerRole === 'spy'
        ? (isEn ? wordPair.spy_en : wordPair.spy_zh)
        : (isEn ? wordPair.civilian_en : wordPair.civilian_zh)
    const civilianWord = isEn ? wordPair.civilian_en : wordPair.civilian_zh

    return (
      <div className="text-center">
        <div className="mb-2 text-5xl">{playerRole === 'spy' ? '🎭' : '🕵️'}</div>

        {playerRole === 'spy' ? (
          <>
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
              {isEn ? 'YOU ARE THE SPY!' : '你是卧底！'}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {isEn
                ? `Your word is: "${playerWord}". The civilians have a different word. Blend in and don't get caught!`
                : `你的词是：「${playerWord}」。平民的词跟你不同。伪装好自己，别被发现！`}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {isEn ? 'You are a Civilian' : '你是平民'}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {isEn
                ? `Your word is: "${playerWord}". Somewhere among you is a spy with a different word. Find them!`
                : `你的词是：「${playerWord}」。你们中间有一个卧底，词跟你们不一样。找出TA！`}
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              {isEn
                ? `(The civilian word is: "${civilianWord}")`
                : `（平民词为：「${civilianWord}」）`}
            </p>
          </>
        )}

        <p className="mt-4 text-xs text-amber-600 dark:text-amber-400 font-medium">
          {isEn
            ? 'Remember: describe without saying the word directly!'
            : '记住：描述你的词，但不能直接说出这个词！'}
        </p>

        <button
          onClick={handleIdentityConfirm}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isEn ? 'I\'m Ready' : '准备好了'}
          <ArrowRight size={16} />
        </button>
      </div>
    )
  }

  // ==================== 描述轮 ====================
  if (stage === 'rounds' && wordPair) {
    return (
      <div className="flex flex-col" style={{ height: 'calc(100vh - 220px)', minHeight: 400, maxHeight: 600 }}>
        {/* 顶栏 */}
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span>{playerRole === 'spy' ? '🎭' : '🕵️'}</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {playerRole === 'spy'
                ? (isEn ? 'Spy (You)' : '卧底（你）')
                : (isEn ? 'Civilian (You)' : '平民（你）')}
            </span>
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium dark:bg-zinc-800">
            {isEn ? 'Round' : '第'}{currentRound} / {TOTAL_ROUNDS}
          </span>
        </div>

        {/* 对话区域 */}
        <div
          ref={scrollRef}
          className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          {rounds.map((r, ri) => (
            <div key={ri} className="space-y-2">
              <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                — {isEn ? 'Round' : '第'} {r.round} {isEn ? '' : '轮'} —
              </p>
              {/* Player */}
              <div className="flex gap-2 justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-zinc-900 px-3.5 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {r.descriptions[0]}
                </div>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700">👤</span>
              </div>
              {/* AI1 */}
              <div className="flex gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700">🤖</span>
                <div className="rounded-2xl rounded-tl-md bg-white px-3.5 py-2 text-sm text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-300">
                  {r.descriptions[1]}
                </div>
                <span className="self-end text-[10px] text-zinc-400">AI-1</span>
              </div>
              {/* AI2 */}
              <div className="flex gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700">🤖</span>
                <div className="rounded-2xl rounded-tl-md bg-white px-3.5 py-2 text-sm text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-300">
                  {r.descriptions[2]}
                </div>
                <span className="self-end text-[10px] text-zinc-400">AI-2</span>
              </div>
            </div>
          ))}

          {/* AI 思考中 */}
          {isThinking && (
            <div className="flex gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700">🤖</span>
              <div className="rounded-2xl rounded-tl-md bg-white px-4 py-2.5 shadow-sm dark:bg-zinc-800">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 输入区 */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={playerDesc}
            onChange={(e) => setPlayerDesc(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmitDesc()
            }}
            placeholder={isEn ? 'Describe your word...' : '描述你的词...'}
            disabled={isThinking}
            maxLength={150}
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-amber-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-amber-500"
          />
          <button
            onClick={handleSubmitDesc}
            disabled={!playerDesc.trim() || isThinking}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white transition-colors hover:bg-amber-600 disabled:opacity-30 dark:bg-amber-600 dark:hover:bg-amber-500"
          >
            <Send size={17} />
          </button>
        </div>
      </div>
    )
  }

  // ==================== 投票 ====================
  if (stage === 'vote' && wordPair) {
    return (
      <div className="text-center">
        <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {isEn ? 'Who do you think is the spy?' : '你觉得谁是卧底？'}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => handleVote(1)}
            className={`rounded-xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              playerVote === 1
                ? 'border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-950'
                : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
            }`}
          >
            <span className="text-4xl">🤖</span>
            <p className="mt-3 text-lg font-bold text-zinc-800 dark:text-zinc-200">AI-1</p>
            <p className="mt-1 text-xs text-zinc-500">
              {isEn ? 'First AI player' : '第一位 AI 玩家'}
            </p>
          </button>

          <button
            onClick={() => handleVote(2)}
            className={`rounded-xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              playerVote === 2
                ? 'border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-950'
                : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
            }`}
          >
            <span className="text-4xl">🤖</span>
            <p className="mt-3 text-lg font-bold text-zinc-800 dark:text-zinc-200">AI-2</p>
            <p className="mt-1 text-xs text-zinc-500">
              {isEn ? 'Second AI player' : '第二位 AI 玩家'}
            </p>
          </button>
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          {isEn ? 'Choose wisely...' : '慎重选择...'}
        </p>
      </div>
    )
  }

  // ==================== 结果 ====================
  if (stage === 'result' && wordPair) {
    const playerWon = getPlayerWon()
    const title = getResultTitle(playerRole, playerWon, isEn)
    const message = getResultMessage(playerRole, playerWon, wordPair, isEn)
    const playerWord =
      playerRole === 'spy'
        ? (isEn ? wordPair.spy_en : wordPair.spy_zh)
        : (isEn ? wordPair.civilian_en : wordPair.civilian_zh)
    const civilianWord = isEn ? wordPair.civilian_en : wordPair.civilian_zh
    const spyWord = isEn ? wordPair.spy_en : wordPair.spy_zh

    return (
      <div>
        {/* 戏剧性揭晓 */}
        <div className="mb-8 text-center">
          <div className="mb-2 text-6xl">{playerWon ? '🎉' : '😱'}</div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {playerWon
              ? (isEn ? 'You Win!' : '你赢了！')
              : (isEn ? 'You Lose!' : '你输了！')}
          </h2>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            {title}
          </div>
        </div>

        {/* 揭露真相 */}
        <div className="mb-6 space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {isEn ? 'Civilian Word' : '平民词'}
            </span>
            <span className="rounded bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              {civilianWord}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {isEn ? 'Spy Word' : '卧底词'}
            </span>
            <span className="rounded bg-red-100 px-3 py-1 text-sm font-bold text-red-800 dark:bg-red-900/40 dark:text-red-300">
              {spyWord}
            </span>
          </div>
          <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {isEn ? 'The Spy Was:' : '卧底是：'}
              <span className="ml-2 text-red-600 dark:text-red-400">
                {spyIndex === 0
                  ? (isEn ? 'YOU!' : '你自己！')
                  : `AI-${spyIndex}`}
              </span>
            </p>
          </div>
        </div>

        {/* AI 搞笑总结 */}
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {message}
          </p>
        </div>

        {/* 按钮 */}
        <div className="flex gap-3">
          <button
            onClick={handleStart}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <RefreshCw size={16} />
            {isEn ? 'Play Again' : '再玩一局'}
          </button>
          <button
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-600 active:scale-[0.98] dark:bg-amber-600 dark:hover:bg-amber-500"
          >
            <Share2 size={16} />
            {isEn ? 'Share' : '分享战绩'}
          </button>
        </div>
      </div>
    )
  }

  return null
}
