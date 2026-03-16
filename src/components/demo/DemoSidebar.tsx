import Link from "next/link";
import { demos } from "@/lib/demos";

export default function DemoSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <aside className="demo-sidebar">
      <div className="demo-sidebar-inner">
        <h2 className="demo-sidebar-title">Demos</h2>

        <nav>
          <ul className="demo-sidebar-list">
            {demos.map((demo) => {
              const isActive = demo.slug === currentSlug;

              return (
                <li key={demo.slug}>
                  <Link
                    href={`/demos/${demo.slug}`}
                    className={isActive ? "demo-link active" : "demo-link"}
                  >
                    <span className="demo-link-title">{demo.title}</span>
                    <span className="demo-link-desc">{demo.description}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
