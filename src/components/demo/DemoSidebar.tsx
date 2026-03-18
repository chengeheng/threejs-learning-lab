import Link from 'next/link'
import { demos } from '@/lib/demos'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export default function DemoSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Demos</SidebarGroupLabel>
          <SidebarMenu>
            {demos.map((demo) => (
              <SidebarMenuItem key={demo.slug}>
                <SidebarMenuButton
                  asChild
                  isActive={demo.slug === currentSlug}
                  tooltip={demo.title}
                >
                  <Link href={`/demos/${demo.slug}`}>
                    <span className="font-medium">{demo.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
