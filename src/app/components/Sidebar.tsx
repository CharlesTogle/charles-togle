'use client';

import { useState } from 'react';

const iconBtnStyle = (active: boolean) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: active ? '#bf00ff' : '#9d8ba0',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderLeft: active ? '2px solid #bf00ff' : '2px solid transparent',
  transition: 'color 0.15s',
});

const files = [
  { name: 'portfolio.tsx', icon: '◈', active: true },
  { name: 'projects.tsx', icon: '◈', active: false },
  { name: 'experience.tsx', icon: '◈', active: false },
  { name: 'skills.tsx', icon: '◈', active: false },
  { name: 'contact.tsx', icon: '◈', active: false },
  { name: 'README.md', icon: '≡', active: false },
];

export default function Sidebar() {
  const [explorerOpen, setExplorerOpen] = useState(true);

  return (
    <div className="flex" style={{ position: 'fixed', top: '40px', left: 0, bottom: 0, zIndex: 40 }}>
      {/* Icon strip */}
      <div
        className="flex flex-col items-center pt-1"
        style={{
          width: '40px',
          backgroundColor: '#0a0612',
          borderRight: '1px solid rgba(191,0,255,0.15)',
        }}
      >
        {/* Files */}
        <button
          style={iconBtnStyle(explorerOpen)}
          onClick={() => setExplorerOpen((v) => !v)}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#bf00ff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = explorerOpen ? '#bf00ff' : '#9d8ba0')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 3h5l2 2h7v10H2V3z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </button>

        {/* Search */}
        <button
          style={iconBtnStyle(false)}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#bf00ff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9d8ba0')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </button>

        {/* Source control */}
        <button
          style={iconBtnStyle(false)}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#bf00ff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9d8ba0')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="4" cy="12" r="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 6v2a2 2 0 002 2h2M12 6v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </button>

        {/* Extensions */}
        <button
          style={iconBtnStyle(false)}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#bf00ff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9d8ba0')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
            <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
            <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
            <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Settings */}
        <button
          style={{ ...iconBtnStyle(false), marginBottom: '8px' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#bf00ff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9d8ba0')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </button>

        {/* User */}
        <button
          style={{ ...iconBtnStyle(false), marginBottom: '4px' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#bf00ff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9d8ba0')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1 14c0-3 3-5 7-5s7 2 7 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </button>
      </div>

      {/* Explorer panel */}
      {explorerOpen && (
        <div
          style={{
            width: '220px',
            backgroundColor: '#0d0918',
            borderRight: '1px solid rgba(191,0,255,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Explorer header */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.1em',
              color: 'var(--outline)',
              borderBottom: '1px solid rgba(191,0,255,0.1)',
            }}
          >
            <span>EXPLORER</span>
            <span style={{ cursor: 'pointer', color: 'var(--outline)' }}>···</span>
          </div>

          {/* File tree */}
          <div className="py-2">
            {/* Root folder */}
            <div
              className="flex items-center gap-2 px-3 py-1"
              style={{ fontSize: '12px', color: 'var(--on-surface-variant)', cursor: 'pointer' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3l3 4 3-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 2h4l1.5 1.5H13v8H1V2z" stroke="#bf00ff" strokeWidth="1" fill="rgba(191,0,255,0.1)" />
              </svg>
              <span style={{ fontWeight: '600', letterSpacing: '0.05em', color: '#bf00ff' }}>CHARLES_TOGLE</span>
            </div>

            {/* Files */}
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-2 pl-8 pr-3 py-1 cursor-pointer transition-colors duration-100"
                style={{
                  fontSize: '12px',
                  color: file.active ? '#f0ddf1' : 'var(--on-surface-variant)',
                  backgroundColor: file.active ? 'rgba(191,0,255,0.12)' : 'transparent',
                  borderLeft: file.active ? '2px solid #bf00ff' : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!file.active) e.currentTarget.style.backgroundColor = 'rgba(191,0,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  if (!file.active) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ color: file.active ? '#bf00ff' : 'var(--outline)', fontSize: '10px' }}>
                  {file.icon}
                </span>
                <span>{file.name}</span>
              </div>
            ))}

            {/* Assets folder */}
            <div
              className="flex items-center gap-2 px-3 py-1 mt-1 cursor-pointer"
              style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 2h4l1.5 1.5H13v8H1V2z" stroke="var(--outline)" strokeWidth="1" fill="transparent" />
              </svg>
              <span style={{ letterSpacing: '0.05em' }}>ASSETS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
