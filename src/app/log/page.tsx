'use client'

import {
  BRANCHES,
  buildLogRows,
  curvedPath,
  getBranchLabel,
  getGraphX,
  getLineSpan,
  getVisibleBranches,
  legendBranches,
  LOG_GRAPH_WIDTH,
  LOG_ROW_HEIGHT,
  type LogRow
} from '../helpers/log'

const rows = buildLogRows()

function renderActiveLines(row: LogRow) {
  return getVisibleBranches(row).map(branch => (
    <line
      key={branch}
      x1={getGraphX(branch)}
      y1={getLineSpan(row, branch).y1}
      x2={getGraphX(branch)}
      y2={getLineSpan(row, branch).y2}
      stroke={BRANCHES[branch].color}
      strokeWidth={1.5}
      strokeLinecap='round'
    />
  ))
}

function GraphCell({ row }: { row: LogRow }) {
  if (row.kind === 'commit') {
    const color = BRANCHES[row.branch].color
    return (
      <svg width={LOG_GRAPH_WIDTH} height={LOG_ROW_HEIGHT} style={{ flexShrink: 0, display: 'block' }} overflow='visible'>
        {renderActiveLines(row)}
        <circle
          cx={getGraphX(row.branch)}
          cy={LOG_ROW_HEIGHT / 2}
          r={4}
          fill={color}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
    )
  }

  return (
    <svg width={LOG_GRAPH_WIDTH} height={LOG_ROW_HEIGHT} style={{ flexShrink: 0, display: 'block' }} overflow='visible'>
      {renderActiveLines(row)}
      <path
        d={curvedPath(row.from, row.to, row.kind === 'merge-in')}
        fill='none'
        stroke={BRANCHES[row.from].color}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  )
}

export default function LogPage() {
  return (
    <section
      style={{
        background: 'var(--section-bg)',
        minHeight: 'calc(100vh - 40px)',
        padding: '48px 0',
        fontFamily: 'Space Grotesk, sans-serif'
      }}
    >
      <div className='mx-auto max-w-[1200px] px-4 sm:px-8'>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--outline)', fontFamily: 'monospace' }}>
            $ git log --graph --decorate --portfolio_
          </span>
        </div>

        <div style={{ height: '1px', background: 'var(--outline-variant)', marginBottom: '32px' }} />

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {legendBranches.map(branch => (
            <div key={branch} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: BRANCHES[branch].color,
                  boxShadow: `0 0 6px ${BRANCHES[branch].color}`
                }}
              />
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: BRANCHES[branch].color,
                  letterSpacing: '0.06em'
                }}
              >
                {BRANCHES[branch].label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {rows.map((row, index) => {
            const label = getBranchLabel(rows, row, index)

            return (
              <div
                key={`${row.kind}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  minHeight: `${LOG_ROW_HEIGHT}px`
                }}
              >
                <GraphCell row={row} />
                {row.kind === 'commit' && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '4px',
                      paddingLeft: '10px',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      minWidth: 0
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          color: '#bf00ff',
                          letterSpacing: '0.06em',
                          opacity: 0.7,
                          flexShrink: 0
                        }}
                      >
                        {row.hash}
                      </span>
                      {label && (
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '10px',
                            color: BRANCHES[row.branch].color,
                            border: `1px solid ${BRANCHES[row.branch].color}`,
                            padding: '1px 6px',
                            opacity: 0.85,
                            flexShrink: 0,
                            boxShadow: `0 0 6px ${BRANCHES[row.branch].color}40`
                          }}
                        >
                          {label}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: '13px',
                          color: 'var(--on-surface)',
                          lineHeight: 1.35
                        }}
                      >
                        {row.title}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        color: 'var(--outline)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {row.date}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
