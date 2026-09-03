import Link from 'next/link';

export function Mark({ inverse = false }: { inverse?: boolean }) {
  const ink = inverse ? '#08090A' : 'currentColor';

  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" className="size-8 shrink-0">
      <path d="M4 5L18 19L32 5" fill="none" stroke={ink} strokeWidth="2.2" />
      <path d="M18 19V32" fill="none" stroke={ink} strokeWidth="2.2" />
      <path d="M9 5L18 14L27 5" fill="none" stroke={ink} strokeWidth="1" opacity=".38" />
      <rect x="15.3" y="16.3" width="5.4" height="5.4" fill={ink} />
    </svg>
  );
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70" aria-label="Vivacity home">
      <Mark inverse={inverse} />
      <span className="text-[1.02rem] font-[620] tracking-[-0.045em]">VIVACITY</span>
    </Link>
  );
}
