-- AI 工具导航站 Phase 2 — 扩充工具数据
-- 新增 7 个分类 + 50+ 真实 AI 工具
-- 在 Supabase SQL Editor 中执行

-- ==================== 新增分类 ====================

INSERT INTO categories (slug, name, name_en, icon, sort_order) VALUES
  ('music',     'AI 音乐',   'AI Music',      '🎵', 7),
  ('ppt',       'AI PPT',    'AI PPT',         '📊', 8),
  ('search',    'AI 搜索',   'AI Search',      '🔍', 9),
  ('agent',     'AI Agent',  'AI Agent',       '🤖', 10),
  ('translate', 'AI 翻译',   'AI Translate',   '🌐', 11),
  ('office',    'AI 办公',   'AI Office',      '💼', 12),
  ('design',    'AI 设计',   'AI Design',      '🎨', 13)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 聊天（补充） ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'claude',
  'Claude',
  'Anthropic 开发的 AI 助手，擅长长文本理解和创意写作，支持 200K 上下文窗口。',
  'https://claude.ai',
  (SELECT id FROM categories WHERE slug = 'chat'),
  ARRAY['对话', '长文本', '写作'],
  'https://claude.ai/favicon.ico',
  'freemium',
  TRUE
),
(
  'gemini',
  'Gemini',
  'Google 推出的多模态 AI 模型，深度集成 Google 生态，支持文本、图片、代码分析。',
  'https://gemini.google.com',
  (SELECT id FROM categories WHERE slug = 'chat'),
  ARRAY['对话', '多模态', 'Google'],
  'https://www.google.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'tongyi',
  '通义千问',
  '阿里云推出的中文大模型，支持对话、文档分析、代码生成等多种场景。',
  'https://tongyi.aliyun.com',
  (SELECT id FROM categories WHERE slug = 'chat'),
  ARRAY['对话', '国产', '阿里'],
  'https://tongyi.aliyun.com/favicon.ico',
  'free',
  TRUE
),
(
  'kimi',
  'Kimi',
  '月之暗面出品的长文本 AI 助手，支持 200 万字超长上下文，擅长文档阅读和分析。',
  'https://kimi.moonshot.cn',
  (SELECT id FROM categories WHERE slug = 'chat'),
  ARRAY['对话', '长文本', '国产'],
  'https://kimi.moonshot.cn/favicon.ico',
  'free',
  FALSE
),
(
  'doubao',
  '豆包',
  '字节跳动出品的 AI 对话助手，支持网页、App、小程序多端使用，中文体验流畅。',
  'https://www.doubao.com',
  (SELECT id FROM categories WHERE slug = 'chat'),
  ARRAY['对话', '国产', '字节'],
  'https://www.doubao.com/favicon.ico',
  'free',
  FALSE
),
(
  'poe',
  'Poe',
  'Quora 出品的 AI 聚合平台，在一个界面使用 Claude、GPT、Gemini 等多种模型。',
  'https://poe.com',
  (SELECT id FROM categories WHERE slug = 'chat'),
  ARRAY['对话', '聚合', '多模型'],
  'https://poe.com/favicon.ico',
  'freemium',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 图像（补充） ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'dall-e',
  'DALL-E',
  'OpenAI 出品的 AI 图像生成工具，集成在 ChatGPT 中，文本理解能力强。',
  'https://openai.com/index/dall-e-3/',
  (SELECT id FROM categories WHERE slug = 'image'),
  ARRAY['图像生成', 'OpenAI'],
  'https://openai.com/favicon.ico',
  'paid',
  FALSE
),
(
  'stable-diffusion',
  'Stable Diffusion',
  '开源 AI 图像生成模型，支持本地部署，社区生态丰富，可控性极强。',
  'https://stability.ai',
  (SELECT id FROM categories WHERE slug = 'image'),
  ARRAY['图像生成', '开源', '本地部署'],
  'https://stability.ai/favicon.ico',
  'freemium',
  TRUE
),
(
  'leonardo',
  'Leonardo AI',
  '面向游戏和创意行业的 AI 图像生成平台，素材质量高，支持模型训练。',
  'https://leonardo.ai',
  (SELECT id FROM categories WHERE slug = 'image'),
  ARRAY['图像生成', '游戏', '素材'],
  'https://leonardo.ai/favicon.ico',
  'freemium',
  FALSE
),
(
  'yige',
  '文心一格',
  '百度推出的 AI 艺术创作平台，基于文心大模型，中文提示词理解优秀。',
  'https://yige.baidu.com',
  (SELECT id FROM categories WHERE slug = 'image'),
  ARRAY['图像生成', '国产', '百度'],
  'https://yige.baidu.com/favicon.ico',
  'free',
  FALSE
),
(
  'jimeng',
  '即梦',
  '字节跳动旗下的 AI 图像与视频创作平台，中文创意生成效果好。',
  'https://jimeng.jianying.com',
  (SELECT id FROM categories WHERE slug = 'image'),
  ARRAY['图像生成', '视频生成', '国产'],
  NULL,
  'freemium',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 视频（补充） ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'runway',
  'Runway',
  '专业级 AI 视频生成和编辑平台，支持文生视频、图生视频、视频编辑等功能。',
  'https://runwayml.com',
  (SELECT id FROM categories WHERE slug = 'video'),
  ARRAY['视频生成', '视频编辑', '专业'],
  'https://runwayml.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'pika',
  'Pika',
  '快速 AI 视频生成工具，操作简单，支持文本和图片生成创意短视频。',
  'https://pika.art',
  (SELECT id FROM categories WHERE slug = 'video'),
  ARRAY['视频生成', '短视频'],
  'https://pika.art/favicon.ico',
  'freemium',
  FALSE
),
(
  'heygen',
  'HeyGen',
  'AI 数字人视频生成平台，支持虚拟主播、多语言配音和口型同步。',
  'https://www.heygen.com',
  (SELECT id FROM categories WHERE slug = 'video'),
  ARRAY['数字人', '视频生成', '配音'],
  'https://www.heygen.com/favicon.ico',
  'paid',
  FALSE
),
(
  'jianying',
  '剪映',
  '字节跳动旗下视频编辑工具，集成 AI 剪辑、AI 调色、AI 字幕等功能。',
  'https://www.jianying.com',
  (SELECT id FROM categories WHERE slug = 'video'),
  ARRAY['视频编辑', 'AI剪辑', '国产'],
  'https://www.jianying.com/favicon.ico',
  'free',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 写作（补充） ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'jasper',
  'Jasper',
  '面向营销团队的 AI 内容生成平台，支持博客、社媒、广告文案等多种内容类型。',
  'https://www.jasper.ai',
  (SELECT id FROM categories WHERE slug = 'writing'),
  ARRAY['写作', '营销', '英文'],
  'https://www.jasper.ai/favicon.ico',
  'paid',
  FALSE
),
(
  'copy-ai',
  'Copy.ai',
  'AI 营销文案生成工具，提供丰富的模板和工作流，适合增长团队使用。',
  'https://www.copy.ai',
  (SELECT id FROM categories WHERE slug = 'writing'),
  ARRAY['写作', '营销', '文案'],
  'https://www.copy.ai/favicon.ico',
  'freemium',
  FALSE
),
(
  'grammarly',
  'Grammarly',
  '全球领先的 AI 英语写作助手，实时检查语法、拼写、语气和原创性。',
  'https://www.grammarly.com',
  (SELECT id FROM categories WHERE slug = 'writing'),
  ARRAY['写作', '语法', '英语'],
  'https://www.grammarly.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'xinghuo',
  '讯飞星火',
  '科大讯飞出品的 AI 大模型，在语音识别和中文写作方面表现出色。',
  'https://xinghuo.xfyun.cn',
  (SELECT id FROM categories WHERE slug = 'writing'),
  ARRAY['写作', '语音', '国产'],
  'https://xinghuo.xfyun.cn/favicon.ico',
  'free',
  FALSE
),
(
  'yiyan',
  '文心一言',
  '百度出品的大语言模型，支持写作、问答、翻译等多种中文场景。',
  'https://yiyan.baidu.com',
  (SELECT id FROM categories WHERE slug = 'writing'),
  ARRAY['写作', '对话', '百度'],
  'https://yiyan.baidu.com/favicon.ico',
  'free',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 效率（补充） ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'monica',
  'Monica',
  'All-in-One AI 助手浏览器扩展，集成搜索、阅读、写作、翻译于一体。',
  'https://monica.im',
  (SELECT id FROM categories WHERE slug = 'productivity'),
  ARRAY['浏览器扩展', '搜索', '写作'],
  'https://monica.im/favicon.ico',
  'freemium',
  FALSE
),
(
  'metaso',
  '秘塔AI',
  '中文 AI 搜索引擎，无广告直达答案，支持学术搜索和深度分析。',
  'https://metaso.cn',
  (SELECT id FROM categories WHERE slug = 'productivity'),
  ARRAY['搜索', '研究', '国产'],
  'https://metaso.cn/favicon.ico',
  'free',
  TRUE
),
(
  'taskade',
  'Taskade',
  'AI 驱动的团队协作和项目管理工具，内置 AI Agent 自动化工作流。',
  'https://www.taskade.com',
  (SELECT id FROM categories WHERE slug = 'productivity'),
  ARRAY['项目管理', '协作', 'AI Agent'],
  'https://www.taskade.com/favicon.ico',
  'freemium',
  FALSE
),
(
  'mem',
  'Mem',
  'AI 笔记应用，自动整理和关联你的知识，让笔记自己找到你。',
  'https://get.mem.ai',
  (SELECT id FROM categories WHERE slug = 'productivity'),
  ARRAY['笔记', '知识管理', 'AI'],
  'https://get.mem.ai/favicon.ico',
  'freemium',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 编程（补充） ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'github-copilot',
  'GitHub Copilot',
  'GitHub 出品的 AI 编程助手，深度集成 VS Code 和 JetBrains，开发者标配。',
  'https://github.com/features/copilot',
  (SELECT id FROM categories WHERE slug = 'code'),
  ARRAY['编程', '代码补全', 'IDE'],
  'https://github.com/favicon.ico',
  'paid',
  TRUE
),
(
  'replit',
  'Replit',
  '在线 IDE + AI 编程助手，浏览器中即可完成开发、部署、协作。',
  'https://replit.com',
  (SELECT id FROM categories WHERE slug = 'code'),
  ARRAY['编程', '在线IDE', '部署'],
  'https://replit.com/favicon.ico',
  'freemium',
  FALSE
),
(
  'v0',
  'v0 by Vercel',
  'Vercel 出品的 AI 前端生成工具，用自然语言描述即可生成 React/Tailwind 页面。',
  'https://v0.dev',
  (SELECT id FROM categories WHERE slug = 'code'),
  ARRAY['前端', 'UI生成', 'React'],
  'https://v0.dev/favicon.ico',
  'freemium',
  TRUE
),
(
  'bolt',
  'Bolt.new',
  'StackBlitz 出品的 AI 全栈应用生成器，在浏览器中即时创建和部署应用。',
  'https://bolt.new',
  (SELECT id FROM categories WHERE slug = 'code'),
  ARRAY['全栈', '在线开发', '部署'],
  'https://bolt.new/favicon.ico',
  'freemium',
  TRUE
),
(
  'windsurf',
  'Windsurf',
  'Codeium 出品的 AI IDE，基于 VS Code，内置强大的 AI 代码生成和重构能力。',
  'https://codeium.com/windsurf',
  (SELECT id FROM categories WHERE slug = 'code'),
  ARRAY['编程', 'IDE', '代码生成'],
  'https://codeium.com/favicon.ico',
  'freemium',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 音乐 ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'suno',
  'Suno',
  '目前最流行的 AI 音乐生成工具，输入歌词和风格即可生成完整歌曲，质量惊艳。',
  'https://suno.ai',
  (SELECT id FROM categories WHERE slug = 'music'),
  ARRAY['音乐生成', '作词作曲', 'AI歌手'],
  'https://suno.ai/favicon.ico',
  'freemium',
  TRUE
),
(
  'udio',
  'Udio',
  '由前 Google DeepMind 团队打造的 AI 音乐生成器，音质细腻，风格多样。',
  'https://www.udio.com',
  (SELECT id FROM categories WHERE slug = 'music'),
  ARRAY['音乐生成', '高品质'],
  'https://www.udio.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'aiva',
  'AIVA',
  'AI 古典音乐和影视配乐生成工具，被专业作曲家和电影制作人使用。',
  'https://www.aiva.ai',
  (SELECT id FROM categories WHERE slug = 'music'),
  ARRAY['音乐生成', '古典', '配乐'],
  'https://www.aiva.ai/favicon.ico',
  'freemium',
  FALSE
),
(
  'mubert',
  'Mubert',
  'AI 背景音乐生成平台，适合视频创作者、主播和商业场景使用。',
  'https://mubert.com',
  (SELECT id FROM categories WHERE slug = 'music'),
  ARRAY['音乐生成', '背景音乐', '商用'],
  'https://mubert.com/favicon.ico',
  'freemium',
  FALSE
),
(
  'soundraw',
  'Soundraw',
  'AI 免版税音乐生成器，可按情绪、风格、时长自定义，适合内容创作者。',
  'https://soundraw.io',
  (SELECT id FROM categories WHERE slug = 'music'),
  ARRAY['音乐生成', '免版税', '背景音乐'],
  'https://soundraw.io/favicon.ico',
  'freemium',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI PPT ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'beautiful-ai',
  'Beautiful.ai',
  'AI 驱动的演示文稿工具，智能排版，自动美化，告别手动调整。',
  'https://www.beautiful.ai',
  (SELECT id FROM categories WHERE slug = 'ppt'),
  ARRAY['PPT', '演示', '智能排版'],
  'https://www.beautiful.ai/favicon.ico',
  'paid',
  FALSE
),
(
  'tome',
  'Tome',
  'AI 演示和故事讲述工具，输入主题即可快速生成结构化的演示文稿。',
  'https://tome.app',
  (SELECT id FROM categories WHERE slug = 'ppt'),
  ARRAY['PPT', '演示', '故事化'],
  'https://tome.app/favicon.ico',
  'freemium',
  TRUE
),
(
  'slidesai',
  'SlidesAI',
  'Google Slides 的 AI 插件，自动将文本转换为精美的演示幻灯片。',
  'https://www.slidesai.io',
  (SELECT id FROM categories WHERE slug = 'ppt'),
  ARRAY['PPT', 'GoogleSlides', '插件'],
  'https://www.slidesai.io/favicon.ico',
  'freemium',
  FALSE
),
(
  'decktopus',
  'Decktopus',
  'AI 演示文稿制作工具，内置表单、支付和数据分析功能，适合商务场景。',
  'https://www.decktopus.com',
  (SELECT id FROM categories WHERE slug = 'ppt'),
  ARRAY['PPT', '演示', '商务'],
  'https://www.decktopus.com/favicon.ico',
  'freemium',
  FALSE
),
(
  'prezi',
  'Prezi',
  '老牌演示工具推出 AI 功能，支持动态缩放画布和 AI 辅助内容生成。',
  'https://prezi.com',
  (SELECT id FROM categories WHERE slug = 'ppt'),
  ARRAY['PPT', '演示', '动态'],
  'https://prezi.com/favicon.ico',
  'freemium',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 搜索 ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'perplexity',
  'Perplexity',
  'AI 原生的搜索引擎，直接给出带引用来源的答案，被誉为 Google 杀手。',
  'https://www.perplexity.ai',
  (SELECT id FROM categories WHERE slug = 'search'),
  ARRAY['搜索', '引用', '研究'],
  'https://www.perplexity.ai/favicon.ico',
  'freemium',
  TRUE
),
(
  'you',
  'You.com',
  '注重隐私的 AI 搜索引擎，支持多种 AI 模型切换，不追踪用户。',
  'https://you.com',
  (SELECT id FROM categories WHERE slug = 'search'),
  ARRAY['搜索', '隐私', '多模型'],
  'https://you.com/favicon.ico',
  'freemium',
  FALSE
),
(
  'phind',
  'Phind',
  '面向开发者的 AI 搜索引擎，擅长技术问答和代码搜索。',
  'https://www.phind.com',
  (SELECT id FROM categories WHERE slug = 'search'),
  ARRAY['搜索', '编程', '技术'],
  'https://www.phind.com/favicon.ico',
  'free',
  FALSE
),
(
  'devv',
  'Devv',
  '中文开发者 AI 搜索引擎，专注编程和技术领域的内容检索。',
  'https://devv.ai',
  (SELECT id FROM categories WHERE slug = 'search'),
  ARRAY['搜索', '编程', '国产'],
  'https://devv.ai/favicon.ico',
  'free',
  FALSE
),
(
  'tiangong',
  '天工AI',
  '昆仑万维推出的 AI 搜索引擎，支持多模态搜索和深度分析。',
  'https://search.tiangong.cn',
  (SELECT id FROM categories WHERE slug = 'search'),
  ARRAY['搜索', '多模态', '国产'],
  NULL,
  'free',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI Agent ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'coze',
  'Coze',
  '字节跳动出品的 AI Bot 构建平台，支持插件、知识库和工作流编排。',
  'https://www.coze.com',
  (SELECT id FROM categories WHERE slug = 'agent'),
  ARRAY['Agent', 'Bot构建', '字节'],
  'https://www.coze.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'dify',
  'Dify',
  '开源的 AI 应用开发平台，支持 RAG、Agent 和工作流可视化编排。',
  'https://dify.ai',
  (SELECT id FROM categories WHERE slug = 'agent'),
  ARRAY['Agent', '开源', 'RAG'],
  'https://dify.ai/favicon.ico',
  'freemium',
  TRUE
),
(
  'kouzi',
  '扣子',
  'Coze 的中国版，国内用户可直接使用，集成豆包大模型。',
  'https://www.coze.cn',
  (SELECT id FROM categories WHERE slug = 'agent'),
  ARRAY['Agent', 'Bot构建', '国产'],
  'https://www.coze.cn/favicon.ico',
  'free',
  FALSE
),
(
  'autogpt',
  'AutoGPT',
  '开源自主 AI Agent，能够自主规划和执行多步骤任务，AI Agent 先驱。',
  'https://agpt.co',
  (SELECT id FROM categories WHERE slug = 'agent'),
  ARRAY['Agent', '自动任务', '开源'],
  'https://agpt.co/favicon.ico',
  'freemium',
  FALSE
),
(
  'agentgpt',
  'AgentGPT',
  '在浏览器中创建和运行自主 AI Agent，无需编程即可配置任务目标。',
  'https://agentgpt.reworkd.ai',
  (SELECT id FROM categories WHERE slug = 'agent'),
  ARRAY['Agent', '浏览器', '免代码'],
  NULL,
  'free',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 翻译 ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'deepl',
  'DeepL',
  '全球公认翻译质量最好的 AI 翻译工具，支持 30+ 语言，商务级翻译。',
  'https://www.deepl.com',
  (SELECT id FROM categories WHERE slug = 'translate'),
  ARRAY['翻译', '高精度', '商务'],
  'https://www.deepl.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'baidu-translate',
  '百度翻译',
  '百度出品的免费翻译工具，支持 200+ 语言，中文翻译效果优秀。',
  'https://fanyi.baidu.com',
  (SELECT id FROM categories WHERE slug = 'translate'),
  ARRAY['翻译', '免费', '百度'],
  'https://fanyi.baidu.com/favicon.ico',
  'free',
  FALSE
),
(
  'caiyun',
  '彩云小译',
  'AI 驱动的实时翻译工具，支持双语对照阅读，适合浏览外文网页。',
  'https://caiyunai.com',
  (SELECT id FROM categories WHERE slug = 'translate'),
  ARRAY['翻译', '双语对照', '插件'],
  NULL,
  'freemium',
  FALSE
),
(
  'reverso',
  'Reverso',
  'AI 翻译和语言学习工具，提供上下文例句，帮助理解词汇用法。',
  'https://www.reverso.net',
  (SELECT id FROM categories WHERE slug = 'translate'),
  ARRAY['翻译', '语言学习', '例句'],
  'https://www.reverso.net/favicon.ico',
  'freemium',
  FALSE
),
(
  'volcengine-translate',
  '火山翻译',
  '字节跳动旗下的 AI 翻译服务，支持文本、文档、图片、视频翻译。',
  'https://translate.volcengine.com',
  (SELECT id FROM categories WHERE slug = 'translate'),
  ARRAY['翻译', '多模态', '字节'],
  NULL,
  'free',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 办公 ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'microsoft-copilot',
  'Microsoft Copilot',
  '微软出品的 AI 助手，深度集成 Windows、Edge 和 Microsoft 365 全家桶。',
  'https://copilot.microsoft.com',
  (SELECT id FROM categories WHERE slug = 'office'),
  ARRAY['办公', '微软', '集成'],
  'https://copilot.microsoft.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'wps-ai',
  'WPS AI',
  '金山办公推出的 AI 办公助手，集成在 WPS 中，支持文档、表格、PPT。',
  'https://www.wps.ai',
  (SELECT id FROM categories WHERE slug = 'office'),
  ARRAY['办公', 'WPS', '国产'],
  'https://www.wps.ai/favicon.ico',
  'freemium',
  TRUE
),
(
  'feishu',
  '飞书智能伙伴',
  '飞书内置的 AI 助手，支持会议纪要、文档总结、消息摘要等办公场景。',
  'https://www.feishu.cn',
  (SELECT id FROM categories WHERE slug = 'office'),
  ARRAY['办公', '协作', '字节'],
  'https://www.feishu.cn/favicon.ico',
  'freemium',
  FALSE
),
(
  'dingtalk',
  '钉钉AI',
  '钉钉内置的 AI 助理，支持智能问答、流程自动化、数据分析。',
  'https://www.dingtalk.com',
  (SELECT id FROM categories WHERE slug = 'office'),
  ARRAY['办公', '协作', '阿里'],
  'https://www.dingtalk.com/favicon.ico',
  'free',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI 设计 ====================

INSERT INTO tools (slug, name, description, url, category_id, tags, logo_url, pricing, featured) VALUES
(
  'canva',
  'Canva',
  '全球最流行的在线设计平台，AI 功能丰富，支持海报、Logo、社媒图片等。',
  'https://www.canva.com',
  (SELECT id FROM categories WHERE slug = 'design'),
  ARRAY['设计', '在线', '全能'],
  'https://www.canva.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'figma',
  'Figma AI',
  '设计师首选的 UI/UX 设计工具，AI 功能帮助快速生成设计稿和组件。',
  'https://www.figma.com',
  (SELECT id FROM categories WHERE slug = 'design'),
  ARRAY['UI设计', '协作', '专业'],
  'https://www.figma.com/favicon.ico',
  'freemium',
  TRUE
),
(
  'gaoding',
  '稿定设计',
  '中文在线设计平台，海量模板 + AI 功能，适合新媒体运营和电商设计。',
  'https://www.gaoding.com',
  (SELECT id FROM categories WHERE slug = 'design'),
  ARRAY['设计', '模板', '新媒体'],
  'https://www.gaoding.com/favicon.ico',
  'freemium',
  FALSE
),
(
  'looka',
  'Looka',
  'AI Logo 和品牌形象设计工具，输入偏好即可生成全套品牌视觉方案。',
  'https://looka.com',
  (SELECT id FROM categories WHERE slug = 'design'),
  ARRAY['Logo设计', '品牌', 'AI设计'],
  'https://looka.com/favicon.ico',
  'paid',
  FALSE
),
(
  'js-design',
  '即时设计',
  '国产在线 UI 设计协作工具，对标 Figma，内置 AI 设计助手。',
  'https://js.design',
  (SELECT id FROM categories WHERE slug = 'design'),
  ARRAY['UI设计', '协作', '国产'],
  'https://js.design/favicon.ico',
  'free',
  FALSE
),
(
  'logoai',
  'LogoAI',
  'AI Logo 设计工具，自动生成专业 Logo，支持多种风格和格式导出。',
  'https://www.logoai.com',
  (SELECT id FROM categories WHERE slug = 'design'),
  ARRAY['Logo设计', '品牌', 'AI设计'],
  'https://www.logoai.com/favicon.ico',
  'paid',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;
