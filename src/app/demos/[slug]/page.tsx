import { notFound } from "next/navigation";
import DemoCanvasShell from "@/components/demo/DemoCanvasShell";
import DemoSidebar from "@/components/demo/DemoSidebar";
import DemoMarkdown from "@/components/notes/DemoMarkdown";
import { getDemoNotes } from "@/lib/demo-content";
import { getDemoBySlug } from "@/lib/demos";

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const demo = getDemoBySlug(slug);

  if (!demo) {
    notFound();
  }

  const notes = await getDemoNotes(slug);

  return (
    <div className="demo-page">
      <DemoSidebar currentSlug={slug} />

      <main className="demo-main">
        <header className="demo-header">
          <h1>{demo.title}</h1>
          <p>{demo.description}</p>
        </header>

        <section className="demo-canvas-section">
          <DemoCanvasShell slug={demo.slug} />
        </section>

        <section className="demo-notes-section">
          <DemoMarkdown content={notes} />
        </section>
      </main>
    </div>
  );
}
