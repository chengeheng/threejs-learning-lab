import { meta as demo01Meta } from "@/demos/demo01-basic-scene/meta"
import { meta as demo02Meta } from "@/demos/demo02-orbit-controls/meta"

export const demos = [demo01Meta, demo02Meta]

export function getDemoBySlug(slug: string) {
  return demos.find((demo) => demo.slug === slug)
}