import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'A public guide to the ideas and current scope of Vivacity.',
};

const items = [
  ['overview', 'Overview'],
  ['world-models', 'World models'],
  ['environments', 'Environments'],
  ['actions', 'Actions'],
  ['observations', 'Observations'],
  ['execution', 'Execution'],
  ['limits', 'Status and limits'],
];

export default function DocsPage() {
  return (
    <main id="content">
      <SiteHeader />
      <div className="docs-heading">
        <p className="section-index">Product guide</p>
        <h1>Working concepts.</h1>
        <p>
          A practical overview of the ideas shaping Vivacity. This is not final
          API documentation.
        </p>
      </div>
      <SidebarProvider
        className="docs-provider"
        style={{ '--sidebar-width': '18rem' } as React.CSSProperties}
      >
        <Sidebar collapsible="none" className="docs-sidebar">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="docs-nav-label">
                On this page
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(([id, label]) => (
                    <SidebarMenuItem key={id}>
                      <a className="docs-nav-link" href={'#' + id}>
                        {label}
                      </a>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="docs-side-note">
              <p>
                An early robotics workspace, with a broader experimentation
                system in development.
              </p>
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="docs-content">
          <section id="overview">
            <p className="doc-kicker">Overview</p>
            <h2>Virtual labs for investigating physical decisions.</h2>
            <p>
              Vivacity is developing an experimentation runtime for AI agents,
              beginning with industrial robotics. The aim is to connect a
              physical question to a configured scenario, controlled changes,
              repeatable execution, and evidence that can guide the next trial.
            </p>
            <div className="doc-callout">
              <strong>Current scope</strong>
              <p>
                The live workspace exposes bounded robot tasks with physical
                settings, recorded trials, measurements, and an execution log.
                The broader architecture described here is in development; it is
                not a released general-purpose API.
              </p>
            </div>
          </section>
          <section id="world-models">
            <p className="doc-kicker">World models</p>
            <h2>
              A world model predicts. An agent still needs a system for acting
              on that prediction.
            </h2>
            <p>
              A learned world model estimates how a system might evolve. A
              physics simulator executes specified dynamics. Our proposed
              runtime organizes the experiments around those models: which
              assumptions changed, what ran, what was measured, and which result
              should inform the next decision. Backend interoperability is a
              development goal, with semantics that must be validated separately
              for each tool.
            </p>
            <div className="doc-equation">
              <span>
                W<sub>t</sub>
              </span>
              <i>+</i>
              <span>
                A<sub>t</sub>
              </span>
              <i>→</i>
              <span>E</span>
              <i>→</i>
              <span>
                W<sub>t+1</sub>
              </span>
            </div>
            <p className="doc-fine">
              World state plus action is routed through an execution process to
              produce a candidate next state. This notation is conceptual.
            </p>
          </section>
          <section id="environments">
            <p className="doc-kicker">Environments</p>
            <h2>Start with a precisely defined scenario.</h2>
            <p>
              For manipulation, a scenario includes robot geometry, joint
              limits, object placement, contact parameters, and a controller. A
              reproducible baseline also needs simulator configuration, seeds,
              controller memory, and any internal state that affects the result.
              Saving a picture or joint pose alone is insufficient.
            </p>
            <ul>
              <li>
                <strong>Continuity</strong>
                <span>State survives beyond one inference turn.</span>
              </li>
              <li>
                <strong>Constraint surface</strong>
                <span>
                  The environment defines the boundary of admissible change.
                </span>
              </li>
              <li>
                <strong>Lineage</strong>
                <span>Every candidate state retains its causal origin.</span>
              </li>
            </ul>
          </section>
          <section id="actions">
            <p className="doc-kicker">Actions</p>
            <h2>An action is a proposed state transition.</h2>
            <p>
              An experiment specifies the starting conditions, the intervention,
              and the criteria used to interpret the result. For example: keep
              the approach trajectory fixed, vary object mass, and measure
              placement error. A useful action interface must retain units,
              coordinate frames, joint constraints, and controller-specific
              limits. These are proposed interface requirements, not public SDK
              guarantees.
            </p>
          </section>
          <section id="observations">
            <p className="doc-kicker">Observations</p>
            <h2>Keep a measurement connected to its source.</h2>
            <p>
              A rendered frame, a simulated contact force, and a hardware sensor
              reading provide different kinds of evidence. Their source, time,
              units, and uncertainty should remain visible. Comparing predicted
              and measured behavior only makes sense when the conditions and
              observation processes are aligned.
            </p>
            <div className="doc-pair">
              <div>
                <span>Scenario state</span>
                <p>
                  The persistent variables, constraints, relations, and time
                  index.
                </p>
              </div>
              <div>
                <span>Observation</span>
                <p>A task-conditioned projection for the next decision.</p>
              </div>
            </div>
          </section>
          <section id="execution">
            <p className="doc-kicker">Execution</p>
            <h2>Route each transition to the physics it requires.</h2>
            <p>
              Closed-form dynamics may call for an exact solver. Contact-rich
              mechanics may require a physics engine. Open environments may
              benefit from learned rollouts. Private systems may use domain
              logic. The runtime should preserve a common causal trace while
              keeping each executor&apos;s evidence intact.
            </p>
            <div className="execution-spectrum">
              <span>EXACT</span>
              <span>PHYSICS</span>
              <span>LEARNED</span>
              <span>CUSTOM</span>
            </div>
            <p className="doc-fine">
              No third-party integrations are claimed here. Execution paths are
              research directions and partnership topics.
            </p>
          </section>
          <section id="limits">
            <p className="doc-kicker">Status and limits</p>
            <h2>What you can explore today.</h2>
            <ul>
              <li>
                <strong>Robotics workspace</strong>
                <span>
                  A bounded browser demonstration of robot tasks, configurable
                  conditions, recorded trials, and measurements. Controller
                  limits are described in the workspace.
                </span>
              </li>
              <li>
                <strong>In development</strong>
                <span>
                  A broader agent interface, validated cross-backend
                  experiments, and systematic evaluation. No public
                  general-purpose SDK is documented here.
                </span>
              </li>
              <li>
                <strong>Research objectives</strong>
                <span>
                  Autonomous diagnosis, informative experiment selection,
                  hardware calibration, and scientific model discovery. No
                  published performance gains are claimed.
                </span>
              </li>
              <li>
                <strong>Simulation boundary</strong>
                <span>
                  A successful simulated trial does not establish hardware
                  performance or certify a robot safe.
                </span>
              </li>
            </ul>
            <div className="docs-next">
              <h3>Building at this boundary?</h3>
              <Link
                prefetch={false}
                href="/schedule"
                className="button button-dark"
              >
                Talk about your experiment <ArrowUpRight />
              </Link>
              <Link prefetch={false} href="/research" className="text-link">
                Read the research agenda ↗
              </Link>
            </div>
          </section>
        </div>
      </SidebarProvider>
      <SiteFooter />
    </main>
  );
}
