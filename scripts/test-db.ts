// 数据库连接测试脚本
// 运行: npx tsx scripts/test-db.ts

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// 手动解析 .env.local
const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const env: Record<string, string> = {}
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eq = trimmed.indexOf('=')
  if (eq === -1) continue
  env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1)
}

const url = env['NEXT_PUBLIC_SUPABASE_URL']
const key = env['NEXT_PUBLIC_SUPABASE_ANON_KEY']

if (!url || !key) {
  console.error('❌ 缺少环境变量，请检查 .env.local')
  process.exit(1)
}

console.log('Supabase URL:', url)
console.log('Anon Key:', key.slice(0, 20) + '...')

const supabase = createClient(url, key)

async function main() {
  // 1. 测试连接 — 查 categories
  console.log('\n--- 测试 categories 表 ---')
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')

  if (catError) {
    console.error('❌ categories 查询失败:', catError.message)
    console.error('   请确保已在 Supabase SQL Editor 中执行 sql/01_schema.sql 和 sql/02_seed.sql')
  } else if (!categories || categories.length === 0) {
    console.log('⚠️  categories 表存在但无数据')
    console.log('   请在 Supabase SQL Editor 中执行 sql/02_seed.sql')
  } else {
    console.log(`✅ categories: ${categories.length} 条记录`)
    for (const c of categories) {
      console.log(`   ${c.icon} ${c.name} (slug: ${c.slug})`)
    }
  }

  // 2. 测试 tools 表
  console.log('\n--- 测试 tools 表 ---')
  const { data: tools, error: toolError } = await supabase
    .from('tools')
    .select('*, categories!inner(name, slug)')
    .order('created_at')

  if (toolError) {
    console.error('❌ tools 查询失败:', toolError.message)
    console.error('   请确保已在 Supabase SQL Editor 中执行 sql/01_schema.sql')
  } else if (!tools || tools.length === 0) {
    console.log('⚠️  tools 表存在但无数据')
    console.log('   请在 Supabase SQL Editor 中执行 sql/02_seed.sql')
  } else {
    console.log(`✅ tools: ${tools.length} 条记录`)
    for (const t of tools) {
      const cat = (t as Record<string, unknown>).categories as Record<string, string> | null
      console.log(`   • ${t.name} [${cat?.name ?? '?'}] — ${t.pricing}`)
    }
  }

  // 3. 测试 RLS 策略
  console.log('\n--- 检查 RLS ---')
  const { data: rls } = await supabase
    .from('tools')
    .select('id', { count: 'exact', head: true })

  if (rls === null || rls === undefined) {
    console.log('⚠️  可能 RLS 未开启，或不允许匿名读取')
  } else {
    console.log('✅ 匿名读取正常')
  }

  console.log('\n========== 测试完成 ==========')
}

main().catch((err) => {
  console.error('❌ 未预期的错误:', err.message)
  process.exit(1)
})
