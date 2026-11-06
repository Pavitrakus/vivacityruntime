import assert from 'node:assert/strict';
import {
  estimates,
  observations,
  response,
  priorDamping,
  trueDamping,
} from '../lib/calibration-study.ts';
import {
  loss,
  derivative,
  iterations,
  searchPaths,
  globalMinimum,
} from '../lib/experiment-math.ts';

const paths = searchPaths();
for (const path of Object.values(paths)) {
  assert.equal(path.length, iterations + 1);
  assert.equal(path[0], 0.14);
  path.forEach((x, i) => {
    assert.ok(Number.isFinite(x) && x >= 0 && x <= 1);
    if (i)
      assert.ok(
        loss(x) <= loss(path[i - 1]) + 1e-10,
        'accepted updates must not increase mismatch',
      );
  });
}
for (let i = 1; i < 100; i++) {
  const x = i / 100;
  const finiteDifference = (loss(x + 1e-6) - loss(x - 1e-6)) / 2e-6;
  assert.ok(Math.abs(derivative(x) - finiteDifference) < 1e-6);
}
assert.ok(
  Math.abs(derivative(paths.local.at(-1))) < 1e-6,
  'local search should reach a stationary point',
);
assert.ok(
  loss(paths.broad.at(-1)) - loss(globalMinimum) < 0.002,
  'broader search should find the deeper basin in this example',
);
assert.ok(loss(paths.local.at(-1)) > loss(paths.broad.at(-1)) + 0.2);
console.log(
  'Analytic illustration verified: gradients, bounded paths, monotonic updates, and distinct minima.',
);
assert.equal(estimates.length, observations.length + 1);
assert.ok(
  Math.abs(estimates.at(-1) - trueDamping) < 0.01,
  'synthetic calibration must recover the generating damping',
);
const squaredError = (damping) =>
  observations.reduce(
    (sum, point) => sum + (response(point.time, damping) - point.value) ** 2,
    0,
  );
assert.ok(squaredError(estimates.at(-1)) < squaredError(priorDamping) * 0.02);
console.log('Calibration verified: fitted damping and observation residuals.');
