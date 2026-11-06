'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDark(document.documentElement.classList.contains('dark'));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try {
      window.localStorage.setItem('vivacity-theme', next ? 'dark' : 'light');
    } catch {
      /* The theme also works when storage is disabled. */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle flex size-9 items-center justify-center border border-current transition-colors hover:bg-[var(--cobalt)] hover:text-white hover:border-[var(--cobalt)]"
      aria-label={dark ? 'Use light theme' : 'Use dark theme'}
      title={dark ? 'Use light theme' : 'Use dark theme'}
    >
      {dark ? (
        <Sun className="size-3.5" aria-hidden="true" />
      ) : (
        <Moon className="size-3.5" aria-hidden="true" />
      )}
    </button>
  );
}
