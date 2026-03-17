# CLAUDE.md - Three.js Learning Lab 代码生成规范

本文件定义了在此项目中生成、修改代码时应遵守的规范。所有 AI 辅助代码生成必须符合以下标准。

---

## 技术栈约束

- **框架：** Next.js App Router（不使用 Pages Router）
- **语言：** TypeScript，严格模式（`strict: true`）
- **3D 库：** Three.js（`three` + `three/addons`）
- **样式：** Tailwind CSS v4（不引入其他 CSS-in-JS 方案）
- **包管理：** pnpm（不使用 npm / yarn）

---

## 新增 Demo 规范

### 目录命名

```
src/demos/demo{NN}-{kebab-case-name}/
```

示例：`demo03-lighting`、`demo04-textures`

### 必须包含的文件

| 文件 | 说明 |
|------|------|
| `component.tsx` | Three.js Demo 实现（客户端组件） |
| `meta.ts` | Demo 元数据 |
| `notes.md` | 配套学习笔记（Markdown） |

### meta.ts 格式

```ts
import type { DemoMeta } from '@/lib/demos'

const meta: DemoMeta = {
  slug: 'demo{NN}-{name}',
  title: '英文标题',
  description: '一句话描述',
}

export default meta
```

### component.tsx 模板

```tsx
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Demo{NN}Component() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // --- Scene Setup ---
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // --- Objects ---
    // ... 在此添加几何体、材质、网格

    // --- Camera ---
    camera.position.z = 5

    // --- Animation ---
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      // ... 在此添加动画逻辑
      renderer.render(scene, camera)
    }
    animate()

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />
}
```

### 注册新 Demo

新 Demo 必须添加到 `src/lib/demos.ts` 的 demos 数组中：

```ts
import demo{NN}Meta from '@/demos/demo{NN}-{name}/meta'

export const demos: DemoMeta[] = [
  // ...已有 demos
  demo{NN}Meta,
]
```

同时在 `src/components/demo/DemoCanvasShell.tsx` 中添加动态导入映射：

```ts
const demoComponents: Record<string, ComponentType> = {
  // ...已有映射
  'demo{NN}-{name}': dynamic(() => import('@/demos/demo{NN}-{name}/component'), { ssr: false }),
}
```

---

## 组件规范

### 客户端 vs 服务端

| 场景 | 指令 |
|------|------|
| Three.js 组件、浏览器 API、交互 | `'use client'` |
| 页面路由、数据获取、布局 | 默认（Server Component） |
| Three.js Demo 动态加载 | `dynamic(() => import(...), { ssr: false })` |

### React Hooks 使用原则

- Three.js 初始化必须在 `useEffect` 中，依赖数组为空 `[]`
- 使用 `useRef` 绑定 DOM 容器，不用 `useState` 存储 Three.js 对象
- 不在组件外部创建 Three.js 对象（防止 SSR 报错）

---

## Three.js 资源管理规范

**所有 Demo 的 `useEffect` 清理函数必须包含：**

```ts
return () => {
  cancelAnimationFrame(animationId)           // 1. 取消动画帧
  window.removeEventListener('resize', ...)   // 2. 移除事件监听
  controls?.dispose()                         // 3. 销毁控制器（如有）
  geometry.dispose()                          // 4. 释放几何体
  material.dispose()                          // 5. 释放材质
  texture?.dispose()                          // 6. 释放纹理（如有）
  renderer.dispose()                          // 7. 释放渲染器
  container.removeChild(renderer.domElement)  // 8. 移除 DOM 元素
}
```

---

## Markdown 文档规范（notes.md）

每个 Demo 的 `notes.md` 应包含以下章节：

```markdown
# Demo标题

## 核心概念
简要介绍本 Demo 涉及的 Three.js 核心概念。

## 关键 API

| API | 说明 |
|-----|------|
| ... | ... |

## 代码解析
逐段解释关键代码的作用。

## 练习
列出 1-3 个可自行尝试的扩展练习。
```

---

## 样式规范

- **优先使用 Tailwind CSS 类名**，避免 inline style（除动态尺寸外）
- Canvas 容器高度使用 `style={{ height: '500px' }}` 或 Tailwind `h-[500px]`
- 响应式布局遵循 `globals.css` 中已定义的 CSS Grid 方案
- 不引入新的 CSS 框架或 CSS-in-JS 方案

---

## 代码风格

- 使用 2 空格缩进
- 字符串使用单引号（`'`）
- 文件末尾保留一个换行符
- 组件名使用 PascalCase，文件名使用 camelCase 或 kebab-case（与框架约定一致）
- Three.js 相关变量使用描述性命名（`sphereGeometry`，而非 `geo`）
- 避免魔法数字，提取为有意义的常量

---

## 禁止事项

- 不在 Server Component 中直接使用 `window`、`document` 等浏览器 API
- 不在组件外部实例化 Three.js 对象
- 不省略 `useEffect` 的清理函数
- 不使用 `any` 类型（除非有充分理由并添加注释）
- 不在 Demo 组件中混入业务逻辑（保持 Demo 纯粹性）
- 不跳过 Demo 注册步骤（`demos.ts` + `DemoCanvasShell.tsx` 必须同步更新）
