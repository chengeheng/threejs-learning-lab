"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const demoMap: Record<string, ComponentType<any>> = {
  "demo01-basic-scene": dynamic(
    () => import("@/demos/demo01-basic-scene/component"),
    { ssr: false }
  ),
  "demo02-orbit-controls": dynamic(
    () => import("@/demos/demo02-orbit-controls/component"),
    { ssr: false }
  ),
};

export default function DemoCanvasShell({ slug }: { slug: string }) {
  const DemoComponent = demoMap[slug];

  if (!DemoComponent) {
    return <div>Demo component not found.</div>;
  }

  return (
    <div className="demo-canvas-shell">
      <DemoComponent />
    </div>
  );
}
