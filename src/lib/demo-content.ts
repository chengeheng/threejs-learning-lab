import { readFile } from "fs/promises"
import path from "path"

export async function getDemoNotes(slug: string) {
  const filePath = path.join(process.cwd(), "src", "demos", slug, "notes.md")

  const content = await readFile(filePath, "utf-8")
  return content
}