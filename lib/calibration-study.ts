// Analytic damped response and synthetic observations; never product measurements.
export const trueDamping = 0.32;
export const priorDamping = 0.72;
export const response = (time: number, damping: number) =>
  Math.exp(-damping * time) * Math.cos(3.8 * time);
const noise = [
  0.008, -0.012, 0.004, 0.015, -0.007, 0.006, -0.011, 0.003, 0.009, -0.005,
  0.002, -0.008,
];
export const observations = noise.map((error, i) => {
  const time = 0.18 + i * 0.245;
  return { time, value: response(time, trueDamping) + error };
});
export function fitDamping(count: number) {
  if (count === 0) return priorDamping;
  let best = priorDamping,
    minimum = Infinity;
  for (let i = 0; i <= 600; i++) {
    const damping = 0.05 + (i / 600) * 1.15;
    const error = observations
      .slice(0, count)
      .reduce(
        (sum, point) =>
          sum + (response(point.time, damping) - point.value) ** 2,
        0,
      );
    if (error < minimum) {
      minimum = error;
      best = damping;
    }
  }
  return best;
}
export const estimates = Array.from(
  { length: observations.length + 1 },
  (_, i) => fitDamping(i),
);
