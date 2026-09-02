import Link from 'next/link';

export function Mark({ inverse = false }: { inverse?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className="size-9 shrink-0">
      <rect width="40" height="40" fill={inverse ? '#F2EFE6' : '#08090A'} />
      <path d="M6 6 17 17M34 6 23 17M20 23v12" fill="none" stroke={inverse ? '#08090A' : '#F2EFE6'} strokeWidth="2.4" strokeLinecap="square" />
      <rect x="17" y="17" width="6" height="6" fill="#2455FF" />
      <rect x="32" y="4" width="3" height="3" fill="#FF4B1F" />
    </svg>
  );
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-70" aria-label="Vivacity home">
      <Mark inverse={inverse} />
      <span className="text-[0.75rem] font-[720] tracking-[0.24em]">VIVACITY</span>
    </Link>
  );
}
