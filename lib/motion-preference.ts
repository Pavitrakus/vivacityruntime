export function motionAllowed() {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return (
    !matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !connection?.saveData
  );
}
