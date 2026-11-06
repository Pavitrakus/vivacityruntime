// A bounded analytic example, not product benchmark data.
export const loss = (x: number) =>
  0.48 +
  0.2 * Math.cos(2 * Math.PI * x - 0.3) +
  0.12 * Math.sin(6 * Math.PI * x) +
  0.06 * Math.cos(14 * Math.PI * x);
export const derivative = (x: number) =>
  -0.4 * Math.PI * Math.sin(2 * Math.PI * x - 0.3) +
  0.72 * Math.PI * Math.cos(6 * Math.PI * x) -
  0.84 * Math.PI * Math.sin(14 * Math.PI * x);
export const iterations = 60;
export function searchPaths() {
  const local = [0.14];
  const broad = [0.14];
  let best = 0.14;
  for (let i = 1; i <= iterations; i++) {
    local.push(
      Math.max(0, Math.min(1, local[i - 1] - 0.006 * derivative(local[i - 1]))),
    );
    const candidate = (0.14 + i * 0.618033988749895) % 1;
    if (loss(candidate) < loss(best)) best = candidate;
    broad.push(best);
  }
  return { local, broad };
}
export const globalMinimum = Array.from(
  { length: 10001 },
  (_, i) => i / 10000,
).reduce((best, x) => (loss(x) < loss(best) ? x : best), 0);
