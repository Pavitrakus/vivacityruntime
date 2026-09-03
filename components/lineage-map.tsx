export function LineageMap() {
  return (
    <div className="lineage-canvas relative min-h-[340px] overflow-hidden bg-[#07080a] text-[#efece3] sm:min-h-[400px] lg:min-h-[460px]">
      <div className="instrument-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 960 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M90 210 C250 210 310 86 620 72" fill="none" stroke="#4D7CFF" strokeWidth="1.6" strokeOpacity="0.55" />
        <path d="M90 210 C280 210 360 210 870 210" fill="none" stroke="#FF5C38" strokeWidth="2.4" />
        <path d="M90 210 C250 210 310 334 620 348" fill="none" stroke="#4D7CFF" strokeWidth="1.6" strokeOpacity="0.55" />
        <circle cx="90" cy="210" r="9" fill="#EFECE3" />
        <circle cx="620" cy="72" r="6" fill="#4D7CFF" />
        <circle cx="870" cy="210" r="8" fill="#FF5C38" />
        <circle cx="620" cy="348" r="6" fill="#4D7CFF" />
        <rect x="48" y="168" width="84" height="84" fill="none" stroke="rgba(239,236,227,0.22)" />
      </svg>
      <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-between p-5 sm:min-h-[400px] sm:p-8 lg:min-h-[460px]">
        <p className="eyebrow text-white/45">Parent world</p>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="eyebrow text-[#4D7CFF]">Fork A</p>
            <p className="mt-2 text-2xl tracking-[-0.04em] sm:text-3xl">Decay</p>
          </div>
          <div>
            <p className="eyebrow text-[#FF5C38]">Fork B · commit</p>
            <p className="mt-2 text-2xl tracking-[-0.04em] sm:text-3xl">Stable</p>
          </div>
          <div>
            <p className="eyebrow text-[#4D7CFF]">Fork C</p>
            <p className="mt-2 text-2xl tracking-[-0.04em] sm:text-3xl">Escape</p>
          </div>
        </div>
      </div>
    </div>
  );
}
