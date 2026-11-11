# Three.js Learning Lab

项目已清空原有页面、组件和 Demo 内容，保留现有依赖及 Next.js、TypeScript、Tailwind CSS 配置，供新页面开发使用。

## 启动

```bash
pnpm install
pnpm dev
```

打开 http://localhost:3000，当前首页为空白页。

## 开发入口

- `src/app/page.tsx`：首页内容。
- `src/app/layout.tsx`：根布局及页面元信息。
- `src/app/globals.css`：Tailwind CSS 入口及基础样式。
- `src/lib/utils.ts`：通用样式工具。
- `public/`：静态资源目录。

## 检查与构建

```bash
pnpm lint
pnpm build
```
