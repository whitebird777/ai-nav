'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Clock, Zap, RotateCcw, Send, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { generateCapsule, MOODS, type Mood, type CapsuleContent } from '@/lib/time-capsule-data'

type Stage = 'input' | 'generating' | 'preview' | 'sealed'

// ---- 粒子组件 ----
function Particles({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * 360
        const dist = 80 + Math.random() * 120
        const x = Math.cos((angle * Math.PI) / 180) * dist
        const y = Math.sin((angle * Math.PI) / 180) * dist
        const delay = Math.random() * 0.8
        const size = 2 + Math.random() * 4
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full bg-amber-400"
            style={{ width: size, height: size }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0 }}
            transition={{ duration: 1.5 + Math.random(), delay, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

// ---- 扫描线 ----
function ScanLine({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <motion.div
      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
      initial={{ top: '0%', opacity: 0 }}
      animate={{ top: ['0%', '100%', '0%'], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    />
  )
}

export default function TimeCapsuleGame({ locale }: { locale: string }) {
  const isEn = locale === 'en'

  const [stage, setStage] = useState<Stage>('input')
  const [message, setMessage] = useState('')
  const [futureDate, setFutureDate] = useState('')
  const [mood, setMood] = useState<Mood>('期待')
  const [capsule, setCapsule] = useState<CapsuleContent | null>(null)
  const [saved, setSaved] = useState(false)

  const capsuleRef = useRef<HTMLDivElement>(null)

  const todayStr = new Date().toISOString().slice(0, 10)
  const minDate = new Date()
  minDate.setMonth(minDate.getMonth() + 1)
  const minDateStr = minDate.toISOString().slice(0, 10)

  const handleGenerate = useCallback(async () => {
    if (!message.trim()) return
    setStage('generating')

    // 模拟 AI 生成延迟
    await new Promise((r) => setTimeout(r, 1800))

    const content = generateCapsule(mood)
    setCapsule(content)

    // 保存到 Supabase（fire and forget）
    supabase.from('time_capsules').insert({
      message: message.trim(),
      mood,
      future_date: futureDate || minDateStr,
      ai_letter: content.letterZh,
      ai_seal: content.sealZh,
      ai_response: content.responseZh,
    }).then(() => setSaved(true))

    setStage('preview')
  }, [message, mood, futureDate, minDateStr])

  const handleSeal = () => setStage('sealed')
  const handleReset = () => {
    setStage('input')
    setMessage('')
    setCapsule(null)
  }

  // ---- 输入阶段 ----
  const renderInput = () => (
    <motion.div
      key="input"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid gap-8 lg:grid-cols-2"
    >
      {/* 左侧：输入区 */}
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {isEn ? 'Message to Future You' : '给未来自己的话'}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isEn
                ? 'Write something to your future self... Any hopes, fears, or secrets.'
                : '写点什么给未来的自己... 期待、恐惧、秘密，什么都可以。'
            }
            maxLength={600}
            rows={5}
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30"
          />
          <p className="mt-1 text-right text-[11px] text-zinc-600">{message.length}/600</p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {isEn ? 'Open Date' : '开启日期'}
          </label>
          <div className="relative">
            <input
              type="date"
              value={futureDate}
              onChange={(e) => setFutureDate(e.target.value)}
              min={minDateStr}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-600/50"
            />
            <Clock size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          </div>
          <p className="mt-1 text-[11px] text-zinc-600">
            {isEn ? 'Leave empty for 1 month from now' : '留空则默认为一个月后'}
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {isEn ? 'Current Mood' : '当前情绪'}
          </label>
          <div className="relative">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value as Mood)}
              className="w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-600/50"
            >
              {MOODS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.emoji} {isEn ? m.label_en : m.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!message.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500/90 px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-amber-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Zap size={16} />
          {isEn ? 'Generate Capsule' : '生成时间胶囊'}
        </button>
      </div>

      {/* 右侧：预览占位 */}
      <div className="hidden items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 lg:flex">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800/50">
            <Clock size={28} className="text-zinc-600" />
          </div>
          <p className="text-sm text-zinc-600">
            {isEn ? 'Your capsule preview will appear here' : '你的时间胶囊预览将显示在这里'}
          </p>
        </div>
      </div>
    </motion.div>
  )

  // ---- 生成中 ----
  const renderGenerating = () => (
    <motion.div
      key="generating"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-center py-20"
    >
      <ScanLine active />
      <motion.div
        className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-amber-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <div className="h-24 w-24 rounded-full border border-amber-400/20" />
        <Sparkles size={32} className="absolute text-amber-400" />
      </motion.div>
      <motion.p
        className="mt-6 text-sm text-zinc-400"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {isEn ? 'AI is sealing your capsule...' : 'AI 正在封印你的胶囊...'}
      </motion.p>
    </motion.div>
  )

  // ---- 预览 ----
  const renderPreview = () => (
    <motion.div
      key="preview"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="grid gap-8 lg:grid-cols-2"
    >
      {/* 胶囊卡片 */}
      <div className="order-2 lg:order-1">
        <div
          ref={capsuleRef}
          className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-8"
        >
          {/* 装饰线 */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

          {/* 封印标记 */}
          <div className="mb-6 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/30">
              <Clock size={14} className="text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/80">
                {isEn ? 'TIME CAPSULE' : '时间胶囊'}
              </p>
              <p className="text-[11px] text-zinc-500">
                {futureDate || minDateStr} {isEn ? '→ Future' : '→ 未来'}
              </p>
            </div>
          </div>

          {/* 信件内容 */}
          <div className="mb-6 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              {isEn ? 'Your Message' : '你的留言'}
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">{message}</p>
          </div>

          <div className="mb-6 h-px bg-zinc-800" />

          {/* AI 未来信 */}
          {capsule && (
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/70">
                {isEn ? 'AI Future Letter' : 'AI 未来信'}
              </p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                {isEn ? capsule.letterEn : capsule.letterZh}
              </p>
            </div>
          )}

          {/* 封印 */}
          {capsule && (
            <div className="mt-6 rounded-xl border border-amber-500/10 bg-amber-500/5 px-4 py-3">
              <p className="whitespace-pre-line text-center text-xs leading-relaxed text-amber-400/70">
                {isEn ? capsule.sealEn : capsule.sealZh}
              </p>
            </div>
          )}

          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-amber-500/3 blur-2xl" />
        </div>
      </div>

      {/* 右侧：操作区 */}
      <div className="order-1 flex flex-col justify-center space-y-5 lg:order-2">
        {/* AI 情绪回应 */}
        {capsule && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
          >
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-xs font-semibold text-zinc-400">
                {isEn ? 'AI Response' : 'AI 情绪回应'}
              </span>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-400">
              {isEn ? capsule.responseEn : capsule.responseZh}
            </p>
          </motion.div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSeal}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500/90 px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-amber-400 active:scale-[0.98]"
          >
            <Send size={16} />
            {isEn ? 'Seal Capsule' : '封存胶囊'}
          </button>
          <button
            onClick={handleReset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            <RotateCcw size={14} />
            {isEn ? 'Create Another' : '再生成一次'}
          </button>
        </div>
      </div>
    </motion.div>
  )

  // ---- 已封存 ----
  const renderSealed = () => (
    <motion.div
      key="sealed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex flex-col items-center justify-center py-16 text-center"
    >
      <Particles active />

      <motion.div
        className="relative mb-8 flex h-28 w-28 items-center justify-center"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-amber-500/10"
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full bg-amber-500/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 ring-1 ring-amber-500/40">
          <Clock size={28} className="text-amber-400" />
        </div>
      </motion.div>

      <motion.h2
        className="mb-2 text-2xl font-bold text-zinc-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {isEn ? 'Capsule Sealed' : '胶囊已封存'}
      </motion.h2>

      <motion.p
        className="mb-2 max-w-sm text-sm text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {isEn
          ? `Your message has been sealed and will open on ${futureDate || minDateStr}.`
          : `你的留言已被封印，将在 ${futureDate || minDateStr} 自动开启。`}
      </motion.p>

      {saved && (
        <motion.p
          className="mb-8 text-xs text-zinc-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {isEn ? '(Also saved to the cloud)' : '（已同步保存至云端）'}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
        >
          <RotateCcw size={14} />
          {isEn ? 'Create Another Capsule' : '制作新的胶囊'}
        </button>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="mx-auto max-w-4xl">
      <AnimatePresence mode="wait">
        {stage === 'input' && renderInput()}
        {stage === 'generating' && renderGenerating()}
        {stage === 'preview' && renderPreview()}
        {stage === 'sealed' && renderSealed()}
      </AnimatePresence>
    </div>
  )
}
