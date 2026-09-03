import Link from 'next/link';

export function Mark({ inverse = false }: { inverse?: boolean }) {
  const ink = inverse ? '#08090A' : 'currentColor';

  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" className="size-8 shrink-0">
      <circle cx="18" cy="18" r="14.6" fill="none" stroke={ink} strokeWidth="1.35" />
      <ellipse cx="18" cy="18" rx="5.6" ry="14.6" fill="none" stroke={ink} strokeWidth="1.2" />
      <ellipse cx="18" cy="18" rx="14.6" ry="5.4" fill="none" stroke={ink} strokeWidth="1.2" />
      <circle cx="18" cy="18" r="1.7" fill={ink} />
      <circle cx="27.2" cy="10.4" r="2.35" fill="#4D7CFF" />
    </svg>
  );
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70" aria-label="Vivacity home">
      <Mark inverse={inverse} />
      <span className="text-[1.02rem] font-[520] tracking-[-0.035em]">Vivacity</span>
    </Link>
  );
}
