import { notFound } from 'next/navigation'
import DemoCanvasShell from '@/components/demo/DemoCanvasShell'
import DemoSidebar from '@/components/demo/DemoSidebar'
import DemoMarkdown from '@/components/notes/DemoMarkdown'
import { getDemoNotes } from '@/lib/demo-content'
import { getDemoBySlug } from '@/lib/demos'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const demo = getDemoBySlug(slug)

  if (!demo) {
    notFound()
  }

  const notes = await getDemoNotes(slug)

  return (
    <SidebarProvider>
      <DemoSidebar currentSlug={slug} />
      <SidebarInset>
        <div className="flex items-center gap-2 border-b px-4 py-2 md:hidden">
          <SidebarTrigger />
        </div>
        <div className="px-6 py-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {demo.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {demo.description}
            </p>
          </header>

          <section className="mb-10">
            <DemoCanvasShell slug={demo.slug} />
          </section>

          <section className="border-t pt-6">
            <DemoMarkdown content={notes} />
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
