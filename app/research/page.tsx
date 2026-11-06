import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Experimental design, reproducible robotics, and learning from the gap between physical models and measurements. The Vivacity research agenda.',
};

const directions = [
  {
    id: 'experiments',
    title: 'Which experiment should come next?',
    question:
      'An action that completes a task and an action that teaches us about the task can be different choices.',
    body: 'A slipped grasp might be explained by low friction, an incorrect mass estimate, or a poor approach pose. Repeating the same movement may leave those explanations indistinguishable. We want agents to identify interventions under which competing models predict different outcomes, then weigh the value of that information against the cost of obtaining it.',
    method:
      'Study parameter sweeps, Bayesian experimental design, and uncertainty-aware search under fixed trial budgets. Compare with random search and expert-designed tests before adding more complex agents.',
    test: 'Can the method reduce uncertainty or uncover independently reproducible failures with fewer trials on held-out scenarios?',
  },
  {
    id: 'models',
    title: 'What should change when a model is wrong?',
    question: 'A discrepancy is evidence. It does not identify its own cause.',
    body: 'A predicted trajectory can disagree with measurement because of a wrong parameter, missing dynamics, sensor timing, or an inadequate observation model. Fitting a residual can reduce error while concealing the mechanism. The challenge is to distinguish what can be calibrated from what requires a different explanation, and to recognize when available observations cannot tell the difference.',
    method:
      'Investigate system identification and constrained residual dynamics. Preserve known mechanics, estimate uncertain parameters, and evaluate corrections on motions and conditions excluded from fitting.',
    test: 'Does a correction improve predictions on unseen conditions, with uncertainty that reflects where it stops being reliable?',
  },
  {
    id: 'evidence',
    title: 'When are two trials really comparable?',
    question: 'Reproducibility begins below the visible scene.',
    body: 'Identical joint positions do not necessarily imply identical experiments. Controller memory, contact state, random seeds, solver settings, and sensor timing can all change the result. A useful branch must preserve the conditions relevant to the question. Across simulators, the meaning of a contact or a reset may differ; a shared interface must expose those differences.',
    method:
      'Define snapshot contracts for each backend, pin model and evaluator versions, and test replay and branch isolation. Keep numerical outputs, learned predictions, and physical observations distinguishable in the evidence record.',
    test: 'Can another engineer recover the initial conditions, reproduce the result within stated tolerances, and trace a disagreement to its source?',
  },
  {
    id: 'discovery',
    title: 'Can an agent revise the explanation itself?',
    question: 'Sometimes every hypothesis in the original set is inadequate.',
    body: 'Choosing among fixed parameters is only part of scientific investigation. An agent may need to propose a missing mechanism, derive an observable consequence, and design a test that could reject it. Our longer-term ambition is to connect this process to executable physical models, while keeping explanation quality separate from fluent language.',
    method:
      'Begin with bounded scientific environments where hypotheses make quantitative predictions. Compare model revision with fixed-model fitting, and retain negative results and failed explanations.',
    test: 'Does the proposed mechanism improve held-out prediction and survive a discriminating experiment, rather than merely explain the data already seen?',
  },
];

export default function ResearchPage() {
  return (
    <main id="content">
      <SiteHeader />
      <section className="page-hero research-hero">
        <p className="section-index">Research</p>
        <h1>
          What would change an AI’s <em>mind?</em>
        </h1>
        <p>
          An intelligent system should be able to state what it expects,
          identify the assumptions behind that expectation, and choose an
          experiment that could prove it wrong. We are building toward that
          capability in physical systems.
        </p>
      </section>
      <section className="research-page-grid">
        <div className="research-note">
          <h2>From a plausible future to a testable explanation.</h2>
          <p>
            A model predicts what follows from its assumptions. An experiment
            can challenge those assumptions. Vivacity’s research centers on the
            connection: structured state, controlled interventions, measurable
            outcomes, and a record of how the evidence changes the next
            decision.
          </p>
          <p>
            Industrial robotics is our first proving ground. A failed placement
            has concrete geometry, contact conditions, and a controller to
            examine. It also exposes a difficult boundary: a result inside a
            simulator remains a result about that simulator until it is checked
            against physical measurements.
          </p>
        </div>
        <figure className="research-plate">
          <Image
            src="/plate-flow.png"
            alt="Vivacity visual study of a flow field around a boundary"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
          />
          <figcaption>
            A visual study of physical dynamics. Image fidelity alone does not
            establish model validity.
          </figcaption>
        </figure>
      </section>
      <div className="research-agenda-intro">
        <h2>Questions guiding the work</h2>
        <p>
          The following is a research agenda. Methods and evaluation criteria
          describe what we intend to investigate; they are not claims of
          published results.
        </p>
        <nav aria-label="Research questions">
          {directions.map((d) => (
            <a key={d.id} href={'#' + d.id}>
              {d.title} <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
      </div>
      <section className="research-directions" aria-label="Research directions">
        {directions.map((d) => (
          <article id={d.id} key={d.id}>
            <div>
              <h2>{d.title}</h2>
              <p className="research-question">{d.question}</p>
            </div>
            <div>
              <p>{d.body}</p>
              <h3>Approach</h3>
              <p>{d.method}</p>
              <h3>What would count as progress</h3>
              <p>{d.test}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="research-standard">
        <h2>The result must survive the test.</h2>
        <div>
          <p>
            We want to measure whether an experimentation layer improves
            engineering decisions over a well-built simulation script. That
            requires fixed budgets, meaningful baselines, unseen conditions, and
            an honest accounting of failed trials.
          </p>
          <p>
            The live workspace is an early, bounded robotics demonstration.
            Autonomous failure diagnosis, hardware calibration, and scientific
            model discovery remain development and research objectives. We do
            not claim published benchmarks or general autonomous discovery.
          </p>
          <Link prefetch={false} href="/docs#limits" className="text-link">
            Current scope and limits <ArrowUpRight />
          </Link>
        </div>
      </section>
      <section className="research-reading">
        <h2>Foundations we learn from</h2>
        <p>
          External work that informs these questions. These are not Vivacity
          publications, integrations, or endorsements.
        </p>
        <a href="https://arxiv.org/abs/2310.16828">
          <div>
            <h3>TD-MPC2</h3>
            <p>Planning and control through learned latent dynamics.</p>
          </div>
          <ArrowUpRight />
        </a>
        <a href="https://arxiv.org/abs/2501.01540">
          <div>
            <h3>BoxingGym</h3>
            <p>
              Evaluating experimental design and model discovery in bounded
              environments.
            </p>
          </div>
          <ArrowUpRight />
        </a>
        <a href="https://mujoco.readthedocs.io/en/stable/computation/index.html">
          <div>
            <h3>MuJoCo computation</h3>
            <p>
              The numerical and contact semantics an experiment interface must
              respect.
            </p>
          </div>
          <ArrowUpRight />
        </a>
      </section>
      <section className="publication-empty">
        <h2>Working on the boundary between models and measurements?</h2>
        <Link prefetch={false} href="/schedule" className="text-link">
          Talk research with us <ArrowUpRight />
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
