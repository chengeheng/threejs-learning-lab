"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Demo02OrbitControls() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    // geometry
    const geometry = new THREE.BoxGeometry();

    const material = new THREE.MeshNormalMaterial();

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;

    // animation
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      cube.rotation.y += 0.01;

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // resize handler
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", handleResize);

      controls.dispose();

      geometry.dispose();
      material.dispose();

      renderer.dispose();

      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}
