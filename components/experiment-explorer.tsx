'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionAllowed } from '@/hooks/use-motion-allowed';
import {
  globalMinimum,
  iterations,
  loss,
  searchPaths,
} from '@/lib/experiment-math';
import {
  estimates,
  observations,
  priorDamping,
  response,
} from '@/lib/calibration-study';

const paths = searchPaths();
const tau = Math.PI * 2;
function project(u: number, v: number) {
  const radius = 142 + 55 * Math.cos(v);
  return [
    230 + radius * Math.cos(u),
    133 + radius * Math.sin(u) * 0.34 - 55 * Math.sin(v) * 0.88,
  ];
}
function curve(points: number[][]) {
  return points
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');
}
const rings = Array.from({ length: 15 }, (_, v) =>
  curve(
    Array.from({ length: 97 }, (_, u) =>
      project((u / 96) * tau, (v / 15) * tau),
    ),
  ),
);
const sections = Array.from({ length: 32 }, (_, u) =>
  curve(
    Array.from({ length: 65 }, (_, v) =>
      project((u / 32) * tau, (v / 64) * tau),
    ),
  ),
);
const plot = (x: number) => [28 + x * 404, 370 - loss(x) * 148];
const landscape = curve(Array.from({ length: 241 }, (_, i) => plot(i / 240)));
const modelPoint = (time: number, value: number) => [
  35 + (time / 3) * 390,
  150 - value * 100,
];
const modelCurve = (damping: number) =>
  curve(
    Array.from({ length: 181 }, (_, i) =>
      modelPoint(i / 60, response(i / 60, damping)),
    ),
  );
const initialCurve = modelCurve(priorDamping);

export function ExperimentExplorer() {
  const host = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const target = host.current;
    if (!target || !allowed) return;
    let visible = false,
      raf = 0,
      previous = 0,
      time = 0,
      lastDraw = 0;
    function request() {
      if (visible && !document.hidden && !raf)
        raf = requestAnimationFrame(draw);
    }
    function draw(now: number) {
      raf = 0;
      if (!visible || document.hidden) {
        previous = 0;
        return;
      }
      if (previous) time += Math.min(now - previous, 100);
      previous = now;
      if (now - lastDraw >= 1000 / 24) {
        setElapsed(time / 1000);
        lastDraw = now;
      }
      request();
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        previous = 0;
        if (visible) request();
        else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 },
    );
    const visibility = () => {
      previous = 0;
      if (!document.hidden) request();
    };
    observer.observe(target);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [allowed]);
  const cycle = elapsed % 14;
  const progress = allowed ? Math.min(cycle / 11, 1) : 1;
  const fade = allowed ? Math.min(1, cycle / 0.45, (14 - cycle) / 0.45) : 1;
  const exactStep = progress * iterations;
  const step = Math.floor(exactStep);
  const fraction = exactStep - step;
  const ease = fraction * fraction * (3 - 2 * fraction);
  const x =
    paths.broad[step] +
    (paths.broad[Math.min(iterations, step + 1)] - paths.broad[step]) * ease;
  const [px, py] = plot(x);
  const count = Math.min(
    observations.length,
    Math.floor(progress * (observations.length + 1)),
  );
  const arrival = Math.min(
    1,
    (progress * (observations.length + 1) - count) * 3,
  );
  const previousEstimate = estimates[Math.max(0, count - 1)];
  const damping =
    previousEstimate +
    (estimates[count] - previousEstimate) *
      arrival *
      arrival *
      (3 - 2 * arrival);
  const residual = observations
    .slice(0, count)
    .map((point) => [
      35 + (point.time / 3) * 390,
      352 - (point.value - response(point.time, damping)) * 210,
    ]);
  return (
    <section
      ref={host}
      className="search-explorer"
      aria-label="Animated studies of hypothesis search and model calibration"
    >
      <div className="search-columns">
        <article>
          <h3>Explore the hypothesis space.</h3>
          <p>
            A wider search can move beyond the nearest minimum. The candidate
            determines which region of the model is tested next.
          </p>
          <div className="study-progress">
            <span>Candidate search</span>
            <span>
              {Math.round(exactStep)} / {iterations}
            </span>
          </div>
          <svg
            viewBox="0 0 460 425"
            aria-label="A parameter-space study and its objective landscape"
            style={{ opacity: fade }}
          >
            <title>Searching a multimodal objective function.</title>
            <g className="torus-wire">
              {rings.map((d, i) => (
                <path key={`r${i}`} d={d} />
              ))}
              {sections.map((d, i) => (
                <path key={`s${i}`} d={d} />
              ))}
            </g>
            <path
              className="torus-section"
              d={curve(
                Array.from({ length: 65 }, (_, i) =>
                  project((x - 0.08) * tau, (i / 64) * tau),
                ),
              )}
            />
            <path className="loss-curve" d={landscape} />
            <circle
              className="loss-dot"
              cx={px.toFixed(3)}
              cy={py.toFixed(3)}
              r="4.5"
            />
            <path
              className="plot-axis"
              d="M28 400H432 M28 395L23 400L28 405 M432 395L437 400L432 405"
            />
            <text x="230" y="420" textAnchor="middle">
              CANDIDATE PARAMETER
            </text>
            <text
              x={plot(globalMinimum)[0].toFixed(3)}
              y="385"
              textAnchor="middle"
            >
              GLOBAL MINIMUM
            </text>
          </svg>
          <div className="search-value">
            <span>Objective value</span>
            <output aria-live="off">{loss(x).toFixed(3)}</output>
          </div>
        </article>
        <article>
          <h3>Let observations constrain the model.</h3>
          <p>
            Successive observations refine a damping estimate. The residual
            reveals the disagreement that remains after each update.
          </p>
          <div className="study-progress">
            <span>Synthetic observations</span>
            <span>
              {count} / {observations.length}
            </span>
          </div>
          <svg
            viewBox="0 0 460 425"
            className="calibration-plot"
            aria-label="A damped response fitted to synthetic observations, with residuals"
            style={{ opacity: fade }}
          >
            <title>
              Calibrating a damped response from synthetic observations.
            </title>
            <g className="calibration-grid">
              {[50, 150, 250].map((y) => (
                <path key={y} d={`M35 ${y}H425`} />
              ))}
              {[35, 165, 295, 425].map((x) => (
                <path key={x} d={`M${x} 50V250`} />
              ))}
            </g>
            <path className="initial-model" d={initialCurve} />
            <path className="fitted-model" d={modelCurve(damping)} />
            {observations.slice(0, count).map((point, i) => {
              const [cx, cy] = modelPoint(point.time, point.value);
              return (
                <circle
                  key={i}
                  className="observation-dot"
                  cx={cx.toFixed(3)}
                  cy={cy.toFixed(3)}
                  r="3.6"
                />
              );
            })}
            <text x="23" y="54" textAnchor="end">
              1
            </text>
            <text x="23" y="154" textAnchor="end">
              0
            </text>
            <text x="23" y="254" textAnchor="end">
              −1
            </text>
            <text x="35" y="30">
              DISPLACEMENT (NORMALIZED)
            </text>
            <text x="35" y="279">
              0
            </text>
            <text x="425" y="279" textAnchor="end">
              3 s
            </text>
            <text x="35" y="319">
              OBSERVED − PREDICTED
            </text>
            <path className="residual-zero" d="M35 352H425" />
            {residual.length > 1 && (
              <path className="residual-line" d={curve(residual)} />
            )}
            {residual.map(([cx, cy], i) => (
              <circle
                key={i}
                className="observation-dot"
                cx={cx.toFixed(3)}
                cy={cy.toFixed(3)}
                r="2.5"
              />
            ))}
            <text x="230" y="420" textAnchor="middle">
              TIME AFTER INTERVENTION
            </text>
          </svg>
          <div className="search-value">
            <span>Damping estimate</span>
            <output aria-live="off">{damping.toFixed(3)} s⁻¹</output>
          </div>
          <div className="plot-legend">
            <span>Initial model</span>
            <span>Updated model</span>
            <span>Synthetic observation</span>
          </div>
        </article>
      </div>
      <p className="diagram-note">
        Analytic illustrations of candidate search and system identification.
        Observations are synthetic; these are not Vivacity benchmark results.
      </p>
    </section>
  );
}
