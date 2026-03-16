import Link from "next/link";
import { demos } from "@/lib/demos";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <h1>Three.js Learning Lab</h1>
        <p>
          一个基于 Next.js App Router、React、TypeScript、Three.js
          的项目式学习实验室。
        </p>
        <p>
          每个 demo 都包含可运行示例与独立 markdown
          笔记，适合长期复习与持续迭代。
        </p>
      </section>

      <section className="home-list-section">
        <h2>Demo 列表</h2>

        <div className="home-demo-list">
          {demos.map((demo) => (
            <Link
              key={demo.slug}
              href={`/demos/${demo.slug}`}
              className="home-demo-card"
            >
              <h3>{demo.title}</h3>
              <p>{demo.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
