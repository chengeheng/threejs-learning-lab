# Demo02 - Orbit Controls

## 本 demo 学什么

这个 demo 的目标是让场景从“只能看”升级为“可以操作”。

在上一个 demo 中，我们已经能把立方体渲染出来。  
但那个场景仍然是静止的、固定视角的。

这一节加入 `OrbitControls` 之后，你可以：

- 鼠标拖动旋转视角
- 滚轮缩放
- 更直观地观察 3D 物体
- 理解相机控制是如何接入 Three.js 的

同时，这一节也会引入一个真实项目中非常重要的点：

- 当页面尺寸变化时，必须同步更新 camera 和 renderer

---

## 关注知识点

### 1. OrbitControls 是什么

`OrbitControls` 是 Three.js 官方 examples 中常用的相机控制器。

它不是核心包中直接默认挂好的高级 API，而是一个额外引入的控制模块：

```ts
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
```

初始化方式：

```ts
const controls = new OrbitControls(camera, renderer.domElement);
```

含义：

- 第一个参数是你要控制的相机
- 第二个参数是监听用户交互的 DOM 元素，通常就是 renderer 的 canvas

---

### 2. controls 的作用对象其实是相机，不是物体

这是一个很容易混淆的点。

`OrbitControls` 不是在转立方体，而是在改变相机观察场景的方式。

所以你拖动鼠标时，看起来像“物体在转”，本质上通常是“相机绕着目标点在转”。

这和很多 3D 软件里的操作逻辑类似。

---

### 3. enableDamping

```ts
controls.enableDamping = true;
```

开启后，交互会有“惯性”和“缓动感”，不会一下子生硬停止。

如果开启 damping，就必须在动画循环里持续调用：

```ts
controls.update();
```

否则阻尼效果不会生效。

---

### 4. Resize 为什么必须处理

如果页面尺寸变化，而你没有同步更新 camera 和 renderer，就会出现：

- 画面拉伸
- 比例失真
- canvas 尺寸和容器不一致

正确处理方式是：

```ts
camera.aspect = width / height;
camera.updateProjectionMatrix();
renderer.setSize(width, height);
```

这里有两个非常重要的点：

- 更新 `aspect` 后一定要调用 `updateProjectionMatrix()`
- renderer 的尺寸也要同步更新

---

### 5. 为什么优先使用 container.clientWidth / clientHeight

很多教程会直接写：

```ts
window.innerWidth;
window.innerHeight;
```

这种写法只适合“全屏 canvas demo”。

但真实项目中，canvas 往往只是页面中的一个区域，不一定全屏。

所以更推荐：

```ts
const width = container.clientWidth;
const height = container.clientHeight;
```

这样你的 Three.js 组件就更容易被复用到：

- 页面局部区域
- 卡片区域
- 分栏布局
- 教学平台中的 demo 区

---

## Three.js 核心 API

### 引入控制器

```ts
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
```

### 创建控制器

```ts
const controls = new OrbitControls(camera, renderer.domElement);
```

### 开启阻尼

```ts
controls.enableDamping = true;
```

### 每帧更新 controls

```ts
controls.update();
```

### 更新相机宽高比

```ts
camera.aspect = width / height;
camera.updateProjectionMatrix();
```

### 更新 renderer 尺寸

```ts
renderer.setSize(width, height);
```

---

## React / Next.js 关注点

### 为什么 controls 要在 useEffect 里创建

因为它依赖：

- camera
- renderer
- renderer.domElement

而这些都需要等组件挂载后初始化完成。

所以 controls 的创建应该和 Three.js 初始化放在同一个 effect 生命周期里。

---

### 为什么 resize 监听也放在 useEffect 里

因为它是一个典型的副作用：

- 挂载时注册事件
- 卸载时移除事件

模式如下：

```ts
useEffect(() => {
  const handleResize = () => {};

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

---

### 为什么这一部分仍然是 Client Component

`OrbitControls` 依赖用户输入事件和浏览器 canvas，因此只能运行在客户端。

所以包含 controls 的 demo 组件仍然必须写：

```ts
"use client";
```

而 demo 的标题、说明、学习重点，则仍然可以放在服务端页面里输出。

---

## 运行机制

这个 demo 的执行流程可以理解为：

1. React 渲染一个 canvas 容器
2. `useEffect` 初始化 scene / camera / renderer
3. 创建 cube
4. 创建 OrbitControls，把相机和 canvas 绑定起来
5. 启动动画循环
6. 每一帧执行：
   - 更新 cube 旋转
   - 更新 controls
   - 渲染 scene
7. 当窗口尺寸变化时：
   - 更新 camera.aspect
   - 更新相机投影矩阵
   - 更新 renderer 大小

---

## 可实验项

### 关闭缩放

```ts
controls.enableZoom = false;
```

### 关闭旋转

```ts
controls.enableRotate = false;
```

### 调整阻尼强度

```ts
controls.enableDamping = true;
controls.dampingFactor = 0.05;
```

### 限制上下旋转角度

```ts
controls.maxPolarAngle = Math.PI / 2;
```

### 改成立方体不旋转，只操作相机

把：

```ts
cube.rotation.y += 0.01;
```

临时删掉，观察“物体没动但视角可动”的效果。

---

## 常见错误

### 1. 开启 damping 却没调用 controls.update()

如果你写了：

```ts
controls.enableDamping = true;
```

但动画循环里没有：

```ts
controls.update();
```

那么阻尼效果不会生效。

---

### 2. resize 时只改 renderer，不改 camera

只写：

```ts
renderer.setSize(width, height);
```

是不够的。

相机投影也依赖宽高比，所以必须同时更新：

```ts
camera.aspect = width / height;
camera.updateProjectionMatrix();
```

---

### 3. 忘记清理 controls

组件卸载时应该调用：

```ts
controls.dispose();
```

否则一些事件监听可能残留。

---

### 4. 使用 window.innerWidth 导致局部布局失真

如果你的 demo 区域不是全屏，而你仍然用：

```ts
window.innerWidth;
```

那么 canvas 尺寸可能和真实容器不一致。

---

## 本 demo 总结

这个 demo 的核心价值有两个：

### 第一层：交互能力升级

你第一次让 Three.js 场景真正“能操作”。

用户不再只是被动看画面，而是可以主动控制视角。

### 第二层：工程意识升级

你开始接触真实项目中必须处理的问题：

- 容器尺寸
- 响应式
- 事件监听
- 生命周期清理

所以这一节不是只学一个 controls API，而是在学：

> 如何把 Three.js 放进一个真实的 React / Next.js 页面系统里。

---

## 练习题

1. 禁止滚轮缩放，只保留拖动旋转
2. 删除 cube 自转，观察 controls 单独工作的效果
3. 设置 `maxPolarAngle`，限制相机不能转到物体底部
4. 尝试把材质换成 `MeshBasicMaterial`、`MeshNormalMaterial`，观察视觉差异
