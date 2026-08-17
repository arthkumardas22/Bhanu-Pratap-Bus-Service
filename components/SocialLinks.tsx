export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <a
        href="https://www.instagram.com/arth_kumar_das?igsh=MXh0aW8wdXRmbjBjbg==&igsi=MXh0aW8wdXRmbjBjbg=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram @arth_kumar_das"
        className="glass glass-edge flex h-9 items-center gap-1.5 rounded-full px-3 text-cream/75 transition hover:text-accent-glow hover:bg-white/10"
        title="Follow on Instagram @arth_kumar_das"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
        <span className="hidden sm:inline text-[12px] font-medium tracking-tight">@arth_kumar_das</span>
      </a>
    </div>
  );
}

