export const notes = `
知识点：

1 OrbitControls
2 Camera interaction
3 Resize handling

核心 API：

new OrbitControls(camera, renderer.domElement)

为什么需要 controls.update()

controls 可能启用了 damping（惯性效果）。

resize 必须更新：

camera.aspect
renderer.setSize
`