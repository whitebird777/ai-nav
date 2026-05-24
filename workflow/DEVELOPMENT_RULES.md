# Development Rules

## Task System（任务系统）

### 拆分规则
- 所有任务必须拆分成小步骤
- 每个步骤应该可在 15-30 分钟内完成
- 复杂功能先拆分子任务再逐步实现

### 记录规则
- 所有步骤必须记录到 docs/TASKS.md
- 每完成一步必须更新状态
- 使用状态标记：`pending` → `in_progress` → `completed`

## Persistence（持久化）

### 写入规则
- 所有长期状态必须写入 docs/ 目录
- 项目计划写入 PROJECT_PLAN.md
- 任务进度写入 TASKS.md

### 恢复规则
- 上下文丢失后必须重新读取 docs/ 下的所有文件
- 基于持久化状态恢复工作进度
- 不得依赖内存中的临时状态

## Documentation（文档）

### 同步规则
- README 必须同步更新
- 所有重要决策必须记录到 PROJECT_PLAN.md 的 Decisions Log
- API 变更必须同步更新文档

### 决策记录
- 记录做了什么决策
- 记录为什么这样做
- 记录日期和相关任务
