import { notFound } from "next/navigation"
import { demos } from "@/lib/demos"
import DemoCanvasShell from "@/components/demo/DemoCanvasShell"

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const demo = demos.find((d) => d.slug === slug)

  if (!demo) {
    notFound()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{demo.title}</h1>
      <p>{demo.description}</p>
      <DemoCanvasShell slug={demo.slug} />
    </div>
  )
}