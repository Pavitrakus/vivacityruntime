export const motionEvent = 'vivacity-motion-change';
let explicitMotion: boolean | undefined;
export function motionAllowed() {
  try {
    const preference = localStorage.getItem('vivacity-motion');
    if (preference) return preference === 'full';
  } catch {
    /* Preferences are optional. */
  }
  if (explicitMotion !== undefined) return explicitMotion;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return (
    !matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !connection?.saveData
  );
}
export function setMotionAllowed(allowed: boolean) {
  explicitMotion = allowed;
  const preference = allowed ? 'full' : 'reduced';
  try {
    localStorage.setItem('vivacity-motion', preference);
  } catch {
    /* Storage is optional. */
  }
  document.documentElement.dataset.motion = preference;
  window.dispatchEvent(new Event(motionEvent));
}
