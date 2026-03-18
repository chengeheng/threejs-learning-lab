import Link from 'next/link'
import { demos } from '@/lib/demos'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Three.js Learning Lab
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          一个基于 Next.js App Router、React、TypeScript、Three.js 的项目式学习实验室。
        </p>
        <p className="text-muted-foreground leading-relaxed mt-2">
          每个 demo 都包含可运行示例与独立 markdown 笔记，适合长期复习与持续迭代。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-5">Demo 列表</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {demos.map((demo) => (
            <Link key={demo.slug} href={`/demos/${demo.slug}`}>
              <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base">{demo.title}</CardTitle>
                  <CardDescription>{demo.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
