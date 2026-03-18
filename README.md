# Three.js Learning Lab

基于 Next.js 构建的 Three.js 交互式学习平台，通过可运行的 Demo + 配套 Markdown 笔记，帮助开发者系统学习 Three.js 3D 渲染技术。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16（App Router） |
| 语言 | TypeScript 5（strict 模式） |
| 3D 渲染 | Three.js 0.183 |
| 样式 | Tailwind CSS 4 |
| 包管理 | pnpm |

## 快速开始

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 已有 Demo

| Demo | 主题 | 知识点 |
|------|------|--------|
| Demo01 | Basic Scene | Scene、PerspectiveCamera、WebGLRenderer、Mesh、动画循环 |
| Demo02 | Orbit Controls | OrbitControls、阻尼效果、极角限制、响应式 Canvas |

## 添加新 Demo

按以下步骤添加新 Demo：

**1. 创建目录和文件**

```
src/demos/demo{NN}-{kebab-case-name}/
├── component.tsx   # Three.js 实现（客户端组件）
├── meta.ts         # Demo 元数据
└── notes.md        # 配套学习笔记
```

**2. 注册到 `src/lib/demos.ts`**

```ts
import demo03Meta from '@/demos/demo03-lighting/meta'

export const demos: DemoMeta[] = [
  // ...
  demo03Meta,
]
```

**3. 注册到 `src/components/demo/DemoCanvasShell.tsx`**

```ts
const demoComponents: Record<string, ComponentType> = {
  // ...
  'demo03-lighting': dynamic(() => import('@/demos/demo03-lighting/component'), { ssr: false }),
}
```

详细规范参见 [`.claude/CLAUDE.md`](.claude/CLAUDE.md)。

## 目录结构

```
src/
├── app/                      # Next.js 路由层
│   ├── page.tsx              # 首页（Demo 卡片列表）
│   └── demos/[slug]/         # Demo 详情页（动态路由）
├── components/
│   ├── demo/
│   │   ├── DemoCanvasShell.tsx   # 动态加载 Demo 组件
│   │   └── DemoSidebar.tsx       # Demo 导航侧边栏
│   └── notes/
│       └── DemoMarkdown.tsx      # Markdown 渲染器
├── demos/                    # Demo 实现模块
│   ├── demo01-basic-scene/
│   └── demo02-orbit-controls/
└── lib/
    ├── demos.ts              # Demo 注册中心
    └── demo-content.ts       # notes.md 加载器
```

## 架构说明

- **服务端组件**：页面路由、Demo 列表、Markdown 内容加载（SEO 友好）
- **客户端组件**：Three.js Canvas、交互控制（依赖浏览器 API）
- **动态导入**：Demo 组件通过 `dynamic(() => import(...), { ssr: false })` 懒加载，避免 SSR 报错

## 扩展方向

- Lighting — 灯光与阴影
- Textures — 纹理贴图
- Shader — 自定义着色器 / GLSL
- Physics — 物理引擎（Cannon.js）
- Animation — 骨骼动画 / GLTF 模型加载
- Post-processing — 后期处理效果
