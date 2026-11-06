'use client';
import { useMotionAllowed } from '@/hooks/use-motion-allowed';
import { setMotionAllowed } from '@/lib/motion-preference';
export function MotionSetting() {
  const allowed = useMotionAllowed();
  return (
    <button
      className="motion-setting"
      type="button"
      aria-pressed={allowed}
      aria-label={
        allowed
          ? 'Reduce motion throughout the website'
          : 'Enable motion throughout the website'
      }
      onClick={() => setMotionAllowed(!allowed)}
    >
      Motion {allowed ? 'on' : 'off'}
    </button>
  );
}
