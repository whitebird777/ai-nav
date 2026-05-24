-- AI 工具导航站 — 种子数据
-- 在 Supabase SQL Editor 中执行此文件（先执行 01_schema.sql）

-- ===================== 分类 =====================

INSERT INTO categories (slug, name, name_en, icon, sort_order) VALUES
  ('chat',        'AI 聊天',   'AI Chat',       '💬', 1),
  ('image',       'AI 图像',   'AI Image',       '🖼️', 2),
  ('video',       'AI 视频',   'AI Video',       '🎬', 3),
  ('writing',     'AI 写作',   'AI Writing',     '✍️', 4),
  ('productivity','AI 效率',   'AI Productivity', '⚡', 5),
  ('code',        'AI 编程',   'AI Coding',      '💻', 6)
ON CONFLICT (slug) DO NOTHING;

-- ===================== 工具 =====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
  (
    'chatgpt',
    'ChatGPT',
    'OpenAI 出品的智能对话助手，支持写作、编程、分析等多种任务。',
    'https://chatgpt.com',
    (SELECT id FROM categories WHERE slug = 'chat'),
    ARRAY['对话', '多模态', 'GPT'],
    'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    'freemium',
    TRUE
  ),
  (
    'midjourney',
    'Midjourney',
    '目前最流行的 AI 图像生成工具，艺术风格丰富。',
    'https://www.midjourney.com',
    (SELECT id FROM categories WHERE slug = 'image'),
    ARRAY['图像生成', '艺术'],
    'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    'paid',
    TRUE
  ),
  (
    'sora',
    'Sora',
    'OpenAI 推出的文本生成视频工具，画质惊人。',
    'https://sora.com',
    (SELECT id FROM categories WHERE slug = 'video'),
    ARRAY['视频生成', '文本转视频'],
    NULL,
    'paid',
    FALSE
  ),
  (
    'notion-ai',
    'Notion AI',
    '集成在 Notion 中的 AI 写作助手，帮你整理思路、改写内容。',
    'https://www.notion.so/product/ai',
    (SELECT id FROM categories WHERE slug = 'writing'),
    ARRAY['写作', '笔记', '文档'],
    'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    'freemium',
    FALSE
  ),
  (
    'cursor',
    'Cursor',
    '基于 VS Code 的 AI 编程编辑器，深度集成 AI 辅助编程。',
    'https://cursor.sh',
    (SELECT id FROM categories WHERE slug = 'code'),
    ARRAY['编程', 'IDE', '代码生成'],
    NULL,
    'freemium',
    TRUE
  ),
  (
    'gamma',
    'Gamma',
    'AI 驱动的演示文稿工具，输入一句话即可生成 PPT。',
    'https://gamma.app',
    (SELECT id FROM categories WHERE slug = 'productivity'),
    ARRAY['PPT', '演示', '文档'],
    NULL,
    'freemium',
    FALSE
  ),
  (
    'deepseek',
    'DeepSeek',
    '国产大模型，免费使用，中文理解能力强。',
    'https://chat.deepseek.com',
    (SELECT id FROM categories WHERE slug = 'chat'),
    ARRAY['对话', '国产', '免费'],
    NULL,
    'free',
    TRUE
  ),
  (
    'kling',
    '可灵 Kling',
    '快手的 AI 视频生成工具，效果惊艳。',
    'https://kling.kuaishou.com',
    (SELECT id FROM categories WHERE slug = 'video'),
    ARRAY['视频生成', '国产'],
    NULL,
    'freemium',
    FALSE
  )
ON CONFLICT (slug) DO NOTHING;
