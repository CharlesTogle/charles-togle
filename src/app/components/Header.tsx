'use client';

const tabs = [
  { label: 'ROOT', active: false },
  { label: 'SRC', active: false },
  { label: 'PORTFOLIO', active: true },
  { label: 'MAIN.JS', active: false },
];

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-stretch"
      style={{
        height: '40px',
        backgroundColor: 'var(--shell-top)',
        borderBottom: '1px solid var(--shell-border-strong)',
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 shrink-0 font-mono font-bold tracking-widest"
        style={{
          fontSize: '13px',
          borderRight: '1px solid var(--shell-border-strong)',
          minWidth: '220px',
        }}
      >
        <span style={{ fontSize: '14px', color: 'var(--primary-container)', opacity: 0.9 }}>◆</span>
        <span style={{ color: 'var(--on-surface)', opacity: 0.75 }}>charles@portfolio: ~</span>
      </div>

      {/* Tabs */}
      <div className="flex items-stretch flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className="relative flex items-center px-5 font-mono tracking-widest transition-colors duration-150"
            style={{
              fontSize: '11px',
              color: tab.active ? 'var(--primary-container)' : 'var(--outline)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRight: '1px solid var(--shell-border)',
            }}
            onMouseEnter={(e) => {
              if (!tab.active) e.currentTarget.style.color = 'var(--on-surface-variant)';
            }}
            onMouseLeave={(e) => {
              if (!tab.active) e.currentTarget.style.color = 'var(--outline)';
            }}
          >
            {tab.label}
            {/* Active underline */}
            {tab.active && (
              <span
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: '2px',
                  backgroundColor: 'var(--primary-container)',
                  boxShadow: '0 0 6px var(--accent-glow)',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Right icons — no bell */}
      <div
        className="flex items-center gap-1 px-3 shrink-0"
        style={{ borderLeft: '1px solid var(--shell-border-strong)' }}
      >
        {/* Terminal icon */}
        <button
          className="flex items-center justify-center transition-colors duration-150"
          style={{
            width: '28px',
            height: '28px',
            color: 'var(--outline)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--outline)')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="14" height="14" rx="0" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3 5l3 3-3 3M8 11h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </button>
        {/* Split panel icon */}
        <button
          className="flex items-center justify-center transition-colors duration-150"
          style={{
            width: '28px',
            height: '28px',
            color: 'var(--outline)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--outline)')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="14" height="14" rx="0" stroke="currentColor" strokeWidth="1.2" />
            <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
    </header>
  );
}
