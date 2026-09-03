import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { demoHref, demoLinkProps } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Docs', description: 'A public guide to the ideas and current scope of Vivacity.' };

const items = [['overview','Overview'],['environments','Environments'],['actions','Actions'],['observations','Observations'],['execution','Execution'],['limits','Status and limits']];

export default function DocsPage() {
  return <main><SiteHeader />
    <div className="docs-heading"><p className="section-index">DOCS / PUBLIC GUIDE</p><h1>Working concepts.</h1><p>A practical overview of the ideas shaping Vivacity. This is not final API documentation.</p></div>
    <SidebarProvider className="docs-provider" style={{ '--sidebar-width': '18rem' } as React.CSSProperties}>
      <Sidebar collapsible="none" className="docs-sidebar">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="docs-nav-label">ON THIS PAGE</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{items.map(([id,label],index) => <SidebarMenuItem key={id}><a className="docs-nav-link" href={'#'+id}><span>0{index+1}</span>{label}</a></SidebarMenuItem>)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="docs-side-note"><span>STATUS</span><p>Research in progress</p><span>REVISION</span><p>September 2026</p></div>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="docs-content">
        <section id="overview"><p className="doc-kicker">01 / OVERVIEW</p><h2>Vivacity is exploring infrastructure for agents that operate in changing environments.</h2><p>Most agent software is built around requests and responses. Real activity is different. Conditions change. Actions have side effects. Information arrives late or only in part. Vivacity is focused on the systems required to keep an agent grounded through that process.</p><div className="doc-callout"><strong>Current scope</strong><p>The public work is early and available through selected technical partnerships. Concepts and interfaces may change as the research develops.</p></div></section>
        <section id="environments"><p className="doc-kicker">02 / ENVIRONMENTS</p><h2>An environment is more than the latest message.</h2><p>It includes the conditions an agent can observe, the constraints it must respect, and the parts that continue to change while the agent is working.</p><ul><li><strong>Continuity</strong><span>Useful context survives beyond one turn.</span></li><li><strong>Boundaries</strong><span>The environment says what can change and what cannot.</span></li><li><strong>History</strong><span>Changes can be understood in relation to what came before.</span></li></ul></section>
        <section id="actions"><p className="doc-kicker">03 / ACTIONS</p><h2>An action is a proposal with consequences.</h2><p>Vivacity treats action as something that can be described, checked, and evaluated. That makes room for systems to ask whether an action is allowed, what it may affect, and what evidence should follow.</p></section>
        <section id="observations"><p className="doc-kicker">04 / OBSERVATIONS</p><h2>An agent sees a view, not the whole world.</h2><p>Observations are partial by nature. They can be delayed, noisy, or shaped for a task. The system still needs a coherent account of the environment behind that view.</p><div className="doc-pair"><div><span>ENVIRONMENT</span><p>What the system currently treats as true.</p></div><div><span>OBSERVATION</span><p>What the agent receives for its next decision.</p></div></div></section>
        <section id="execution"><p className="doc-kicker">05 / EXECUTION</p><h2>Different problems call for different computational tools.</h2><p>Some changes can be computed exactly. Others depend on an existing engine, a learned model, or private domain logic. Our research asks how those paths can participate in one understandable agent workflow.</p><p className="doc-fine">No third-party integrations are claimed here. Execution paths are research directions and partnership topics.</p></section>
        <section id="limits"><p className="doc-kicker">06 / STATUS AND LIMITS</p><h2>What this guide does not promise.</h2><ul><li><strong>No public SDK yet</strong><span>Interfaces remain subject to change.</span></li><li><strong>No published benchmarks yet</strong><span>We will share measurements only when they are meaningful.</span></li><li><strong>No implied integrations</strong><span>Named third-party systems are not presented as connected products.</span></li></ul><div className="docs-next"><h3>Working on a system like this?</h3><a href={demoHref} {...demoLinkProps} className="button button-dark">Talk to the team <ArrowUpRight /></a><Link href="/research" className="text-link">Read the research index ↗</Link></div></section>
      </SidebarInset>
    </SidebarProvider>
    <SiteFooter />
  </main>;
}
