# Three.js Learning Lab - 项目功能分析

## 项目概述

Three.js Learning Lab 是一个基于 Next.js 构建的 Three.js 交互式学习平台。项目通过可执行的 Demo 演示结合详细的 Markdown 文档，帮助开发者系统学习 Three.js 3D 渲染技术。

---

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 16.1.6 |
| UI 库 | React | 19.2.3 |
| 语言 | TypeScript | 5 |
| 3D 渲染 | Three.js | 0.183.2 |
| 样式 | Tailwind CSS | 4 |
| Markdown | react-markdown + remark-gfm | 10.1.0 / 4.0.1 |
| 包管理 | pnpm | - |

---

## 目录结构

```
threejs-learning-lab/
├── src/
│   ├── app/                          # Next.js App Router 路由层
│   │   ├── layout.tsx               # 根布局，配置 Geist 字体
│   │   ├── page.tsx                 # 首页，展示所有 Demo 卡片
│   │   ├── globals.css              # 全局样式
│   │   └── demos/
│   │       └── [slug]/
│   │           └── page.tsx         # Demo 动态路由页面
│   ├── components/                   # 可复用 UI 组件
│   │   ├── demo/
│   │   │   ├── DemoCanvasShell.tsx  # 动态加载 Demo 组件（客户端）
│   │   │   └── DemoSidebar.tsx      # Demo 导航侧边栏
│   │   └── notes/
│   │       └── DemoMarkdown.tsx     # Markdown 渲染器
│   ├── demos/                        # Demo 实现模块
│   │   ├── demo01-basic-scene/      # Demo 01：基础场景
│   │   └── demo02-orbit-controls/   # Demo 02：轨道控制
│   └── lib/                          # 共享工具库
│       ├── demos.ts                 # Demo 注册中心
│       └── demo-content.ts          # Markdown 文件加载器
├── public/                           # 静态资源
├── docs/                             # 项目文档
└── .claude/                          # Claude 代码生成规范
```

---

## 核心功能模块

### 1. 首页 Demo 列表

**路由：** `/`

**功能：**
- 服务端渲染，从 `lib/demos.ts` 读取所有 Demo 元数据
- 以卡片形式展示所有可用 Demo（标题 + 描述）
- 每个卡片链接到对应的 Demo 详情页

### 2. Demo 详情页

**路由：** `/demos/[slug]`

**功能：**
- 动态路由，根据 `slug` 查找对应 Demo
- 未找到时返回 404
- 页面组成：
  - **侧边栏（DemoSidebar）**：展示所有 Demo 导航，高亮当前 Demo
  - **Canvas 画布（DemoCanvasShell）**：动态加载并渲染 Three.js Demo
  - **Markdown 文档（DemoMarkdown）**：渲染 Demo 配套学习笔记

### 3. Demo 组件系统

每个 Demo 是独立模块，包含以下文件：

| 文件 | 用途 |
|------|------|
| `component.tsx` | Three.js 实现（客户端组件） |
| `meta.ts` | Demo 元数据（slug、title、description） |
| `notes.md` | 完整的 Markdown 学习笔记 |
| `note.ts` | 快速参考注释（当前未在 UI 中使用） |

**Demo 组件规范：**
- 使用 `"use client"` 指令
- `useRef` 绑定 DOM 容器
- `useEffect` 初始化 Three.js（空依赖数组）
- effect 清理函数中释放所有 Three.js 资源

### 4. 动态组件加载器（DemoCanvasShell）

- 使用 Next.js `dynamic()` + `ssr: false` 懒加载 Demo 组件
- 通过 slug → component 映射表查找对应组件
- 处理未找到 Demo 的降级场景

### 5. Demo 注册中心（lib/demos.ts）

- 维护所有 Demo 的元数据数组（单一数据源）
- 提供 `getDemoBySlug(slug)` 查询函数
- 新增 Demo 时需在此注册

### 6. Markdown 内容加载（lib/demo-content.ts）

- 基于 Node.js `fs` 读取 Demo 目录下的 `notes.md`
- 在请求时动态加载（非构建时打包）

---

## 已实现的 Demo

### Demo01 - Basic Scene（基础场景）

**Slug：** `demo01-basic-scene`

**学习目标：** 掌握 Three.js 最基础的场景搭建流程

**涉及知识点：**
- `Scene` 场景创建
- `PerspectiveCamera` 透视相机配置
- `WebGLRenderer` 渲染器设置
- `SphereGeometry` 球体几何体
- `MeshBasicMaterial` 基础材质
- `Mesh` 网格对象
- `requestAnimationFrame` 动画循环
- 资源清理（`dispose`）

**效果：** 渲染一个旋转的黄色球体（500px 画布）

---

### Demo02 - Orbit Controls（轨道控制）

**Slug：** `demo02-orbit-controls`

**学习目标：** 实现鼠标交互控制相机视角

**涉及知识点：**
- `OrbitControls` 轨道控制器（来自 `three/addons`）
- 阻尼效果（`enableDamping` + `dampingFactor`）
- 禁用缩放（`enableZoom = false`）
- 极角限制（`maxPolarAngle`）
- 响应式画布（监听 `window resize`）
- 相机宽高比动态更新
- 完整的事件监听器清理

**效果：** 可交互旋转的 3D 场景（法线材质，响应式）

---

## 数据流向

```
首页
  └─ 读取 lib/demos.ts → 渲染 Demo 卡片列表
        ↓ 点击卡片
Demo 详情页 [slug]
  ├─ 校验 slug → 不存在则 404
  ├─ 加载 notes.md → DemoMarkdown 渲染
  ├─ 渲染 DemoSidebar（所有 Demo 导航）
  └─ DemoCanvasShell
        └─ dynamic import → 执行 Demo 组件
```

---

## 架构决策

### 服务端 / 客户端分离

| 层级 | 渲染方式 | 原因 |
|------|----------|------|
| 页面结构、路由、内容加载 | 服务端（Server Component） | SEO 友好，减少客户端 JS |
| Three.js Canvas、交互 | 客户端（Client Component + `dynamic` ssr:false） | Three.js 依赖浏览器 API |

### 响应式 Canvas

- 使用容器尺寸（`clientWidth/clientHeight`），而非 `window.innerWidth`
- 监听 resize 事件同步相机宽高比和渲染器尺寸

### 资源管理规范

每个 Demo 的 `useEffect` 必须在清理函数中执行：
1. 取消 `requestAnimationFrame`
2. 移除事件监听器
3. 调用 `controls.dispose()`（如有）
4. 调用 `renderer.dispose()`
5. 从 DOM 中移除 `renderer.domElement`

---

## 扩展方向

基于当前架构，可以继续添加：
- Lighting（灯光与阴影）
- Textures（纹理贴图）
- Physics（物理引擎集成，如 Cannon.js）
- Post-processing（后期处理效果）
- Geometry（复杂几何体生成）
- Shader（自定义着色器 / GLSL）
- Animation（骨骼动画 / GLTF 模型加载）
