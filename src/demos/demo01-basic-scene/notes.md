# Demo01 - Basic Scene

## 本 demo 学什么

这个 demo 的目标是建立你对 Three.js 最核心渲染模型的第一层直觉。

在 Three.js 中，最基础的渲染过程可以理解为：

- 先创建一个 **场景（Scene）**
- 再创建一个 **相机（Camera）**
- 然后创建一个 **渲染器（Renderer）**
- 把一个可见物体（Mesh）放到场景里
- 最后调用 `renderer.render(scene, camera)` 把画面绘制出来

如果你把 Three.js 当成一个小型“3D 世界引擎”，那么：

- Scene = 世界容器
- Camera = 观察世界的眼睛
- Renderer = 把世界画到 canvas 上的机器
- Mesh = 世界中的具体物体

---

## 关注知识点

### 1. Scene

`Scene` 是 3D 世界的根容器。

你创建出来的物体，比如立方体、光源、辅助线，通常都要先添加到 scene 中：

```ts
const scene = new THREE.Scene();
scene.add(cube);
```

可以把它理解成一个“舞台”。

---

### 2. Camera

相机决定“你从哪里看这个 3D 世界”。

本 demo 使用的是透视相机：

```ts
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
```

参数含义：

- `75`：视野角度 FOV
- `width / height`：宽高比
- `0.1`：近裁剪面
- `1000`：远裁剪面

然后设置相机位置：

```ts
camera.position.z = 5;
```

如果不把相机往后移，你可能会“站在立方体里面”，导致看不到它。

---

### 3. Renderer

渲染器负责把 scene 和 camera 的结果真正画到页面上。

```ts
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);
```

这里有几个关键点：

- `WebGLRenderer`：底层使用 WebGL
- `setSize`：设置画布尺寸
- `renderer.domElement`：渲染器内部创建的 canvas 元素
- `appendChild`：把 canvas 挂到页面中

---

### 4. Geometry

`Geometry` 定义“物体的形状”。

本 demo 使用的是：

```ts
const geometry = new THREE.BoxGeometry();
```

它表示一个立方体的几何结构。

你后续可以替换成：

- `SphereGeometry`
- `PlaneGeometry`
- `ConeGeometry`

---

### 5. Material

`Material` 定义“物体表面怎么显示”。

本 demo 使用的是：

```ts
const material = new THREE.MeshBasicMaterial({
  color: 0x44aa88,
});
```

`MeshBasicMaterial` 的特点：

- 不受光照影响
- 适合最基础的入门 demo
- 颜色稳定，容易观察几何体本身

---

### 6. Mesh

`Mesh` = Geometry + Material

```ts
const cube = new THREE.Mesh(geometry, material);
```

可以理解成：

- Geometry 提供“骨架”
- Material 提供“皮肤”
- Mesh 才是能放到场景中的最终物体

---

### 7. Render

真正渲染的关键调用：

```ts
renderer.render(scene, camera);
```

这行代码可以理解为：

> 用 camera 的视角，把 scene 画到 renderer 对应的 canvas 上。

这是 Three.js 最核心的一行代码之一。

---

## Three.js 核心 API

### 创建场景

```ts
const scene = new THREE.Scene();
```

### 创建透视相机

```ts
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
```

### 创建渲染器

```ts
const renderer = new THREE.WebGLRenderer({ antialias: true });
```

### 创建几何体

```ts
const geometry = new THREE.BoxGeometry();
```

### 创建材质

```ts
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
```

### 创建网格

```ts
const cube = new THREE.Mesh(geometry, material);
```

### 添加到场景

```ts
scene.add(cube);
```

### 执行渲染

```ts
renderer.render(scene, camera);
```

---

## React / Next.js 关注点

### 为什么这个 demo 必须是 Client Component

因为 Three.js 运行依赖浏览器环境：

- `window`
- `document`
- `canvas`
- WebGL 上下文

这些东西在服务端都不存在，所以 Three.js 相关代码必须放在客户端组件中执行。

因此这个组件要写：

```ts
"use client";
```

---

### 为什么使用 useRef

我们需要拿到一个真实 DOM 容器，把 renderer 创建的 canvas 挂进去：

```ts
const containerRef = useRef<HTMLDivElement>(null);
```

Three.js 不是“声明式渲染 DOM”，而是“直接操作 canvas”。

所以这里更适合用 ref，而不是 state。

---

### 为什么使用 useEffect

Three.js 初始化需要等组件挂载后才能拿到 DOM：

```ts
useEffect(() => {
  // init three.js
}, []);
```

这和前端里“组件挂载后初始化第三方库”的模式非常像。

---

## 运行机制

这个 demo 的完整执行流程可以概括为：

1. React 渲染一个空的 div 容器
2. `useEffect` 执行
3. 创建 scene / camera / renderer
4. 创建 geometry / material / mesh
5. 把 mesh 添加到 scene
6. 把 renderer.domElement 挂到 div 容器里
7. 调用 `renderer.render(scene, camera)`
8. 页面显示出立方体

---

## 可实验项

你可以主动改这些参数来建立直觉。

### 修改颜色

```ts
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
```

### 修改几何体

```ts
const geometry = new THREE.SphereGeometry();
```

### 修改相机距离

```ts
camera.position.z = 2;
```

### 修改视野角度

```ts
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
```

---

## 常见错误

### 1. 没有把 renderer.domElement 挂到页面

如果漏掉：

```ts
container.appendChild(renderer.domElement);
```

那么 Three.js 虽然在渲染，但页面上不会显示 canvas。

---

### 2. 相机位置不对

如果相机离物体太近、太远，或者方向不对，就可能看不到物体。

最常见做法是先：

```ts
camera.position.z = 5;
```

---

### 3. 容器高度为 0

如果外层 div 没有高度：

```ts
<div ref={containerRef} style={{ height: "500px" }} />
```

那么 canvas 可能不可见，或者尺寸异常。

---

### 4. 没有做清理

组件卸载时应该清理：

- geometry
- material
- renderer
- domElement

否则后面做多页面切换时容易留下内存问题。

---

## 本 demo 总结

这个 demo 解决的是 Three.js 最根本的问题：

> 如何在浏览器里显示第一个 3D 物体。

你需要记住这个最小渲染公式：

```ts
Scene + Camera + Renderer + Mesh;
```

以及最关键的一行：

```ts
renderer.render(scene, camera);
```

这就是后面所有复杂效果的基础。

---

## 练习题

1. 把立方体改成球体
2. 把颜色改成红色或蓝色
3. 尝试把相机拉近到 `z = 2`，观察画面变化
4. 尝试把 FOV 从 `75` 改成 `45`，观察透视变化
   `
