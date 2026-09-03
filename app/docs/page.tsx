import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { demoHref, demoLinkProps } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Docs', description: 'A public guide to the ideas and current scope of Vivacity.' };

const items = [['overview','Overview'],['world-models','World models'],['environments','Environments'],['actions','Actions'],['observations','Observations'],['execution','Execution'],['limits','Status and limits']];

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
          <div className="docs-side-note"><span>PROGRAM</span><p>Private technical access</p><span>REVISION</span><p>September 2026</p></div>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="docs-content">
        <section id="overview"><p className="doc-kicker">01 / OVERVIEW</p><h2>Vivacity is exploring infrastructure for agents that operate in changing environments.</h2><p>Most agent software is built around requests and responses. Real activity is different. Conditions change. Actions have side effects. Information arrives late or only in part. Vivacity is focused on the systems required to keep an agent grounded through that process.</p><div className="doc-callout"><strong>Current scope</strong><p>The public work is early and available through selected technical partnerships. Concepts and interfaces may change as the research develops.</p></div></section>
        <section id="world-models"><p className="doc-kicker">02 / WORLD MODELS</p><h2>A world model predicts. An agent still needs a system for acting on that prediction.</h2><p>Vivacity sits in the unresolved space between learned dynamics and operational software. The ambition is not another general-purpose world model. It is a runtime boundary where model rollouts, exact solvers, physics engines, and domain systems can inform the same agent decision without erasing their differences.</p><div className="doc-equation"><span>W<sub>t</sub></span><i>+</i><span>A<sub>t</sub></span><i>→</i><span>E</span><i>→</i><span>W<sub>t+1</sub></span></div><p className="doc-fine">World state plus action is routed through an execution process to produce a candidate next state. This notation is conceptual.</p></section>
        <section id="environments"><p className="doc-kicker">03 / ENVIRONMENTS</p><h2>An environment is a state space with memory.</h2><p>It includes the conditions an agent can observe, the constraints it must respect, and the variables that continue to evolve while the agent is working. A useful representation preserves identity, time, lineage, and admissible transitions.</p><ul><li><strong>Continuity</strong><span>State survives beyond one inference turn.</span></li><li><strong>Constraint surface</strong><span>The environment defines the boundary of admissible change.</span></li><li><strong>Lineage</strong><span>Every candidate state retains its causal origin.</span></li></ul></section>
        <section id="actions"><p className="doc-kicker">04 / ACTIONS</p><h2>An action is a proposed state transition.</h2><p>Vivacity treats action as something that can be typed, checked, executed, and evaluated. Preconditions define when a transition is admissible. Postconditions describe the evidence expected after execution.</p></section>
        <section id="observations"><p className="doc-kicker">05 / OBSERVATIONS</p><h2>Observation is a projection. State is the source.</h2><p>An observation operator maps a larger environment into the partial view an agent needs. That view may be visual, geometric, symbolic, or multimodal. It can be delayed or noisy without redefining the underlying state.</p><div className="doc-pair"><div><span>WORLDSTATE</span><p>The persistent variables, constraints, relations, and time index.</p></div><div><span>OBSERVATION</span><p>A task-conditioned projection for the next decision.</p></div></div></section>
        <section id="execution"><p className="doc-kicker">06 / EXECUTION</p><h2>Route each transition to the physics it requires.</h2><p>Closed-form dynamics may call for an exact solver. Contact-rich mechanics may require a physics engine. Open environments may benefit from learned rollouts. Private systems may use domain logic. The runtime should preserve a common causal trace while keeping each executor&apos;s evidence intact.</p><div className="execution-spectrum"><span>EXACT</span><span>PHYSICS</span><span>LEARNED</span><span>CUSTOM</span></div><p className="doc-fine">No third-party integrations are claimed here. Execution paths are research directions and partnership topics.</p></section>
        <section id="limits"><p className="doc-kicker">07 / STATUS AND LIMITS</p><h2>A technical direction, not a fictional release.</h2><ul><li><strong>No public SDK yet</strong><span>Interfaces remain subject to change.</span></li><li><strong>No published benchmarks yet</strong><span>Measurements will be shared only when they are meaningful.</span></li><li><strong>No implied integrations</strong><span>Named third-party systems are not presented as connected products.</span></li></ul><div className="docs-next"><h3>Building at this boundary?</h3><a href={demoHref} {...demoLinkProps} className="button button-dark">Schedule a conversation <ArrowUpRight /></a><Link href="/research" className="text-link">Read the research index ↗</Link></div></section>
      </SidebarInset>
    </SidebarProvider>
    <SiteFooter />
  </main>;
}
