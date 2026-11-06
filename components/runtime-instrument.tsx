'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';

const trials = [
  {
    name: 'Baseline',
    mass: '0.10 kg',
    friction: '0.60',
    pose: 'Original',
    question: 'Establish the starting conditions before changing anything.',
    changed: 'No variables changed',
  },
  {
    name: 'Change payload',
    mass: '0.20 kg',
    friction: '0.60',
    pose: 'Original',
    question:
      'Does the same movement behave differently with a heavier object?',
    changed: 'Only object mass changes',
  },
  {
    name: 'Change friction',
    mass: '0.10 kg',
    friction: '0.30',
    pose: 'Original',
    question: 'Does lower contact friction explain the failed grasp?',
    changed: 'Only friction changes',
  },
];

export function RuntimeInstrument() {
  const [selected, setSelected] = useState(0);
  const current = trials[selected];
  return (
    <section
      className="experiment-study"
      aria-label="Illustration of a controlled robot experiment"
    >
      <header>
        <h3>One starting point. Controlled alternatives.</h3>
        <p>
          Workflow illustration · values are examples, not measured results.
        </p>
      </header>
      <div className="trial-choices" aria-label="Choose an illustrative trial">
        {trials.map((trial, index) => (
          <button
            key={trial.name}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            {trial.name}
          </button>
        ))}
      </div>
      <div
        className="experiment-canvas"
        data-trial={selected}
        aria-hidden="true"
      >
        <svg viewBox="0 0 660 310" className="experiment-paths">
          <defs>
            <pattern
              id="experiment-dots"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r=".65" fill="currentColor" opacity=".16" />
            </pattern>
          </defs>
          <rect width="660" height="310" fill="url(#experiment-dots)" />
          <path className="experiment-root" d="M108 155H225" />
          {[70, 155, 240].map((y, i) => (
            <g
              key={i}
              className="experiment-route"
              data-selected={selected === i}
            >
              <path d={`M225 155C300 155 290 ${y} 368 ${y}H460`} />
              <circle className="experiment-pulse" r="3.5">
                <animateMotion
                  dur={`${2.8 + i * 0.35}s`}
                  repeatCount="indefinite"
                  path={`M225 155C300 155 290 ${y} 368 ${y}H460`}
                />
              </circle>
              <rect x="470" y={y - 22} width="42" height="42" />
              <path d={`M482 ${y + 5}V${y - 6}H498V${y + 5}Z`} />
            </g>
          ))}
          <g className="experiment-snapshot">
            <rect x="65" y="125" width="60" height="60" />
            <path d="M82 145L95 138L108 145V164L95 171L82 164ZM82 145L95 152L108 145M95 152V171" />
          </g>
          <text x="95" y="213" textAnchor="middle">
            Saved baseline
          </text>
          <text x="535" y="75">
            Reference
          </text>
          <text x="535" y="160">
            Payload
          </text>
          <text x="535" y="245">
            Friction
          </text>
        </svg>
        <div className="experiment-change" key={selected}>
          <span>{current.name}</span>
          <strong>
            {selected === 0
              ? 'Same starting conditions'
              : selected === 1
                ? 'Change mass. Keep the rest.'
                : 'Change friction. Keep the rest.'}
          </strong>
        </div>
      </div>
      <dl className="trial-parameters">
        <div>
          <dt>Object mass</dt>
          <dd>{current.mass}</dd>
        </div>
        <div>
          <dt>Friction coefficient</dt>
          <dd>{current.friction}</dd>
        </div>
        <div>
          <dt>Approach pose</dt>
          <dd>{current.pose}</dd>
        </div>
      </dl>
      <div className="trial-question" aria-live="polite">
        <p>{current.question}</p>
        <span>
          Run the trial in a simulator, then compare task success, contact
          events, and placement error.
        </span>
      </div>
      <footer>
        <button onClick={() => setSelected(0)}>
          <RotateCcw size={15} /> Restore baseline
        </button>
        <Link prefetch={false} href="/docs#actions">
          How an experiment is defined ↗
        </Link>
      </footer>
    </section>
  );
}
