import Link from "next/link";
import { demos } from "@/lib/demos";

export default function HomePage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Three.js Learning Lab</h1>

      <p>
        一个基于 Next.js + React + Three.js 的学习项目， 每个知识点对应一个
        demo。
      </p>

      <h2>Demo 列表</h2>

      <ul>
        {demos.map((demo: any) => (
          <li key={demo.slug}>
            <Link href={`/demos/${demo.slug}`}>{demo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
