# Demo03 - Light + Material

## 本 demo 学什么

这一节是 Three.js 学习过程中一个非常关键的节点。

在前两个 demo 中，我们已经实现：

- 创建一个 Three.js 场景
- 创建相机并观察 3D 世界
- 创建几何体并显示
- 使用 OrbitControls 交互旋转视角
- 通过动画循环让物体持续旋转

但是前两个 demo 中的立方体，看起来更像：

- 一个被画出来的几何图形
- 一个固定颜色的盒子
- 一个存在于 3D 坐标系中，但没有明显空间质感的对象

这一节开始，我们引入：

- 光源（Light）
- 受光材质（Material）

你会看到：

- 同一个物体的不同面会出现明暗差异
- 物体旋转时，亮面和暗面会发生变化
- 画面开始产生明显的立体感
- 物体开始看起来更“真实”

这是从：

> 能显示 3D 物体

进入：

> 开始表现 3D 世界

的重要一步。

---

## 为什么这一节很重要

Three.js 的很多能力都建立在这一节之上，例如：

- 阴影（Shadow）
- 纹理（Texture）
- PBR 材质
- 环境贴图（Environment Map）
- HDR 光照
- 模型材质表现（GLTF）
- 真实感渲染（Realistic Rendering）

如果没有光照和材质的基础概念：

后面很多效果会：

- 看起来不明显
- 调不出想要的视觉效果
- 难以理解为什么画面不对

所以这一节的核心目标不是“记住几个 API”，而是建立：

**光照 + 材质 = 立体感**

的直觉。

---

## 本 demo 的核心变化

前两个 demo 使用的是：

```ts
MeshBasicMaterial;
```

特点：

- 不受光照影响
- 始终显示固定颜色
- 无论有没有光，颜色都不会变化

例如：

```ts
const material = new THREE.MeshBasicMaterial({
  color: 0x44aa88,
});
```

这种材质非常适合入门，因为：

你可以先专注理解：

- Scene
- Camera
- Renderer
- Geometry
- Mesh

这些核心结构。

但它无法表现真实世界中的：

- 明暗变化
- 受光变化
- 表面质感

所以这一节我们改用：

```ts
MeshStandardMaterial;
```

它的特点是：

- 会受到光照影响
- 支持真实感材质参数
- 能产生明暗变化
- 能表现表面质感

但是：

⚠️ 使用受光材质时，如果场景里没有光，物体可能会非常暗。

所以：

**Light 和 StandardMaterial 通常需要一起使用。**

---

## Three.js 渲染中 Light 的作用

光源的作用是：

决定：

- 哪些面更亮
- 哪些面更暗
- 表面如何表现立体感

在现实世界中，我们看到物体：

是因为光照到物体后反射进入眼睛。

在 Three.js 中：

也是同样的逻辑。

如果没有光：

就无法计算：

- 明面
- 暗面
- 阴影方向
- 表面反射

所以：

**光照是 3D 真实感的重要来源。**

---

## 本 demo 使用的两种光源

我们使用两种光：

### 1. AmbientLight

环境光

### 2. DirectionalLight

方向光

这两种光组合，可以快速建立基础立体感。

---

## AmbientLight（环境光）

### 概念

AmbientLight 表示环境中的整体亮度。

它的特点是：

- 没有方向
- 均匀照亮所有物体
- 不产生明显阴影
- 提供基础亮度

代码：

```ts
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
```

### 参数说明

```ts
new THREE.AmbientLight(color, intensity);
```

color：

光的颜色

```ts
0xffffff;
```

表示白光。

intensity：

光强度

```ts
0.6;
```

表示亮度程度。

### 视觉效果

环境光的作用是：

避免场景完全变黑。

如果只有方向光：

物体背光面可能非常黑。

环境光可以让暗面仍然可见。

可以把它理解为：

现实世界中空间的整体亮度。

例如：

- 室内漫反射光
- 天空散射光
- 环境亮度

---

## DirectionalLight（方向光）

### 概念

DirectionalLight 是有方向的光源。

它的特点：

- 从一个方向照射
- 产生明显明暗变化
- 能制造立体感

代码：

```ts
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);

directionalLight.position.set(3, 3, 3);

scene.add(directionalLight);
```

### 参数说明

```ts
new THREE.DirectionalLight(color, intensity);
```

position：

光源方向

```ts
light.position.set(x, y, z);
```

会影响：

哪个面更亮。

### 可以理解为：

太阳光。

它提供：

主要光照方向。

### 为什么方向重要

光的位置会影响：

立方体哪一面：

最亮

哪一面：

最暗。

所以实验时建议：

多尝试不同光位置。

例如：

```ts
directionalLight.position.set(5, 1, 2);
```

```ts
directionalLight.position.set(-3, 2, 1);
```

观察变化。

---

## 为什么通常同时使用 AmbientLight 和 DirectionalLight

如果只有 AmbientLight：

所有面亮度接近。

立体感不明显。

如果只有 DirectionalLight：

暗面可能过黑。

画面对比过强。

组合使用：

可以获得更自然的效果。

```txt
AmbientLight → 提供基础亮度

DirectionalLight → 提供方向层次
```

---

## MeshStandardMaterial（标准材质）

这是 Three.js 中常用的真实感材质。

示例：

```ts
const material = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,

  roughness: 0.4,

  metalness: 0.2,
});
```

相比 BasicMaterial：

StandardMaterial：

会参与光照计算。

---

## Material 的三个重要参数

### 1. color

基础颜色。

```ts
color: 0x3b82f6;
```

表示：

物体本身颜色。

但最终显示效果：

还会受到光照影响。

---

### 2. roughness（粗糙度）

控制：

表面粗糙程度。

范围：

```txt
0 → 光滑
1 → 粗糙
```

示例：

```ts
roughness: 0.1;
```

看起来更光滑。

```ts
roughness: 0.8;
```

看起来更粗糙。

现实类比：

粗糙：

- 水泥
- 木头
- 石头

光滑：

- 塑料
- 抛光表面

---

### 3. metalness（金属度）

控制：

是否具有金属质感。

范围：

```txt
0 → 非金属

1 → 金属
```

示例：

```ts
metalness: 0;
```

类似：塑料。

```ts
metalness: 1;
```

类似：金属。

现实类比：

非金属：

- 塑料
- 木头
- 橡胶

金属：

- 铁
- 铜
- 铝

---

## 为什么使用立方体

立方体的优点：

面非常清晰。每个面朝向不同方向。

所以：

光照变化更容易观察。

旋转时：

明暗变化明显。

非常适合理解：

光照效果。

---

## Three.js 核心代码结构

创建 geometry：

```ts
const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
```

创建 material：

```ts
const material = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,

  roughness: 0.4,

  metalness: 0.2,
});
```

创建 mesh：

```ts
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
```

创建环境光：

```ts
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

scene.add(ambientLight);
```

创建方向光：

```ts
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);

directionalLight.position.set(3, 3, 3);

scene.add(directionalLight);
```

---

## React / Next.js 关注点

这一节的 demo 仍然必须是 Client Component。

原因：

Three.js 依赖：

- canvas
- WebGL
- 浏览器 API
- requestAnimationFrame

所以：

组件必须：

```ts
"use client";
```

而：notes.md：是纯文本。

适合：Server Component 渲染。

这正是当前项目结构的价值：

Server：负责：文档 + 页面结构。

Client：负责：交互 + 3D 渲染。

---

## Demo 执行流程

1 创建 HTML 容器

```tsx
<div ref={containerRef} />
```

2 初始化 Three.js

创建：

scene

camera

renderer

3 创建物体

geometry

material

mesh

4 添加光源

AmbientLight

DirectionalLight

5 创建 OrbitControls

允许用户拖动视角。

6 启动动画循环

每一帧：

更新 rotation。

重新 render。

7 resize 处理

更新：

camera aspect

renderer size。

8 组件卸载时清理资源。

---

## 可实验项

建议亲自修改参数观察效果。

实验 1：

修改颜色。

```ts
color: 0xf97316;
```

实验 2：

对比 roughness：

```ts
roughness: 0.1;

roughness: 0.5;

roughness: 0.9;
```

实验 3：

对比 metalness：

```ts
metalness: 0;

metalness: 0.5;

metalness: 1;
```

实验 4：

删除环境光：

观察暗面变化。

实验 5：

删除方向光：

观察立体感变化。

实验 6：

改变光源方向：

```ts
directionalLight.position.set(5, 1, 2);
```

实验 7：

只改变相机角度：

观察光照变化。

---

## 常见错误

错误 1：使用 StandardMaterial。但没有添加光。

结果：物体很暗。

错误 2：只添加环境光。立体感不明显。

错误 3：只调材质参数。不调光方向。

错误 4：误以为材质无效。实际是光照不足。

错误 5：开启 damping。忘记：

```ts
controls.update();
```

---

## 本节核心结论

BasicMaterial：不受光影响。

StandardMaterial：受光影响。

AmbientLight：提供基础亮度。

DirectionalLight：提供方向感。

roughness：控制粗糙程度。

metalness：控制金属质感。

最终视觉效果：

由：材质 + 光照 + 观察角度 共同决定。

---

## 最小知识总结

```txt
Geometry 定义形状

Material 定义表面

Light 定义明暗

Camera 定义观察方式
```

四者共同决定：

最终画面效果。

---
