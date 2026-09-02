import Link from 'next/link';

export function Mark({ inverse = false }: { inverse?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" className="size-8 shrink-0">
      <path d="M2 4h7l9 22v7h-5z" fill={inverse ? '#F2EFE6' : '#08090A'} />
      <path d="M27 4h7L23 33h-5v-7z" fill={inverse ? '#F2EFE6' : '#08090A'} />
      <rect x="15" y="23" width="7" height="7" fill="#2455FF" />
    </svg>
  );
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Vivacity home">
      <Mark inverse={inverse} />
      <span className="text-[0.75rem] font-[720] tracking-[0.24em]">VIVACITY</span>
    </Link>
  );
}
