import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function DemoMarkdown({ content }: { content: string }) {
  return (
    <article className="demo-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
