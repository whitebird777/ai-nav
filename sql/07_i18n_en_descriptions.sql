-- AI Nav P3-T1 — English tool descriptions
-- Sets description_en for all 72 tools for the /en locale
-- Execute in Supabase SQL Editor

-- ==================== AI Chat ====================

UPDATE tools SET description_en = 'OpenAI''s flagship AI chat assistant, built on the GPT series of large language models. Supporting text conversations, code generation, image understanding, data analysis, and more, ChatGPT has become one of the most widely used AI products globally since its launch in late 2022, continuously leading the frontier of large model development.

Core features include natural language conversation, web search (ChatGPT Search), image generation (integrated DALL-E), code interpreter (data analysis and visualization), file upload analysis, GPTs custom bots, voice conversation, and more. Plus and Pro tiers unlock access to more advanced models and longer context windows.

Suitable for everyday Q&A, learning support, copywriting, code debugging, data analysis, brainstorming, and virtually every aspect of work and life. Students can use it for homework help and learning, while professionals can leverage it for report writing and data organization.

Ideal for anyone looking to boost work and study productivity — from students and teachers to developers, entrepreneurs, and enterprise employees. The free tier covers basic needs, while paid plans suit heavy users and professional scenarios.

OpenAI''s continuously iterated flagship, with industry-leading model capabilities, a rich ecosystem of plugins and GPTs, making it one of the most comprehensively capable AI assistants available today.'
WHERE slug = 'chatgpt';

UPDATE tools SET description_en = 'Anthropic''s AI assistant, renowned for safety, reliability, and exceptional long-text comprehension. Claude supports a context window of up to 200K tokens, capable of processing entire books or large document collections in a single pass, excelling particularly at long-form summarization, deep analysis, and creative writing.

Core features include ultra-long text understanding and analysis (200K context), code generation and review, multi-document comparison, creative writing and editing, data extraction and structured output, Artifacts for visual content preview, and Projects for team collaboration. Claude Opus is the most powerful model, while Sonnet strikes an excellent balance between speed and capability.

Suitable for academic research, legal document analysis, technical documentation, long-form content creation, code review and refactoring, multilingual translation, and other scenarios requiring deep understanding and high-quality output. Particularly valuable for researchers and content creators dealing with large volumes of text.

Ideal for scholars, researchers, lawyers, software engineers, technical writers, editors, and other professionals who demand high content quality and accuracy. Also an excellent choice for enterprises prioritizing AI safety and response quality.

Anthropic''s Constitutional AI training methodology ensures model behavior aligned with human values, with industry-leading safety performance. The 200K context window provides a decisive advantage when processing very long documents, making it the go-to solution for enterprise-grade text processing.'
WHERE slug = 'claude';

UPDATE tools SET description_en = 'Google''s multimodal AI model family, deeply integrated with the Google ecosystem (Gmail, Docs, YouTube, Search, etc.), supporting text, images, audio, video, and code inputs. The Gemini series spans Ultra, Pro, Flash, and Nano editions, covering scenarios from cloud to on-device deployment.

Core features include multimodal understanding (text, image, audio, video), ultra-long context (Gemini 2.0 supports 2 million tokens), Google app integration (Gmail summarization, Docs writing assistance), Gemini Live voice conversations, Deep Research for in-depth investigation, code generation and debugging, and YouTube video content analysis.

Suitable for daily Q&A, email handling, document writing, code development, video content analysis, deep research, and more. The deep integration with Google''s ecosystem makes it particularly efficient in office productivity scenarios, usable directly within Gmail, Docs, and other applications.

Ideal for heavy Google ecosystem users, Android phone users, developers (via Google AI Studio and Vertex AI), researchers, and students. The free tier is feature-rich, while Gemini Advanced unlocks stronger capabilities.

Backed by Google''s formidable technical strength and search capabilities, multimodal understanding and ultra-long context are its key differentiators. Deep integration with the Google suite dramatically lowers the barrier to entry, making it one of the most ecosystem-advantaged AI assistants.'
WHERE slug = 'gemini';

UPDATE tools SET description_en = 'Alibaba Cloud''s large language model series, supporting conversation, document analysis, code generation, and more. Tongyi Qianwen excels in Chinese language understanding, with deep optimization for Chinese culture, business practices, and linguistic conventions, making it a top choice for enterprise users in China.

Core features include multi-turn dialogue, long document analysis and Q&A (supporting 10 million tokens of context), code generation and explanation, image understanding, PPT generation, Tongyi Tingwu (audio/video transcription and analysis), Tongyi Wanxiang (AI image generation), and more. Multiple versions of the Tongyi Qianwen series have been open-sourced for developers to deploy freely.

Suitable for enterprise knowledge management, customer service Q&A, document processing, meeting minutes organization, code development assistance, content creation, and more. Widely deployed in Chinese enterprise service scenarios and deeply integrated into Alibaba ecosystem products like DingTalk.

Ideal for enterprise users in China, developers, students, and general users. An excellent choice for those needing Chinese-optimized AI and domestic cloud service support. Enterprise users can customize and deploy privately via the Alibaba Cloud Bailian platform.

Alibaba Cloud''s powerful cloud computing infrastructure ensures service stability. First-class Chinese understanding and domestic scenario adaptation, combined with an open-source strategy that fosters developer community growth, make it a reliable choice for enterprise-grade AI applications.'
WHERE slug = 'tongyi';

UPDATE tools SET description_en = 'Moonshot AI''s long-text AI assistant, which rapidly gained popularity for its powerful ultra-long context processing capabilities. Kimi supports a context window of up to 2 million Chinese characters, capable of processing and deeply understanding massive documents in a single pass, standing out uniquely in document reading, research, and analysis.

Core features include ultra-long text understanding and analysis (2 million characters), simultaneous multi-file upload and comparative analysis, web search and information synthesis, code generation and debugging, webpage content extraction and analysis, image text recognition (OCR), and professional report generation. Kimi also offers a browser extension for convenient on-demand access.

Suitable for academic paper reading, legal contract review, technical document analysis, market research report writing, novel reading and summarization, and other scenarios requiring deep understanding of large text volumes. Particularly valuable for knowledge workers who need to rapidly digest substantial information.

Ideal for graduate students, scholars, lawyers, financial analysts, consultants, journalists, and editors — professionals in information-intensive roles. For anyone who frequently needs to read and analyze long documents, Kimi is a productivity game-changer.

The 2-million-character ultra-long context window is its core competitive advantage, surpassing competitors in both depth and breadth of document understanding. Natural and fluent Chinese comprehension paired with generous free quotas make it the go-to tool for long-text AI scenarios in China.'
WHERE slug = 'kimi';

UPDATE tools SET description_en = 'ByteDance''s AI chat assistant, available across web, mobile app, mini-program, and desktop client. Doubao is powered by ByteDance''s self-developed Doubao large model (ByteDance LLM), delivering a smooth and natural Chinese conversation experience, with a leading user base in China''s domestic AI assistant market.

Core features include multi-turn dialogue, image generation and understanding, AI-powered web search, document analysis (supporting PDF, Word, PPT, and more formats), webpage content extraction, AI drawing, AI character roleplay, and voice cloning. Doubao also supports creating personalized AI agents to meet diverse scenario needs.

Suitable for everyday chatting, knowledge Q&A, content creation, learning support, entertainment and interaction, and a wide range of other scenarios. Doubao''s multi-device sync ensures a consistent experience across all usage environments, with a particularly excellent mobile experience.

Ideal for general users in China, students, content creators, and more. Doubao''s free pricing and low barrier to entry make it one of the most accessible AI assistants in China. The top choice for users seeking an excellent Chinese conversation experience at no cost.

ByteDance''s strong product capabilities and traffic ecosystem provide Doubao with a broad user foundation. A completely free pricing model eliminates barriers to entry, and multi-device coverage with Chinese experience optimization gives it strong competitive momentum in the domestic market.'
WHERE slug = 'doubao';

UPDATE tools SET description_en = 'Quora''s AI model aggregation platform, allowing users to access multiple mainstream AI models — including Claude, GPT, Gemini, Llama, and more — from a single interface. Poe''s core value lies in eliminating the need to switch between multiple AI services, offering a one-stop experience of different models'' capabilities and styles.

Core features include multi-model aggregated access, model comparison (viewing different models'' responses to the same question), custom Bot creation (with customizable prompts and knowledge bases), a community-shared Bot marketplace, image generation, file analysis, and web search. Poe also supports developers in publishing their own AI Bots via API.

Suitable for model capability comparison and testing, selecting the optimal model for different tasks, community AI application exploration, and rapid prototype validation. When you''re unsure which model best fits your current task, Poe''s multi-model comparison is exceptionally useful.

Ideal for AI enthusiasts, developers, product managers, and anyone who wants to compare and experience different AI models. For users wanting access to multiple top-tier AI models on one platform without managing separate subscriptions, Poe offers convenient unified pricing.

Multi-model aggregation is Poe''s unique selling point — users can choose the best model for each task without registering and paying for each service separately. The community Bot ecosystem enriches the usage scenarios, making it the best entry point for AI model exploration and comparison.'
WHERE slug = 'poe';

UPDATE tools SET description_en = 'DeepSeek''s domestically-produced large model, which has garnered worldwide attention for its powerful reasoning capabilities and completely free pricing. DeepSeek excels in mathematical reasoning, code generation, and logical analysis, with its open-source models receiving extremely high praise from the global developer community.

Core features include deep reasoning (DeepSeek-R1''s chain-of-thought reasoning), web search, file upload analysis (supporting images, PDF, Word, Excel, and more formats), ultra-long context (128K tokens), code generation and debugging, and mathematical problem solving. DeepSeek also provides API access for developers.

Suitable for mathematical reasoning, programming and development, academic research, logical analysis, complex problem solving, content creation, and more. Its powerful reasoning capabilities make it particularly outstanding in tasks requiring rigorous logic and deep thinking.

Ideal for developers, researchers, students, mathematics enthusiasts, and professional users with high demands for AI reasoning capabilities. The completely free pricing makes it the top choice for users on a budget who still seek high-quality AI services.

Powerful reasoning capabilities (especially the R1 model) and completely free pricing are DeepSeek''s core strengths. Its open-source strategy and technical transparency have earned the trust of the global developer community, making it one of the most internationally recognized representatives of Chinese AI companies'' technical prowess.'
WHERE slug = 'deepseek';

-- ==================== AI Image ====================

UPDATE tools SET description_en = 'Currently the world''s most popular AI image generation tool, renowned for its unique artistic style and exceptionally high image quality. Midjourney operates on the Discord platform, where users generate high-quality images through text prompts, covering styles from photorealism and illustration to concept art and product design.

Core features include text-to-image generation, image style transfer, image upscaling and enhancement, consistent character generation (--cref parameter), style referencing (--sref parameter), image blending and repainting, and detail refinement with iterative optimization. Version 6 has reached new heights in prompt comprehension and image realism.

Suitable for concept art creation, product prototype design, brand visual design, social media content creation, game art, architectural visualization, illustration, and more. Designers can rapidly produce creative concepts, while content creators can generate companion imagery.

Ideal for designers, artists, creative professionals, game developers, architects, content creators, brand marketers, and anyone needing high-quality visual content. Creators with a certain level of artistic sensibility will benefit most.

Midjourney''s artistic style is uniquely distinctive, with image quality and aesthetics leading the industry. The active Discord community fosters creative exchange and inspiration, making it an indispensable visual creation tool for creative professionals.'
WHERE slug = 'midjourney';

UPDATE tools SET description_en = 'OpenAI''s AI image generation model, now integrated into ChatGPT and Microsoft Designer. DALL-E 3 has significantly improved text understanding, accurately interpreting complex prompts and correctly rendering text and details within images, making it one of the most prompt-faithful image generation models available.

Core features include text-to-image generation (supporting extremely detailed descriptions), localized image editing and repainting, precise style control, text rendering within images, seamless ChatGPT integration (natural language interactive creation), and multiple size and aspect ratio outputs.

Suitable for social media imagery, marketing material creation, educational illustrations, creative prototypes, children''s book illustrations, product concept images, and more. Integration with ChatGPT lowers the creative barrier for general users unfamiliar with prompt engineering.

Ideal for marketers, content creators, teachers, parents, entrepreneurs, and general users. DALL-E''s greatest strength is its seamless integration with ChatGPT — users simply describe their ideas in natural language to generate images, with no need to learn complex prompting techniques.

Deep integration with ChatGPT is DALL-E''s key differentiator. Extremely strong prompt comprehension, particularly adept at correctly rendering text in images, makes it one of the most accessible AI image generation tools available.'
WHERE slug = 'dall-e';

UPDATE tools SET description_en = 'Stability AI''s open-source AI image generation model series, supporting local deployment and extensive customization. Stable Diffusion boasts the world''s largest open-source image generation community, where users can fine-tune base models, train LoRA adapters, and apply ControlNet for precise control — offering flexibility and controllability far beyond closed-source commercial products.

Core features include text-to-image generation, image-to-image transformation, inpainting and outpainting, ControlNet for precise composition control, LoRA style customization, model fine-tuning, ComfyUI visual workflow orchestration, and video generation. Operated through open-source interfaces like Automatic1111 WebUI or ComfyUI.

Suitable for professional art creation, game asset batch generation, architectural visualization, product design, academic research, AI art exploration, and other scenarios requiring high customization and fine-grained control. Enterprises with strict copyright and privacy requirements can opt for local deployment.

Ideal for AI artists, technically-oriented designers, AI researchers, game developers, and privacy-conscious enterprise users. Requires some technical skill, best suited for users with a technical background who value creative freedom.

Complete open-source availability and local deployment capability are its greatest strengths, free from commercial service restrictions. The community model ecosystem is extraordinarily rich (tens of thousands of fine-tuned models on CivitAI), with controllability and customizability far ahead of the industry.'
WHERE slug = 'stable-diffusion';

UPDATE tools SET description_en = 'An AI image generation platform designed for game developers and creative professionals, excelling in game asset generation, character design, and environment concept art. Leonardo AI offers a rich set of pre-trained models and an intuitive interface, lowering the technical barrier to AI image creation.

Core features include text-to-image generation, image-to-image transformation, AI Canvas for in-app editing, custom model training (upload your own assets to train bespoke styles), real-time image generation, batch asset production, transparent background generation, and 3D texture generation. The platform includes multiple style models covering common game art needs.

Suitable for game character design, environment concept art, prop and icon generation, game promotional materials, indie game development, creative prototype validation, and other gaming and creative industry scenarios. Particularly well-suited for small development teams needing to produce game art assets at scale.

Ideal for indie game developers, game artists, concept designers, and creative studios. Best for gaming industry professionals and creatives who need to rapidly produce high-quality visual assets.

Its specialized focus on the gaming and creative industries gives it unique advantages in game asset generation. The custom model training feature allows teams to build their own style library, improving asset output consistency and efficiency.'
WHERE slug = 'leonardo';

UPDATE tools SET description_en = 'Baidu''s AI art creation platform based on the Wenxin large model, focused on Chinese users'' image generation needs. Yige has natural advantages in understanding Chinese prompts and Chinese cultural elements, accurately generating culturally distinctive visual content such as Chinese traditional style, guochao (national trend), and classical aesthetics.

Core features include text-to-image generation (Chinese prompt optimized), multiple artistic style options (Chinese traditional, anime, photorealistic, watercolor, etc.), AI image editing (smart cutout, image restoration, image expansion), HD upscaling, and a work-sharing community. Yige also provides API access for enterprise batch usage.

Suitable for Chinese social media content creation, Chinese-style art creation, marketing poster design, e-commerce product images, educational illustrations, personal art projects, and more. Most suitable for users needing visual expression within Chinese cultural and linguistic contexts.

Ideal for domestic designers, new media operators, e-commerce professionals, art enthusiasts, and educators. Users who are more comfortable with Chinese prompts and prefer Chinese-style aesthetics form Yige''s core audience.

Chinese prompt comprehension and accurate expression of Chinese cultural elements are its core competitive strengths. Baidu''s technical accumulation in Chinese AI ensures Yige''s unique value in the domestic market, making it the go-to tool for creating Chinese-style visual content.'
WHERE slug = 'yige';

UPDATE tools SET description_en = 'ByteDance''s AI image and video creation platform (formerly Jianying Dreamina), integrating image generation, video generation, and image editing capabilities. Jimeng performs excellently in Chinese creative content generation and is closely connected to the Douyin (TikTok China) and Jianying content ecosystem.

Core features include text-to-image generation, text-to-video generation, smart image editing (outpainting, removal, localized repainting), AI style transfer, digital human video creation, and HD upscaling. Jimeng''s distinctive feature is combining AI image and AI video capabilities in a single platform.

Suitable for short video creation, social media content production, product promotional videos, creative poster design, personal art projects, and more. Particularly well-suited for content creators who need to produce both static images and dynamic videos.

Ideal for short video creators, social media operators, e-commerce sellers, designers, and general users. Integration with ByteDance''s content ecosystem makes Jimeng especially convenient for Douyin and Jianying users.

The unification of image and video generation is Jimeng''s differentiating advantage. Backed by ByteDance''s technical strength and content ecosystem, Jimeng has unique synergistic effects in short video creation scenarios.'
WHERE slug = 'jimeng';

-- ==================== AI Video ====================

UPDATE tools SET description_en = 'OpenAI''s text-to-video generation model, considered a landmark product in the AI video generation space. Sora can generate up to 60 seconds of high-quality video from text descriptions, with image fidelity, physical world understanding, and cinematographic language all at industry-leading levels.

Core features include text-to-video generation (up to 60 seconds), image-to-video, video editing and extension, video blending (Blend), video style transfer, and multiple resolution and aspect ratio outputs. Sora''s understanding of the physical world makes the motion trajectories and lighting variations in its generated videos more natural and realistic.

Suitable for creative short film production, advertising concept validation, social media video content, product demo animations, educational videos, storyboard visualization, and more. Directors and video creators can rapidly validate creative ideas, reducing pre-production costs.

Ideal for video creators, advertising creatives, film directors, content marketers, educators, and more. Professional creators with high standards for video quality and realism form Sora''s core user base.

Sora leads the industry in video generation quality and physical world simulation, with video duration and consistency far exceeding competing products. OpenAI''s brand and technical backing generated immense global attention upon its release.'
WHERE slug = 'sora';

UPDATE tools SET description_en = 'A professional-grade AI video generation and editing platform, providing a complete toolchain from text-to-video and image-to-video generation to video editing and visual effects. Runway is one of the top AI video tools preferred by creative professionals and has been widely used in commercial productions including films, advertisements, and music videos.

Core features include Gen-4 text-to-video and image-to-video generation (latest flagship model), video restoration and expansion (Expand Video), Motion Brush for precise motion control, video stylization (Video to Video), green screen keying, custom AI model training, multi-camera generation, and Act-One character animation.

Suitable for film and video production, advertising creative work, visual effects, social media content, art installations, music videos, and other professional creative scenarios. Runway''s all-in-one workflow makes it a complete solution for video creators from ideation to finished product.

Ideal for professional video creators, filmmakers, advertising agencies, VFX artists, and digital artists. Best suited for professionals who demand high creation quality and a complete toolchain.

Runway is a pioneer and continuous innovator in the AI video space, with model iterations from Gen-1 to Gen-4 demonstrating strong R&D capabilities. The complete toolchain and professional-grade output quality have established it firmly in the professional creative domain.'
WHERE slug = 'runway';

UPDATE tools SET description_en = 'A fast AI video generation tool characterized by simplicity and creative fun. Pika allows users to quickly generate creative short videos through text descriptions or image uploads, requiring no professional video production experience and dramatically lowering the barrier to video creation.

Core features include text-to-video generation, image-to-video generation (bringing static images to life), video style transformation, video extension, lip sync, Pikaffects special effects, and video frame expansion and modification. Pika 2.0 introduced scene ingredient control, allowing users to guide video generation with greater precision.

Suitable for social media short video creation, creative expression, fun video production, quick product showcases, personal entertainment, and more. Particularly well-suited for users who need to quickly produce creative short video content but lack professional video production skills.

Ideal for social media users, content creators, marketers, and general users. Pika''s low barrier to entry and fun factor make it the best entry-level tool for mass users to experience AI video creation.

Extremely simple operation and strong creative fun are Pika''s core competitive strengths. Fast generation and rich special effects options make it particularly attractive for short video and social content creation scenarios — an ideal choice for individual users and social media creators.'
WHERE slug = 'pika';

UPDATE tools SET description_en = 'An industry-leading AI digital human video generation platform, focused on virtual hosts, AI avatars, and multilingual video production. HeyGen''s core technology lies in highly realistic digital human generation and precise lip synchronization, making AI-generated videos nearly indistinguishable from real-person recordings.

Core features include AI digital human creation (create a digital twin from a single photo), multilingual video translation and dubbing (preserving original voice characteristics), AI script generation, templated video production, team collaboration, and API access. Lip-sync technology supports 40+ languages, with natural and fluid digital human expressions and gestures.

Suitable for corporate training videos, multilingual marketing content, product demonstrations, personalized sales videos, online education, internal communications, and other business scenarios. Particularly valuable for multinational companies and educational institutions needing to produce multilingual video content at scale.

Ideal for corporate training departments, marketing teams, online education platforms, cross-border e-commerce sellers, and content creators. For users who need to produce talking-head videos at scale but find actual filming inconvenient, HeyGen is the optimal solution.

HeyGen sets the industry benchmark for digital human technology, with lip-sync accuracy and expression naturalness far exceeding competitors. The ability to preserve original voice characteristics in multilingual dubbing is unique, making it the premier platform for enterprise-grade AI video production.'
WHERE slug = 'heygen';

UPDATE tools SET description_en = 'ByteDance''s nationally popular video editing tool, integrating rich AI features and serving as one of the most used video creation applications among Chinese users. Jianying (known as CapCut internationally) fuses professional-grade video editing capabilities with AI technology, enabling ordinary users to easily create high-quality videos.

Core features include AI smart editing (automatic highlight detection), AI color grading (one-click cinematic color), AI subtitles (automatic speech recognition for caption generation), AI dubbing and voice changing, AI digital humans, AI product image generation, AI removal (eliminating unwanted elements from video), and a vast library of templates and special effects assets.

Suitable for short video creation (Douyin/Kuaishou/TikTok), vlog production, product promotion, education and training, personal documentation, and other daily video production scenarios. Jianying''s deep integration with Douyin makes it the standard tool for short video creators.

Ideal for short video creators, new media operators, content entrepreneurs, students, and general users. Full coverage from mobile to desktop suits users with different usage habits.

Jianying''s greatest strengths lie in being free, easy to use, and having powerful AI feature integration. Deep integration with the Douyin ecosystem and massive template and asset libraries make it an irreplaceable tool in the short video creation space.'
WHERE slug = 'jianying';

UPDATE tools SET description_en = 'Kuaishou''s AI video generation tool, which has garnered widespread global attention in the AI video space for its astonishing video quality and physical realism. Kling supports text-to-video and image-to-video generation, with image quality, motion fluidity, and cinematographic expression all reaching world-class levels.

Core features include text-to-video generation (up to 2 minutes), image-to-video, video extension (extending short clips into complete works), camera movement control (professional lens movements like push, pull, pan, and tilt), start/end frame control, and AI video restoration and enhancement. Kling achieves industry-leading levels of video resolution and frame rate, supporting HD and even 1080p output.

Suitable for short video creation, advertising asset production, product animations, creative visual expression, social media content, and more. Kling has demonstrated astonishing potential in creative short dramas and visual effects.

Ideal for short video creators, advertising creatives, AI artists, and content marketers. Kling is particularly popular among Chinese users and has excellent synergy with the Kuaishou short video ecosystem.

Video quality and motion naturalness have reached top international standards, with one-click generation producing high-quality videos ready for social platform publishing. Kuaishou''s deep accumulation in video technology provides a solid technical foundation, making Kling a representative work of Chinese AI video.'
WHERE slug = 'kling';

-- ==================== AI Writing ====================

UPDATE tools SET description_en = 'An AI writing assistant integrated into the globally renowned note-taking and collaboration tool Notion, seamlessly embedding AI capabilities into the document editing workflow. Notion AI allows users to complete writing, editing, summarization, translation, and various other text processing tasks without leaving the Notion environment.

Core features include AI writing assistance (continue writing, rewrite, expand, shorten), tone adjustment (professional, friendly, confident, etc.), meeting agenda generation, document summarization, action item extraction, translation, and spelling and grammar checking. Notion AI is deeply integrated with Notion''s core features like databases and pages, accessible instantly within any document.

Suitable for meeting notes organization, project documentation, knowledge base building, weekly and daily report writing, product requirement document drafting, and other office and work scenarios. Notion AI''s greatest value is its deep workflow integration — users don''t need to switch between tools.

Ideal for teams and individuals using Notion for knowledge management and project collaboration. For users who have already adopted Notion as their primary note-taking and collaboration tool, Notion AI is a productivity multiplier.

Native integration with Notion is its greatest advantage — users get AI assistance within their existing workflow without switching tools. The efficiency gains for meeting notes and document organization are particularly significant, making it an essential AI enhancement for Notion users.'
WHERE slug = 'notion-ai';

UPDATE tools SET description_en = 'An AI content generation platform designed for marketing teams, focused on the batch creation of marketing copy, blog posts, social media content, and advertising copy. Jasper helps marketing teams scale high-quality content production and is one of the mainstream AI tools for enterprise content marketing.

Core features include brand voice customization (Brand Voice ensures consistent content style), multi-format content templates (blog, email, social media, advertising, product descriptions, etc.), Jasper Chat for conversational creation, SEO content optimization, image generation, team collaboration and approval workflows, and multilingual content generation.

Suitable for enterprise content marketing, blog operations, social media management, advertising copywriting, batch product description generation, and other commercial marketing scenarios. Particularly valuable for growth teams needing to scale branded content production with limited personnel.

Ideal for marketing teams, content creators, SEO specialists, social media managers, and brand managers. Especially valuable for B2B and B2C enterprises producing large volumes of brand content.

Its vertical focus on enterprise content marketing gives it unique professional depth among marketing AI tools. Brand voice customization and team collaboration features meet enterprise-grade content production needs, making it a powerful assistant for scaled content marketing.'
WHERE slug = 'jasper';

UPDATE tools SET description_en = 'An AI-powered marketing copy and sales content generation tool, offering rich templates and automated workflows. Copy.ai helps sales and marketing teams rapidly generate high-quality emails, advertising copy, social media content, product descriptions, and more, significantly improving content output efficiency.

Core features include multi-format copy templates (email, ads, LinkedIn, sales copy, etc.), AI workflow automation (batch generation and optimization), brand tone customization, multilingual content generation, sales pitch generation, landing page copy optimization, and integration with mainstream marketing tools.

Suitable for sales email writing, social media content management, advertising copy creation, product description writing, landing page optimization, and other marketing and sales scenarios. Particularly valuable for growth and sales teams needing high-frequency short-copy output.

Ideal for sales representatives, marketers, growth hackers, e-commerce operators, and content creators. Especially valuable for B2B sales teams needing high volumes of personalized sales communications.

Rich templates and automated workflows make it extremely efficient for batch marketing copy production. The intuitive and friendly interface allows even users with no copywriting experience to get started quickly.'
WHERE slug = 'copy-ai';

UPDATE tools SET description_en = 'The world''s most widely used AI English writing assistant, providing real-time grammar checking, spell correction, tone suggestions, originality detection, and style optimization. Grammarly is more than just a proofreading tool — it''s an intelligent coach helping users improve their English writing skills, trusted by tens of millions of users worldwide.

Core features include real-time grammar and spell checking, tone detection and adjustment (formal, friendly, confident, etc.), clarity optimization (simplifying complex sentences), vocabulary enhancement (synonyms and precise word suggestions), originality detection (plagiarism checking), Gen AI writing assistance (continue writing, rewrite, brainstorm), and multi-platform support (browser, desktop, mobile, Office plugins, etc.).

Suitable for English academic papers, business emails, work reports, blog posts, social media, cover letters, and all other English writing scenarios. Grammarly''s real-time detection makes it an essential tool for non-native English speakers.

Ideal for English learners and professionals who are non-native speakers, students and researchers needing to write professionally in English, and marketing and PR teams needing to ensure brand content quality.

The world''s most mature AI writing assistant, with the highest accuracy in the industry for English grammar and tone detection. Seamless multi-platform coverage and real-time detection make it an indispensable tool for improving English writing quality.'
WHERE slug = 'grammarly';

UPDATE tools SET description_en = 'iFlytek''s AI large model platform, with deep expertise in speech technology and Chinese natural language processing. iFlytek Spark integrates speech recognition, speech synthesis, and large model capabilities, offering unique advantages in audio-video processing, spoken language assessment, and Chinese writing scenarios.

Core features include multi-turn dialogue, document analysis and Q&A, code generation, AI drawing, voice input and output, PPT generation, mathematical and logical reasoning, and web search. iFlytek Spark''s voice capabilities are particularly outstanding, supporting high-precision speech recognition and natural speech synthesis.

Suitable for Chinese content creation, meeting transcription, educational training, dubbing production, knowledge Q&A, programming assistance, and more. Particularly widely applied in education, where teachers and trainers can use it for course content creation and teaching assistance.

Ideal for domestic users, educators, content creators, and developers. Particularly suitable for users with high demands for Chinese voice interaction and speech-to-text conversion.

Backed by iFlytek''s twenty-plus years of speech technology expertise, its speech recognition and synthesis capabilities are industry-leading. Excellent performance in Chinese education and content creation scenarios makes it a product with differentiated advantages in the domestic AI market.'
WHERE slug = 'xinghuo';

UPDATE tools SET description_en = 'Baidu''s large language model product, supporting writing, conversation, translation, code generation, and various other tasks. ERNIE Bot is based on Baidu''s Wenxin large model (ERNIE), performing excellently in Chinese contextual understanding and knowledge Q&A, serving as one of the core products of Baidu''s AI strategy.

Core features include multi-turn dialogue, text creation (articles, poetry, stories, reports, etc.), AI drawing (integrated Wenxin Yige capabilities), document analysis, code generation, translation, knowledge Q&A, and Baidu Search integration. ERNIE Bot is available via app, web, and API.

Suitable for Chinese content creation, learning assistance, knowledge acquisition, programming development, document processing, and other daily scenarios. Has unique advantages in Chinese literary creation and culturally related content.

Ideal for domestic users, students, writers, and developers. An excellent choice for users who prefer the Baidu ecosystem and content with Chinese cultural characteristics.

Baidu''s long-term expertise in Chinese search and natural language processing provides a solid foundation for ERNIE Bot. Baidu''s broad ecosystem coverage (Search, Maps, Wenku, etc.) provides rich application scenarios for the assistant.'
WHERE slug = 'yiyan';

-- ==================== AI Productivity ====================

UPDATE tools SET description_en = 'An AI-powered presentation and document creation tool with the tagline "create presentations like chatting." Gamma combines AI capabilities with elegant design templates, allowing users to input a topic and quickly generate structured presentations, documents, or web pages.

Core features include one-click AI generation of complete PPTs (just input a topic or outline), smart layout and design suggestions, a library of professional templates, real-time collaborative editing, embedding of apps and media content (video, tables, charts, etc.), export to PPT/PDF, and presentation analytics.

Suitable for business presentations, project proposals, teaching demonstrations, product launches, meeting sharing, and other scenarios requiring quick production of high-quality presentations. Particularly well-suited for professionals who frequently need to create PPTs but don''t want to spend extensive time on layout and design.

Ideal for office professionals, entrepreneurs, teachers, students, consultants, and anyone who needs to create presentations. For users who "don''t want to spend time on formatting," Gamma is the perfect solution.

Rapid generation and smart layout are its core competitive strengths, turning ideas into polished presentations within minutes. Design quality and ease of use lead the industry, making it one of the most popular AI PPT tools available.'
WHERE slug = 'gamma';

UPDATE tools SET description_en = 'An all-in-one AI assistant browser extension integrating search, reading, writing, and translation — one of the most widely used AI browser extensions globally. Monica operates as a browser extension, allowing users to invoke AI capabilities on any webpage without switching applications.

Core features include sidebar AI chat (talk to AI on any webpage), selected text explanation, translation, summarization, and rewriting, YouTube video summarization, PDF and webpage content analysis, AI writing assistance (email replies, comment generation, etc.), image generation, and multi-model support.

Suitable for information lookup during daily web browsing, reading and translating foreign-language webpages, email composition and replies, social media content creation, online learning and research, and more. Particularly efficient when reading foreign-language materials and long articles.

Ideal for all frequent browser users, especially those who regularly need to read foreign-language content, professionals needing AI assistance for daily office tasks, researchers, and students.

Ubiquitous browser coverage makes it one of the most conveniently accessible AI tools. Integrating multiple functions into a single extension reduces the friction of switching between tools, making it the most efficient daily AI companion.'
WHERE slug = 'monica';

UPDATE tools SET description_en = 'A Chinese AI search engine delivering ad-free direct answers instead of link lists. Meta AI Search combines the semantic understanding capabilities of large models with search technology, intelligently integrating and analyzing search results to present information in a structured manner.

Core features include AI semantic search (direct answers with summaries), academic search (focused on scholarly literature and papers), deep research mode (generating detailed analysis reports), source attribution (every answer has cited references), podcast generation (converting search results to audio podcasts), and multilingual search.

Suitable for academic research, market research, knowledge acquisition, technical troubleshooting, news verification, and other scenarios requiring accurate and comprehensive information. In academic and professional research, Meta''s academic search mode is particularly valuable.

Ideal for researchers, students, journalists, product managers, engineers, and anyone needing efficient access to high-quality information. For users tired of traditional search engine ads and SEO content pollution, Meta is a breath of fresh air.

An ad-free pure search experience and structured answer presentation are Meta''s core advantages. Academic search and deep research modes provide professional users with value beyond traditional search, making it a benchmark product for Chinese AI search engines.'
WHERE slug = 'metaso';

UPDATE tools SET description_en = 'An AI-powered project management and team collaboration platform with built-in AI Agents that automatically generate tasks, workflows, and knowledge graphs. Taskade integrates AI capabilities into every aspect of project management, helping teams reduce repetitive work and focus on creative thinking.

Core features include AI project generation (input a goal and automatically break it down into tasks and subtasks), AI Agent automated workflows, mind maps and knowledge graph visualization, real-time collaborative editing, video call integration, multi-view switching (list, board, calendar, mind map), and a template library with automation rules.

Suitable for team project management, personal task planning, brainstorming, knowledge management, meeting agenda planning, and other individual and team collaboration scenarios. Particularly well-suited for remote and distributed teams.

Ideal for startup teams, project managers, product managers, agile development teams, and freelancers. An excellent choice for teams needing an all-in-one collaboration platform with AI automation.

AI Agent auto-generation and task decomposition is Taskade''s differentiating advantage. Unifying project management, knowledge management, and AI capabilities in a single platform reduces the cost of switching between multiple tools for teams.'
WHERE slug = 'taskade';

UPDATE tools SET description_en = 'An AI-native personal knowledge management and note-taking app built around the philosophy of "let notes find you." Mem uses AI to automatically organize, connect, and surface note content — when you need information, AI proactively pushes relevant notes and connections without requiring you to search.

Core features include AI auto-tagging and categorization (no manual organization needed), smart connections (automatically discovering relationships between notes), AI search (natural language semantic search), AI writing assistance, calendar and meeting information integration, Mem X (contextually pushes relevant notes based on current work), and real-time collaboration.

Suitable for personal knowledge management, meeting notes, project notes, learning notes, creative records, and other scenarios requiring effective information management and retrieval. Particularly well-suited for knowledge workers with large volumes of fragmented information.

Ideal for knowledge workers, researchers, product managers, entrepreneurs, students, and anyone managing large amounts of fragmented information. For users wanting to reduce time spent on information organization and let AI handle knowledge management automatically, Mem is revolutionary.

AI-powered auto-organization and smart surfacing are its revolutionary features, changing the traditional "user manages notes" paradigm. You no longer need to worry about categories and tags when taking notes — AI finds the information you need when you need it.'
WHERE slug = 'mem';

-- ==================== AI Coding ====================

UPDATE tools SET description_en = 'An AI-powered code editor deeply optimized for VS Code, and one of the most popular AI coding tools among developers today. Cursor deeply integrates AI into every aspect of coding, offering intelligent code completion, multi-file editing, natural language programming, and more.

Core features include Tab intelligent code completion (predicting and completing multi-line code based on context), Cmd+K inline editing (modify code with natural language instructions), Composer multi-file simultaneous editing, AI code review, context awareness (understanding project structure and dependencies), AI terminal command generation, and model selection (GPT, Claude, etc.).

Suitable for daily coding and development, code refactoring and optimization, bug fixing, rapid prototyping of new features, codebase exploration and learning, technical documentation writing, and other development scenarios. Cursor significantly boosts development efficiency across virtually all programming tasks.

Ideal for full-stack developers, frontend and backend engineers, students, indie developers, and startup teams. For professional developers pursuing development efficiency and code quality, Cursor is currently the most powerful AI coding tool.

Perfect compatibility with the VS Code ecosystem (plugins and settings migrate directly), with industry-leading AI coding capabilities. The accuracy of Tab intelligent completion and Composer''s multi-file editing ability far exceed traditional code completion tools, making it the essential AI IDE for the next generation of developers.'
WHERE slug = 'cursor';

UPDATE tools SET description_en = 'An AI coding assistant launched through a collaboration between GitHub and OpenAI, deeply integrated into mainstream IDEs including VS Code, JetBrains, and Neovim, and also available via the GitHub.com web interface. GitHub Copilot is the most widely used AI coding tool among developers worldwide.

Core features include real-time code completion (line-level and block-level suggestions), Copilot Chat (conversational programming assistance), code explanation, bug fix suggestions, test generation, code review (Copilot Code Review), multi-language support (virtually all mainstream programming languages), and workspace-level context awareness.

Suitable for daily coding, code review, test writing, documentation generation, learning new tech stacks, rapid prototyping, and other development scenarios. As a developer''s "copilot," it provides instant assistance at every stage of programming.

Ideal for all developers who write code, from beginners to senior engineers. GitHub''s broad ecosystem coverage makes it the most accessible and deployable AI coding tool.

The powerful combination of GitHub and OpenAI, with code completion quality trained on hundreds of billions of lines of code. Deep integration with the GitHub ecosystem (Pull Requests, Issues, Actions, etc.) makes it more than just a completion tool — it''s a complete AI development platform.'
WHERE slug = 'github-copilot';

UPDATE tools SET description_en = 'An online IDE platform infused with an AI coding assistant, enabling developers to complete the full cycle of coding, debugging, deployment, and collaboration directly in the browser. Replit dramatically lowers the barrier to programming entry and development environment setup.

Core features include AI code generation and completion (Replit AI), one-click deployment and hosting (automatic HTTPS + domain), real-time collaborative coding (Google Docs-style multi-person simultaneous editing), 100+ language and framework templates, Replit Agent (describe your idea in natural language to generate a complete application), and community project sharing and Remixing.

Suitable for rapid prototyping, programming learning and teaching, hackathon projects, startup MVP building, remote collaborative coding, interview preparation, and more. Particularly ideal for quick-start scenarios where setting up a local development environment is undesirable.

Ideal for programming beginners, students, teachers, indie developers, startup teams, and hackathon participants. For users who don''t want to spend time configuring development environments, Replit offers the fastest way to get started.

Zero-configuration online development environment is Replit''s core advantage. The complete chain of AI + online IDE + one-click deployment shortens the time from idea to live application to minutes. One of the most popular tools for programming education and rapid prototyping scenarios.'
WHERE slug = 'replit';

UPDATE tools SET description_en = 'Vercel''s AI frontend UI generation tool — describe your interface needs in natural language to generate React, TailwindCSS, and Next.js page and component code. v0 transforms designers'' and frontend developers'' ideas into runnable code at high speed, making it one of the most popular AI UI generation tools available.

Core features include natural language UI generation (describe interface requirements to auto-generate React code), image-to-code conversion (upload design mockups or screenshots to generate code), iterative component refinement (continuous dialogue to optimize UI), code copying and sharing, deep integration with shadcn/ui component library, and support for Next.js and Vercel deployment.

Suitable for rapid frontend page prototyping, UI component generation, design-to-code conversion, quick landing page creation, A/B test page generation, admin dashboard creation, and other frontend development scenarios.

Ideal for frontend developers, full-stack engineers, designers, startup teams, and product managers. For users who need to rapidly produce high-quality frontend interfaces but don''t want to write large amounts of boilerplate code, v0 is a productivity game-changer.

Output code quality is high (directly usable in production), with seamless integration into the shadcn/ui and Vercel ecosystem. The natural-language-to-production-code iterative workflow fits frontend development''s actual needs better than traditional AI coding tools.'
WHERE slug = 'v0';

UPDATE tools SET description_en = 'StackBlitz''s AI full-stack application generator — instantly create and deploy complete web applications in the browser through natural language descriptions. Bolt.new makes "create an app with a single sentence" a reality and is one of the most powerful AI full-stack development tools available.

Core features include natural language generation of complete web applications (full-stack integrated), instant browser-based running and preview, one-click deployment to production, support for mainstream tech stacks (Node.js, React, Next.js, Vite, etc.), real-time code editing and iteration, and project sharing and collaboration.

Suitable for rapid startup MVP validation, hackathon project construction, internal tool development, programming teaching demonstrations, prototype presentations, and more. Particularly ideal for extreme-speed development scenarios requiring "idea to usable application."

Ideal for entrepreneurs, product managers, indie developers, full-stack engineers, teachers, and students. For entrepreneurs with ideas but lacking development resources or wanting to validate product concepts at maximum speed, Bolt.new is revolutionary.

The complete closed loop from natural language description to runnable application to one-click deployment is Bolt.new''s greatest strength. Instant browser-based running and preview eliminates the friction of environment configuration found in traditional development — the fastest "idea to product" path currently available.'
WHERE slug = 'bolt';

UPDATE tools SET description_en = 'Codeium''s AI-native IDE, built on the VS Code kernel with powerful built-in AI code generation, understanding, and refactoring capabilities. Windsurf is positioned as a "code editor for the AI era," deeply embedding AI Flow into the development workflow.

Core features include AI Flow (intelligent agents autonomously executing multi-step programming tasks), Cascade context awareness (understanding the entire project rather than just the current file), Supercomplete intelligent completion, natural language code editing, multi-file refactoring, AI code review and explanation, and intelligent terminal command suggestions.

Suitable for daily coding and development, large-scale code refactoring, new feature development, codebase migration, technical debt cleanup, and other professional development scenarios. Particularly outstanding in complex tasks requiring understanding a large codebase before making modifications.

Ideal for professional software engineers, full-stack developers, tech leads, and other developers working with complex codebases. An excellent choice for professional developers pursuing development efficiency and deep AI understanding of project structure.

The AI Flow agent mode and Cascade project-level context awareness are Windsurf''s differentiating advantages, with the ability to execute complex tasks after understanding large project structures going beyond simple code completion. Its free pricing strategy has driven rapid widespread adoption in the developer community.'
WHERE slug = 'windsurf';

-- ==================== AI Music ====================

UPDATE tools SET description_en = 'Currently the world''s most popular AI music generation tool — users simply input lyrics and a music style, and Suno generates a complete song with vocal performance and accompaniment. Suno''s music quality and creative capabilities are astonishing, widely regarded as a revolutionary product in the AI music creation space.

Core features include text-to-music generation (input lyrics or descriptions to auto-compose and sing), coverage of diverse music styles (pop, rock, classical, electronic, hip-hop, etc.), independent vocal and accompaniment control, song structure editing (verse, chorus, bridge, etc.), audio quality upgrades, and song extension and splicing. Suno V4 has significantly improved sound quality and vocal naturalness.

Suitable for music creation by hobbyists, background music and theme song production for content creators, musical inspiration exploration, personal entertainment, and music creation demonstrations in education and teaching.

Ideal for music enthusiasts, content creators, indie musicians, music teachers, and creative professionals. For users who want to create their own songs but lack professional music production skills, Suno is the best choice.

Suno''s leadership in the AI music generation space is unmatched, with generated songs reaching astonishing levels in melody, vocal naturalness, and musical structure completeness. It has made "everyone can create music" a reality.'
WHERE slug = 'suno';

UPDATE tools SET description_en = 'An AI music generation platform founded by former Google DeepMind researchers, renowned for outstanding audio quality, nuanced musicality, and diverse styles. Udio and Suno are jointly recognized as the two benchmark products in the AI music generation space.

Core features include text-to-music generation, precise music style control, audio extension and editing, fine-tuning of vocals and accompaniment, remix and variant generation, multilingual song support, and high-quality audio output. Udio particularly excels in audio fidelity and musical detail.

Suitable for high-quality music creation, commercial background music production, personal music projects, creative sound track generation, musical inspiration development, and more. Creators with higher standards for sound quality and musical expressiveness tend to prefer Udio.

Ideal for musicians, audio producers, video creators, and content creators. Creators with strict requirements for audio quality and musical expressiveness form Udio''s core user base.

Sound quality and musical nuance are Udio''s core competitive advantages. The founding team''s background in audio AI from DeepMind brings deep technical expertise, placing Udio at the industry''s top level in audio fidelity and musical expressiveness.'
WHERE slug = 'udio';

UPDATE tools SET description_en = 'An AI music generation tool focused on classical music and film/game scoring. AIVA (Artificial Intelligence Virtual Artist) has been officially recognized as a composer by SACEM (the French music copyright society), making it the first AI composer acknowledged by a music copyright organization globally.

Core features include AI classical music composition, film and game scoring generation, multi-style support (classical, cinematic, electronic, pop, jazz, etc.), MIDI editing and export, sheet music generation, copyright management, and integration with digital audio workstations (DAW). Pro users own full copyright to generated music.

Suitable for film scoring, game background music, advertising soundtracks, stage music, classical music composition, and other professional music production scenarios. Used in actual projects by professional filmmakers and game developers.

Ideal for film composers, game audio designers, advertising music producers, classical music enthusiasts, and indie filmmakers. Particularly valuable for creative teams needing high-quality original scores but working with limited budgets.

Its specialized focus on classical music and film/game scoring makes it unique among AI music tools. SACEM''s official recognition serves as important validation of its creative capabilities, making it the most recognized AI tool in professional music production scenarios.'
WHERE slug = 'aiva';

UPDATE tools SET description_en = 'An AI-powered royalty-free background music generation platform, providing high-quality music assets for content creators, streamers, and commercial users. Mubert''s distinctive features are its real-time generation capabilities and deep optimization for commercial usage scenarios.

Core features include AI real-time music generation, customizable music by mood, style, and duration, royalty-free commercial licensing, Mubert Render (automatically matching background music to videos), API access (integration into apps and services), multi-genre channels (Lo-fi, electronic, ambient, funk, etc.), and mobile app support.

Suitable for video production background music, live streaming background music, commercial space background music (stores, restaurants, gyms), in-app and in-game music, podcast soundtracks, meditation and relaxation, and other commercial and personal scenarios.

Ideal for video creators, live streamers, commercial space operators, app developers, fitness instructors, and anyone needing background music without the high cost of copyright fees.

Real-time generation and royalty-free commercial licensing are Mubert''s core advantages. Rich music channels and commercial scenario optimization make it the preferred AI background music solution for content creators and commercial users.'
WHERE slug = 'mubert';

UPDATE tools SET description_en = 'An AI royalty-free music generator allowing users to customize background music by mood, style, tempo, and duration. Soundraw emphasizes creative flexibility and music customizability, enabling users to precisely adjust various dimensions of the music.

Core features include AI music generation (specifying mood, style, duration, and tempo), flexible editing of music segments (adjusting instrumentation and intensity across sections), unlimited royalty-free downloads (Pro plan), mood-based playlist categorization, compatibility with video editing tools, and API access.

Suitable for video soundtracks, social media content, podcast intros and outros, advertising music, corporate video soundtracks, personal projects, and other scenarios requiring flexibly adjustable background music.

Ideal for video creators, podcast producers, social media content creators, advertising producers, and indie filmmakers. Particularly useful for creators needing to precisely match music duration to video pacing.

Music customization flexibility and precision are Soundraw''s differentiating advantages. The ability to adjust music sections and intensity on demand meets video creators'' needs for precise soundtrack matching.'
WHERE slug = 'soundraw';

-- ==================== AI PPT ====================

UPDATE tools SET description_en = 'An AI-powered intelligent presentation creation tool built around the core philosophy of "design automation." Beautiful.ai''s standout feature is its smart layout engine — as users add content, AI automatically adjusts layout, spacing, and design details in real-time, ensuring every slide maintains a professional and polished appearance.

Core features include AI smart layout (dynamic adaptive layout), 60+ smart slide templates, brand kit (custom brand colors, logo, fonts), team collaboration and shared libraries, data visualization (smart charts), export to PPT/PDF, and presenter view.

Suitable for business presentations, sales demos, project proposals, investor pitch decks, teaching materials, company profiles, and other scenarios requiring professional and visually appealing presentations. Particularly well-suited for users who "want good-looking slides but don''t know design."

Ideal for office professionals, entrepreneurs, sales managers, consultants, teachers, and anyone who needs to create professional presentations. Especially valuable for users with limited design skills who still need professional-quality output.

The smart layout engine is Beautiful.ai''s core competitive strength — AI completes the design automatically as users add content. It dramatically reduces the design skill threshold and time cost of creating professional presentations.'
WHERE slug = 'beautiful-ai';

UPDATE tools SET description_en = 'An AI-powered presentation and storytelling tool known for "creating presentations like chatting." Tome combines AI''s creative generation capabilities with elegant storytelling templates, helping users create presentations with narrative power and visual impact.

Core features include one-click AI generation of complete presentations (just input a topic), story-driven narrative structure, smart image matching and layout, embedding interactive elements (Figma, YouTube, Airtable, etc.), real-time collaboration, presentation analytics (who viewed, for how long), and mobile creation and presentation.

Suitable for product launches, investor pitch decks, project reports, sales presentations, team sharing, teaching materials, personal storytelling, and more. Tome is particularly well-suited for presentation scenarios that need "storytelling" rather than just "bullet points."

Ideal for entrepreneurs, product managers, sales directors, teachers, speakers, and content creators. Especially suited for users pursuing storytelling quality and visual expressiveness in their presentations.

Story-driven presentation style and AI-powered rapid creation are its core differentiating advantages. Tome upgrades presentations from "bullet point lists" to "visual narratives," better aligning with modern audiences'' aesthetic and information consumption habits.'
WHERE slug = 'tome';

UPDATE tools SET description_en = 'A Google Slides AI plugin that automatically transforms text content into beautifully designed presentation slides. SlidesAI works without leaving Google Slides, with an extremely low learning curve — an efficiency tool for Google Workspace users creating presentations.

Core features include automatic text-to-slide conversion (paste outlines or paragraphs to auto-generate slides), smart image matching and layout suggestions, multiple design styles and color schemes, multilingual support, native integration with Google Slides and Google Workspace, and support for Education and Enterprise editions.

Suitable for teaching material creation, student assignment presentations, meeting reports, business proposals, project reporting, and other daily presentation scenarios. Particularly well-suited for educators and enterprise users already using Google Slides.

Ideal for teachers, students, Google Workspace enterprise users, and professionals needing to quickly convert text materials into presentations. For Google ecosystem users, SlidesAI is the most convenient AI PPT solution.

Native integration with Google Slides is its greatest advantage — users gain AI capabilities without learning a new tool. Widely adopted in educational settings, it''s the preferred AI plugin for Google ecosystem users creating presentations.'
WHERE slug = 'slidesai';

UPDATE tools SET description_en = 'A one-stop AI presentation creation and sharing tool with built-in business features including forms, payments, and data analytics. Decktopus is more than just a PPT tool — it''s a complete presentation solution for business scenarios, helping users create presentations that directly generate commercial value.

Core features include AI rapid presentation generation, built-in forms and surveys (collect user information within presentations), payment integration (sell products or services directly within presentations), presentation analytics (track visitor behavior), custom domain publishing for presentations, brand customization, and a template library.

Suitable for sales proposals, product demos, client proposals, online course showcases, event invitations, business reports, and other business scenarios requiring presentations plus interaction. Particularly valuable for sales and business teams needing to convert clients directly within presentations.

Ideal for sales teams, business development, entrepreneurs, educational institutions, and event planners. An excellent choice for business users who need to use presentations as customer acquisition and conversion tools.

Business closed-loop functionality (forms + payments + analytics) is Decktopus''s unique advantage, upgrading presentations from information displays to business conversion tools. One-click sharing and analytics tracking make it a complete presentation solution for business teams.'
WHERE slug = 'decktopus';

UPDATE tools SET description_en = 'A veteran dynamic presentation tool renowned for its unique zoomable canvas and non-linear storytelling approach. Prezi has introduced AI-assisted features, combining its signature dynamic visual effects to deliver a presentation experience distinctly different from traditional slides.

Core features include AI-assisted content generation and design suggestions, dynamic zoomable canvas (Prezi''s signature feature), non-linear narrative structure, video embedding and interactive elements, real-time collaboration, video presentation recording and sharing, and a template library.

Suitable for creative presentations, brand storytelling, interactive teaching, conference keynotes, product launches, and other presentation scenarios requiring visual impact and interactivity. Prezi is especially well-suited for users who want to break free from the traditional "page-by-page" presentation framework.

Ideal for creatives, speakers, teachers, brand marketers, and corporate trainers. For users pursuing visual impact and innovative narrative approaches in their presentations, Prezi is a unique alternative to traditional PPT tools.

Dynamic zooming and non-linear storytelling are Prezi''s irreplaceable advantages. The addition of AI features improves content creation efficiency while retaining its creative edge, making it the most visually impactful presentation tool available.'
WHERE slug = 'prezi';

-- ==================== AI Search ====================

UPDATE tools SET description_en = 'An AI-native next-generation search engine dubbed the "Google killer." Perplexity combines the semantic understanding of large language models with real-time search to deliver structured answers with cited sources directly — rather than traditional link lists — fundamentally changing how people access information.

Core features include AI semantic search (generating answers with cited references), Pro Search for deep search (multi-step reasoning and comprehensive analysis), Collections for knowledge organization, Focus for scoped search (academic, video, social, writing, etc.), file upload analysis, multilingual support, and Perplexity Pages (AI-generated shareable article pages).

Suitable for academic research, market research, fact-checking, technical troubleshooting, news understanding, product comparison, and other scenarios requiring accurate and comprehensive information. Can replace most traditional search engine usage in daily information gathering.

Ideal for researchers, students, journalists, product managers, engineers, investors, and anyone needing high-quality information. For users tired of traditional search engine ads and low-quality SEO content, Perplexity is a revolutionary alternative.

Cited, structured answers are its core competitive strength, with information credibility and traceability far exceeding traditional AI chat. It is reshaping user habits in the search industry and defining the search engine of the AI era.'
WHERE slug = 'perplexity';

UPDATE tools SET description_en = 'A privacy-focused AI search engine that doesn''t track user behavior or build personal data profiles. You.com also offers multi-model AI switching, allowing users to select the most suitable model for each task, combining search and AI capabilities for information retrieval and content creation.

Core features include AI semantic search (direct answers with citations), multi-model selection (freely switch between GPT-4o, Claude, Gemini, etc.), privacy protection (no tracking, no recording), YouAgent autonomous search agent, YouWrite AI writing, code search, and image and video search.

Suitable for privacy-conscious users'' daily searches, developer technical searches, content creator writing assistance, academic research, and more. An ideal choice for users who value privacy while enjoying AI convenience.

Ideal for privacy-conscious users, developers, researchers, and professionals who value data security. Particularly popular among users in Europe and regions with strict privacy regulations.

Privacy protection and flexible multi-model selection are You.com''s differentiating advantages. Its distinctive privacy policy among AI search tools makes it the preferred search engine for privacy-first users.'
WHERE slug = 'you';

UPDATE tools SET description_en = 'An AI search engine designed for developers and technical professionals, excelling at technical Q&A, code search, and programming problem-solving. Phind is deeply optimized for programming and technical search needs, with answer quality highly regarded in the tech community.

Core features include technical AI search (with code examples and citations), multi-step reasoning search, code generation and debugging, switching between mainstream AI models (Phind''s own model plus Claude, GPT, etc.), intelligent technical documentation retrieval, and full programming language coverage.

Suitable for programming problem troubleshooting, technical solution research, code example searches, framework and library usage queries, bug fix solution searches, technical learning, and other daily developer scenarios.

Ideal for software developers, DevOps engineers, data scientists, technical writers, computer science students, and other technical professionals. A powerful search tool for anyone engaged in programming and technical work.

Deep optimization for the technical domain makes its programming and technical search quality surpass general AI search tools. Developer community reputation and recognition have established Phind''s benchmark status in the technical search space.'
WHERE slug = 'phind';

UPDATE tools SET description_en = 'A Chinese developer AI search engine focused on programming and technical content retrieval and answers. Devv is locally optimized for Chinese developers'' usage habits and tech ecosystem, with unique advantages in Chinese technical Q&A and domestic tech stack searches.

Core features include AI semantic search (with code and Chinese technical documentation citations), GitHub mode (searching open-source projects and code), multi-model support, Chinese tech blog and community content retrieval, code generation and explanation, and technical Q&A.

Suitable for Chinese developers'' daily technical troubleshooting, domestic tech stack selection, Chinese technical documentation retrieval, programming learning, open-source project searching, and other traditional Chinese developer scenarios.

Ideal for Chinese-speaking developers and tech enthusiasts. Particularly convenient for users more comfortable conducting technical searches in Chinese and needing to search domestic tech community content.

Focus on the Chinese developer ecosystem is Devv''s core differentiating advantage. Its retrieval effectiveness for domestic tech stacks (such as Vue, Mini Programs, Java Spring, etc.) and Chinese technical documentation surpasses general AI search tools.'
WHERE slug = 'devv';

UPDATE tools SET description_en = 'Kunlun Tech''s AI search engine, supporting multimodal search and deep analysis, and a significant player in China''s AI search space. Tiangong AI Search comprehensively applies large model semantic understanding and reasoning capabilities to search scenarios — not only finding information but also analyzing and synthesizing it.

Core features include AI semantic search (direct answers with citations), multimodal search (supporting image search and recognition), deep research mode (generating comprehensive analysis reports), mind map and information graph visualization, academic search, and multilingual translation search.

Suitable for daily information queries, academic research, market analysis, in-depth news understanding, image searching, and more. Particularly well-suited for Chinese users needing deep information analysis and synthesis.

Ideal for domestic users, students, researchers, media professionals, and business analysts. An excellent choice for users wanting AI to directly deliver analytical conclusions rather than just information links.

Multimodal search and deep analysis capabilities are Tiangong AI''s core strengths. As an independent AI search solution in the domestic search market, it provides users with an innovative alternative to Baidu search.'
WHERE slug = 'tiangong';

-- ==================== AI Agent ====================

UPDATE tools SET description_en = 'ByteDance''s AI Bot building platform, allowing users to create powerful AI agents through a visual interface and natural language. Coze integrates a plugin system, knowledge base management, workflow orchestration, and conversation design capabilities, enabling users without programming skills to build complex AI applications.

Core features include a visual Bot builder (drag-and-drop conversation flow design), rich official and community plugins (search, image, data analysis, etc.), knowledge base management (upload documents for Bots to learn domain expertise), workflow orchestration (multi-step automated tasks), multi-platform publishing (Lark, Discord, Telegram, Web, etc.), and variable and memory management.

Suitable for enterprise customer service bot construction, internal knowledge base Q&A systems, community smart assistants, automated workflows, educational training Q&A systems, and other AI application scenarios. Particularly valuable for non-technical teams needing to rapidly build and deploy AI Bots.

Ideal for product managers, operations personnel, enterprise IT, educators, community administrators, and entrepreneurs. For users wanting to build AI applications but lacking programming skills, Coze is the lowest-barrier platform.

ByteDance''s product capabilities and ecosystem support provide a solid foundation. Low-threshold yet powerful design makes "everyone can create AI Bots" a reality, making it an important driver of AI application democratization.'
WHERE slug = 'coze';

UPDATE tools SET description_en = 'An open-source AI application development platform supporting visual orchestration of RAG (Retrieval-Augmented Generation), AI Agents, and complex workflows. Dify is one of the most popular open-source LLM application development platforms, helping developers and enterprises rapidly build and deploy large model-based AI applications.

Core features include a visual workflow orchestrator (drag-and-drop AI process design), RAG engine (knowledge base retrieval-augmented generation), AI Agent construction (with tool calling and execution capabilities), model management (supporting 100+ model providers), application monitoring and analytics, API publishing and management, and multi-team collaboration. Supports private deployment.

Suitable for enterprise knowledge base Q&A, intelligent customer service, AI content generation platforms, automated workflows, AI-assisted decision-making, and other enterprise-grade AI application scenarios. Particularly well-suited for enterprises requiring private deployment and data security.

Ideal for AI developers, enterprise tech teams, SaaS entrepreneurs, and data engineers. An excellent choice for teams needing to build complex AI applications while valuing open-source control and data security.

Open-source control and private deployment are Dify''s core competitive strengths. Visual orchestration significantly reduces the technical barrier to LLM application development, while rich model support and an active open-source community make it the premier platform for enterprise AI application development.'
WHERE slug = 'dify';

UPDATE tools SET description_en = 'The Chinese version of Coze, provided by ByteDance for domestic users, integrating the Doubao large model and domestic ecosystem services. Kouzi enables users in China to access powerful AI Bot building capabilities without needing a VPN, with deep integration into domestic platforms like Lark and Douyin.

Core features include a visual Bot builder (core experience consistent with Coze), Doubao large model integration, domestic platform publishing (Lark, Douyin, WeChat, etc.), rich domestic service and API plugins, knowledge base management, and workflow orchestration. Kouzi is locally adapted for Chinese users'' habits and compliance requirements.

Suitable for domestic enterprise customer service bots, Lark group smart assistants, Douyin enterprise account auto-replies, personal AI assistant construction, and other AI application scenarios targeting Chinese users.

Ideal for domestic enterprises, operations personnel, developers, and Lark and Douyin ecosystem users. For users needing to build Bots using domestic AI services and platforms, Kouzi is the most convenient choice.

Localization for Chinese users and deep integration with ByteDance''s domestic ecosystem are Kouzi''s core advantages. It shares Coze''s technical architecture while being better adapted to domestic usage scenarios and compliance requirements.'
WHERE slug = 'kouzi';

UPDATE tools SET description_en = 'A pioneering open-source autonomous AI Agent project that can independently plan tasks, decompose goals, execute actions, and evaluate results based on user-defined objectives. AutoGPT is the iconic project that introduced the AI Agent concept, sparking a global wave of autonomous AI Agent development.

Core features include autonomous goal task decomposition and execution, web search and information gathering, file reading/writing and data processing, code execution, memory and context management, multi-tool invocation and integration, and plugin extensions. AutoGPT''s core philosophy is enabling AI to become an agent capable of autonomously completing complex tasks, not just a conversational assistant.

Suitable for automated research, data collection and analysis, batch task automation, creative exploration, and other experimental scenarios requiring AI to autonomously complete multi-step tasks. Currently more suited for AI developers and researchers conducting exploration and experimentation.

Ideal for AI developers, researchers, tech enthusiasts, and automation engineers. An important learning and experimentation platform for developers and researchers wanting to explore the cutting edge of AI Agent capabilities.

The pioneer of the AI Agent field, its autonomous task execution philosophy has influenced the entire industry''s development direction. While still facing reliability challenges in practical applications, AutoGPT''s proof-of-concept value and technical influence are undeniable.'
WHERE slug = 'autogpt';

UPDATE tools SET description_en = 'A browser-based autonomous AI Agent platform that allows users to configure and run AI agents in a web interface without any programming. AgentGPT implements the AutoGPT concept as an intuitive web interface, dramatically lowering the barrier to using autonomous AI Agents.

Core features include browser-based AI Agent configuration (set a name and goal for the Agent to start), autonomous task execution (Agent automatically plans and executes task steps), real-time task progress visualization, multilingual support, Agent sharing functionality, and built-in tools and integrations.

Suitable for experimental autonomous task execution, AI Agent concept learning and teaching, rapid prototype validation, and more. Particularly well-suited for users wanting to experience AI Agents without dealing with code and environments.

Ideal for AI learners, educators, product managers, and tech enthusiasts. An excellent choice for entry-level users wanting to quickly experience and understand AI Agent concepts.

Extremely simple operation (runs entirely in the browser) is its greatest strength. Packaging the complex AI Agent concept into an intuitive web experience makes it the best entry-level tool for understanding and learning AI Agents.'
WHERE slug = 'agentgpt';

-- ==================== AI Translation ====================

UPDATE tools SET description_en = 'Globally recognized as the highest-quality AI translation tool, known for business-grade translation accuracy and natural linguistic expression. DeepL''s neural network translation model has consistently led Google Translate and Microsoft Translator in numerous independent evaluations, particularly excelling in translations between European languages.

Core features include high-quality text translation (supporting 33 languages), document translation (preserving original formatting — upload PDF, Word, PPT for direct translation), DeepL Write (AI writing refinement and tone adjustment), glossary (custom term translation rules), translation memory, CAT tool integration, and API access.

Suitable for business document translation, academic paper polishing, website multilingual localization, email translation, legal and technical document translation, and other scenarios requiring high translation quality. Widely adopted in professional translation and business settings.

Ideal for translation professionals, multinational corporation employees, researchers, localization teams, and international business professionals. For users with strict translation quality requirements, DeepL is irreplaceable.

Translation quality and linguistic naturalness lead the industry, making it the top choice for professional translation and business scenarios. The depth of language processing from its German technical background provides clear advantages in complex sentence structures and specialized terminology translation.'
WHERE slug = 'deepl';

UPDATE tools SET description_en = 'Baidu''s free multilingual translation tool supporting over 200 languages — one of the most widely used online translation services among Chinese users. Baidu Translate performs excellently in translations between Chinese and other languages, with particular strengths in Asian language translation.

Core features include text translation (200+ languages), document translation (PDF, Word, PPT, and other formats), image translation (camera translation and image text recognition), voice translation, webpage translation, video subtitle translation, dictionary and example sentence lookup, and a specialized terminology database. Baidu Translate also provides a translation API for developer integration.

Suitable for daily translation lookups, document translation, webpage reading translation, foreign language learning, overseas travel, cross-border e-commerce, and a wide range of other scenarios. Coverage of Chinese users'' daily translation needs is very comprehensive.

Ideal for domestic students, professionals, travel enthusiasts, cross-border e-commerce practitioners, and language learners. For Chinese users, Baidu Translate is one of the most feature-complete and completely free translation tools.

200+ language coverage and being completely free are Baidu Translate''s greatest strengths. Localized optimization for Chinese translation effectiveness and rich additional features (camera, voice, video translation) give it an important position in China''s translation market.'
WHERE slug = 'baidu-translate';

UPDATE tools SET description_en = 'An AI-powered real-time bilingual translation tool focused on Chinese-English side-by-side translation. Caiyun Xiaoyi''s distinctive feature is providing real-time side-by-side display of original and translated text — when browsing foreign-language webpages or reading foreign-language documents, users can see both the original and translation simultaneously, dramatically improving reading efficiency and comprehension accuracy.

Core features include bilingual side-by-side webpage translation (browser extension), document translation, video subtitle translation, real-time voice translation, one-click copy and share of translation results, and multi-domain translation style selection (tech, literary, business, etc.).

Suitable for foreign-language webpage browsing, technical document reading, academic paper study, cross-border e-commerce product information viewing, foreign language learning assistance, and other scenarios requiring side-by-side reading. Particularly well-suited for programmers and researchers who frequently need to read foreign-language technical documentation and papers.

Ideal for developers, researchers, international students, academics, and cross-border e-commerce professionals. For Chinese users who need to efficiently read and understand English content, Caiyun Xiaoyi is an essential daily tool.

The unique bilingual side-by-side translation mode is its core competitive strength — users can understand foreign-language content without losing original text information. Optimization for technical and academic audiences makes it outperform general translation tools in these vertical scenarios.'
WHERE slug = 'caiyun';

UPDATE tools SET description_en = 'An AI translation and language learning integrated tool, providing high-quality translation alongside rich contextual example sentences and usage explanations. Reverso''s distinctive feature is its massive bilingual example sentence database, helping users not only understand translation results but also deeply grasp the actual usage of vocabulary and expressions.

Core features include AI translation (supporting 25+ languages), contextual dictionary (viewing vocabulary usage in real example sentences), grammar checking (English and French), vocabulary memorization with flashcard system, synonym lookup, verb conjugation lookup, pronunciation and speech recognition, and mobile app offline translation.

Suitable for language learning, academic writing, business email composition, foreign-language reading assistance, translation reference, and more. In the language learning domain, Reverso''s example sentence and contextual analysis features are particularly valuable.

Ideal for language learners, teachers, translators, international students, and multinational business professionals. For users who want not just translation results but deeper understanding of language usage, Reverso is the best choice.

The deep integration of translation and language learning is Reverso''s core advantage. The rich bilingual example sentence database provides users with language learning value beyond simple translation, making it an ideal fusion of translation tool and learning tool.'
WHERE slug = 'reverso';

UPDATE tools SET description_en = 'ByteDance''s AI translation service platform, supporting text, document, image, video, and other multimodal translation needs. Volcengine Translate is based on ByteDance''s self-developed translation models, with strong competitiveness in intelligent and multimodal translation scenarios.

Core features include text translation (supporting 100+ languages), document translation (preserving formatting), image translation (OCR + translation), video translation (subtitle generation and multilingual dubbing), real-time voice translation, terminology customization and management, translation quality assessment, and API access (enterprise-grade usage).

Suitable for enterprise document translation, video content localization, cross-border e-commerce product translation, app and mini-program multilingual support, real-time meeting translation, and other enterprise and personal translation scenarios.

Ideal for enterprise localization teams, cross-border e-commerce, content going global, video creators, and app developers. An excellent choice for enterprise users needing multimodal translation capabilities, especially video translation.

Comprehensive multimodal translation coverage (text, image, video, voice) is Volcengine Translate''s differentiating advantage. ByteDance''s technical strength and global business experience provide rich training data and application scenarios for its translation models.'
WHERE slug = 'volcengine-translate';

-- ==================== AI Office ====================

UPDATE tools SET description_en = 'Microsoft''s AI assistant, deeply integrated into Windows 11, Microsoft Edge browser, and the Microsoft 365 suite (Word, Excel, PowerPoint, Teams, etc.). Microsoft Copilot embeds large model AI capabilities into the office software used daily by billions of users, making it the most broadly covered AI office assistant by user reach.

Core features include in-app AI assistance across Office (Word writing, Excel data analysis, PPT design, Outlook email management), Windows system-level AI search and settings, Edge browser sidebar AI chat, Teams intelligent meeting recaps, business chat (cross-application information integration), image generation (Designer integration), and Copilot Studio for custom agent creation.

Suitable for enterprise office automation, document writing and editing, data analysis and visualization, email management, meeting recording and summarization, knowledge management and information retrieval, and other enterprise and personal office scenarios.

Ideal for Microsoft 365 enterprise users, Windows users, professionals, and students. For enterprises and individuals already using the Microsoft office ecosystem, it''s the most cost-effective AI office solution.

Coverage of Microsoft''s ecosystem reaching billions of users globally is Copilot''s greatest advantage. Its deep integration in Office document processing and business collaboration scenarios is unmatched, making it the benchmark product for enterprise-grade AI office tools.'
WHERE slug = 'microsoft-copilot';

UPDATE tools SET description_en = 'Kingsoft Office (WPS)''s AI office assistant, deeply integrated into the WPS Office suite (Writer, Spreadsheet, Presentation). WPS AI is locally optimized for Chinese users'' office habits and document processing needs, serving as a pioneer in AI-powered domestic office software.

Core features include document AI writing (generation, rewriting, continuation, summarization, translation), spreadsheet AI data analysis (natural language formula generation, data insights), PPT AI design (one-click presentation generation, smart layout), PDF AI processing (document Q&A, content extraction), and AI templates and asset generation.

Suitable for domestic enterprise and individual daily office document processing, report writing, data reporting, presentation creation, contract document review, and other Chinese office scenarios.

Ideal for domestic enterprise employees, civil servants, teachers, students, and individual users. For domestic users accustomed to WPS, WPS AI is a seamless upgrade for boosting office productivity.

WPS''s thirty-plus years of deep cultivation in the Chinese office market provides a massive domestic user base. WPS AI''s localization advantages (Chinese document processing, Chinese reporting conventions, official document formatting, etc.) give it a unique position in China''s AI office market.'
WHERE slug = 'wps-ai';

UPDATE tools SET description_en = 'Lark''s built-in AI assistant (formerly "Lark Intelligent Partner"), deeply integrated into Lark''s instant messaging, documents, calendar, meetings, and other features. Lark Intelligent Partner embeds AI capabilities into every aspect of team collaboration, making it one of the most deeply AI-integrated products among domestic enterprise collaboration platforms.

Core features include intelligent meeting recaps (automatic transcription, summarization, action item extraction), document AI assistance (writing, summarization, translation, mind map generation), message summarization (one-click summarization of long chat threads), multi-dimensional spreadsheet AI analysis, Lark bot AI Q&A, search assistance, and multilingual real-time translation.

Suitable for enterprise team collaboration, meeting management, knowledge management, project tracking, internal information retrieval, document collaboration, and other daily enterprise team office scenarios.

Ideal for enterprises and teams using Lark, especially partners within the ByteDance ecosystem. For Chinese enterprises pursuing efficient collaboration and AI-powered office work, Lark Intelligent Partner is a team productivity multiplier.

Deep integration with the Lark collaboration platform is its greatest advantage — AI capabilities are not standalone features but woven into the team''s daily workflow. Meeting recap and message summarization features are particularly well-received among enterprise users.'
WHERE slug = 'feishu';

UPDATE tools SET description_en = 'DingTalk''s built-in AI assistant features, integrated into DingTalk''s instant messaging, document, approval, and project management modules. DingTalk AI embeds large model capabilities into enterprise management and collaboration scenarios, serving as one of the AI assistants on the enterprise collaboration platform with the largest user base in China.

Core features include AI Q&A (enterprise internal knowledge Q&A), intelligent approval and suggestions, document AI writing and summarization, AI meeting recaps, Yida low-code AI assistance, data analysis and insights, and message summarization and search. DingTalk AI also supports enterprise-customized knowledge bases and AI workflows.

Suitable for enterprise daily management, approval workflows, internal communication and collaboration, document processing, data analysis, and other Chinese enterprise management and office scenarios.

Ideal for Chinese enterprises, government agencies, schools, and other organizations using DingTalk. Broadly covers Chinese SMEs and large organizations needing AI-assisted management and office work.

The user base of China''s largest enterprise collaboration platform is DingTalk AI''s greatest advantage. Alibaba Cloud''s technical support and enterprise service experience ensure its competitiveness in the Chinese enterprise market.'
WHERE slug = 'dingtalk';

-- ==================== AI Design ====================

UPDATE tools SET description_en = 'The world''s most popular online design platform with over 200 million users. Canva fuses professional design capabilities with AI technology, launching the Magic Studio AI feature suite that enables users with zero design experience to quickly create high-quality posters, social media images, presentations, videos, and more.

Core features include Magic Design (AI auto-generates designs), Magic Write (AI copy generation), Magic Edit (AI image editing and retouching), background removal, smart cutout, brand kit, a vast library of templates and assets (millions of templates), video editing, real-time collaboration, and print services.

Suitable for social media content creation, marketing poster design, brand visual management, presentation creation, video editing, print design, and other personal and commercial design scenarios. Covers virtually all daily design needs.

Ideal for social media operators, marketers, small business owners, teachers, students, and content creators. For users who "have no design skills but need to produce design work," Canva is the best solution.

Ease of use and template richness are unmatched, with continuously added AI features making it increasingly powerful. The choice of 200 million users and an active community ecosystem have made it synonymous with mass-market design tools.'
WHERE slug = 'canva';

UPDATE tools SET description_en = 'The global leader in UI/UX design, widely used by product designers and interface designers worldwide. Figma has launched an AI feature suite to help designers accelerate the entire process from ideation to prototype while maintaining design consistency and professional quality.

Core features include AI auto-layout and component generation, AI design system assistance, intelligent layer naming and organization, AI prototype interaction suggestions, automatic design spec and annotation generation, AI search (quickly locating elements in large design files), real-time collaboration (Google Docs-style multi-person simultaneous editing), and a plugin ecosystem.

Suitable for app and web UI/UX design, interactive prototyping, design system construction, product team collaboration, user experience testing, and other professional design scenarios. It is the de facto standard tool for internet product design teams.

Ideal for UI/UX designers, product managers, frontend engineers, and design teams. For professional design teams, Figma is the irreplaceable collaborative design platform.

Browser-based real-time collaborative design experience is Figma''s disruptive innovation. The addition of AI features further improves design efficiency, maintaining its absolute leadership in the professional design tool market.'
WHERE slug = 'figma';

UPDATE tools SET description_en = 'A leading domestic online design platform in China with a vast library of Chinese-language templates and assets, particularly well-suited for new media operations and e-commerce design scenarios. Gaoding Design integrates AI technology into the design process, enabling domestic users to produce professional design work with simple operations.

Core features include AI smart design (input content to auto-generate designs), a massive library of Chinese templates (covering new media, e-commerce, print, and other scenarios), AI cutout and image editing, AI copy generation, smart brand toolkit, video templates and editing, team collaboration management, and commercial licensing.

Suitable for new media operation graphics, e-commerce detail pages and main images, marketing poster design, Xiaohongshu/WeChat Official Account covers, print materials, and other mainstream domestic commercial design scenarios.

Ideal for new media operators, e-commerce professionals, marketers, small and micro businesses, and solo entrepreneurs. In Chinese commercial design scenarios, Gaoding Design is one of the top choices for domestic users among online design tools.

The richness of Chinese templates and accurate grasp of localized design styles are Gaoding Design''s core competitive strengths. Deep optimization for new media and e-commerce scenarios gives it an important position in China''s commercial design market.'
WHERE slug = 'gaoding';

UPDATE tools SET description_en = 'An AI-powered logo and brand identity design platform that generates complete brand visual packages through a conversational interface after learning user preferences. Looka enables entrepreneurs and SMEs to obtain professional-grade logos and brand identity designs within minutes.

Core features include AI logo generation (answer design preference questions to auto-generate hundreds of options), brand kit design (integrated business cards, letterheads, social media assets, etc.), logo color and font fine-tuning, high-quality multi-format export (SVG, PNG, PDF, etc.), brand style guide generation, and commercial copyright protection.

Suitable for startup brand identity design from scratch, product logo design, personal brand visual design, event brand design, and more. Particularly valuable for early-stage startups needing professional brand identity on a limited budget.

Ideal for entrepreneurs, SME owners, freelancers, event planners, and non-profit organizations. For users needing professional brand design quickly but unable to afford design agency fees, Looka is the best choice.

AI auto-generation of complete brand packages is its core value — not just isolated logo designs but complete brand visual systems. Low cost and fast turnaround make it the preferred brand design tool for entrepreneurs.'
WHERE slug = 'looka';

UPDATE tools SET description_en = 'A domestic online UI design collaboration tool, widely regarded as the Chinese alternative to Figma. Js Design aligns with Figma on core collaboration experience while adding AI design assistant features and optimizing for Chinese designers'' usage habits and network environment.

Core features include AI design assistant (intelligently generating designs and components), real-time multi-person collaboration, design system management, interactive prototyping, design annotation and handoff, a rich library of domestic design resources and plugins, private deployment services (enterprise edition), and Figma file import.

Suitable for domestic team UI/UX design, product prototyping, design system construction, design-to-development handoff, and more. Particularly well-suited for Chinese teams needing a stable, reliable collaboration design tool compliant with domestic regulations.

Ideal for domestic UI/UX designers, product teams, internet companies, and design outsourcing teams. An excellent choice for design teams needing a domestic alternative or domestic server support.

Domestic security compliance and stable domestic network access are its core differentiating advantages. The addition of the AI design assistant keeps it at the forefront of innovation in the domestic design tool market.'
WHERE slug = 'js-design';

UPDATE tools SET description_en = 'A professional AI logo design tool that uses AI algorithms to automatically generate hundreds of logo options based on brand name, industry, and style preferences input by users. LogoAI focuses exclusively on the logo design niche, providing complete service from design to brand asset package export.

Core features include AI batch logo option generation, multiple design style options (minimalist, retro, tech, hand-drawn, etc.), online logo editor (color, font, layout fine-tuning), complete brand VI design (50+ brand assets including business cards, letterheads, social media, etc.), high-quality vector file export, and brand style guide.

Suitable for new company logo design, product brand identity design, app and website icon design, personal brand visual design, event logo design, and other scenarios requiring professional logos.

Ideal for entrepreneurs, SME owners, freelancers, designers (as inspiration reference), and non-designers. For users needing high-quality logos and complete brand asset packages, LogoAI is a one-stop solution.

AI generation focused exclusively on logo design performs excellently within this niche. Going beyond just generating logo images, it provides comprehensive brand asset packages, making it one of the most professional AI tools in the logo design space.'
WHERE slug = 'logoai';
