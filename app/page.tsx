import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { MediaVideo } from '@/components/media-video';
import { ExperimentExplorer } from '@/components/experiment-explorer';
import { LazyPanda } from '@/components/lazy-panda';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <main id="content" className="cinematic-home">
      <SiteHeader />
      <section className="cinema-hero" data-nav-theme="dark">
        <MediaVideo
          src="/media/field-loop.mp4"
          poster="/media/field-poster.jpg"
          label="Abstract flowing field"
          className="hero-film"
          priority
        />
        <div className="hero-shade" />
        <div className="cinema-hero-content">
          <h1>
            Virtual labs.
            <br />
            Physical questions.
          </h1>
          <p>
            We’re building virtual labs where AI agents can run controlled
            experiments in physical systems.
          </p>
        </div>
        <a
          className="cinema-scroll"
          href="#experiment"
          aria-label="Explore Vivacity"
        >
          <ArrowDown size={18} />
        </a>
      </section>
      <section className="cinema-thesis" data-nav-theme="dark">
        <h2>
          A prediction tells you
          <br />
          what might happen.
          <br />
          <span>An experiment asks why.</span>
        </h2>
        <p>
          When a robot misses a grasp, repeating the task is only one option.
          Change the friction. Test another approach. Ask which result would
          distinguish one explanation from another.
        </p>
      </section>
      <section
        id="experiment"
        className="science-section"
        data-nav-theme="light"
      >
        <div className="open-intro">
          <h2>
            Choose the experiment.
            <br />
            Constrain the model.
          </h2>
          <p>
            An agent needs to decide what to test and how to interpret the
            result. We study both: searching for informative interventions and
            using observations to constrain a physical model.
          </p>
        </div>
        <ExperimentExplorer />
      </section>
      <section className="cinema-mission" data-nav-theme="light">
        <MediaVideo
          src="/media/inferno.webm"
          poster="/media/inferno-poster.jpg"
          label="Illustrative evolving field"
          className="inferno-film"
        />
        <div>
          <h2>
            A place to ask
            <br />
            “what if?”
          </h2>
          <p>
            Physical reasoning needs somewhere to meet consequences. Vivacity is
            developing an experimental workflow around simulation: establish a
            starting state, change a condition, run the trial, and examine the
            result.
          </p>
          <p>
            The goal is a useful loop between hypotheses and evidence—with the
            conditions of each experiment kept explicit.
          </p>
          <Link prefetch={false} href="/docs" className="cinema-link">
            Explore the approach <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="cosmic-section" data-nav-theme="dark">
        <MediaVideo
          src="/media/solar-flows.mp4"
          poster="/media/solar-flows-poster.jpg"
          label="NASA solar magnetoconvection visualization"
        />
        <div className="cosmic-copy">
          <h2>
            Test the model.
            <br />
            Measure the gap.
          </h2>
          <p>
            A convincing simulation can still rest on the wrong assumptions. Our
            research asks how agents can recognize that boundary, design a
            discriminating test, and revise the model.
          </p>
          <Link prefetch={false} href="/research" className="cinema-link">
            Our research agenda <ArrowUpRight size={18} />
          </Link>
        </div>
        <p className="media-credit">
          Solar magnetoconvection visualization ·{' '}
          <a href="https://svs.gsfc.nasa.gov/31400/">
            NASA / Timothy Sandstrom
          </a>
          <br />
          External scientific visualization, not a Vivacity result.
        </p>
      </section>
      <section className="robot-section" data-nav-theme="light">
        <div className="robot-copy">
          <h2>
            Start with
            <br />
            something
            <br />
            physical.
          </h2>
          <p>
            Robotics gives us a concrete place to begin: geometry, contact,
            control, and failures we can observe.
          </p>
          <p>
            Our early workspace is a bounded robotics demonstration. The arm
            beside you is a live, kinematic pick-and-place visualization. Select
            it to explore the workspace.
          </p>
          <Link prefetch={false} href="/docs#limits" className="cinema-link">
            What’s available today <ArrowUpRight size={18} />
          </Link>
        </div>
        <LazyPanda />
      </section>
      <section className="cinema-research" data-nav-theme="light">
        <div className="open-intro">
          <h2>
            Better questions.
            <br />
            Stronger evidence.
          </h2>
          <p>
            We are working toward agents that do more than predict an outcome.
            They should choose useful tests, learn from disagreement, and
            preserve enough context for another engineer to check the result.
          </p>
        </div>
        <div className="agenda-lines">
          {[
            [
              'experiments',
              'Which experiment comes next?',
              'Choose interventions that separate competing explanations.',
            ],
            [
              'models',
              'What should change when a model is wrong?',
              'Distinguish uncertain parameters from missing mechanisms.',
            ],
            [
              'evidence',
              'Can someone else reproduce the result?',
              'Preserve the state, assumptions, and measurements that matter.',
            ],
          ].map(([id, title, copy]) => (
            <Link prefetch={false} href={`/research#${id}`} key={id}>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>
      <section className="cinema-closing" data-nav-theme="dark">
        <h2>
          Make the next
          <br />
          experiment count.
        </h2>
        <div>
          <p>
            Have a robotics task with a failure you need to understand? Help
            shape the tools around a real engineering question.
          </p>
          <Link prefetch={false} href="/schedule" className="cinema-pill">
            Talk to us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
