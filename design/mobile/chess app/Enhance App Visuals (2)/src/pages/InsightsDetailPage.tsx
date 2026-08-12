import { useState } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { catalogSections } from "../data/mockData"
import { type FilterState } from "../App"

type SectionKey = keyof typeof catalogSections

interface Props { filter: FilterState }

const sectionKeys: SectionKey[] = ["style", "openings", "middlegame", "endgame"]

export default function InsightsDetailPage({ filter: _filter }: Props) {
  const [search, setSearch] = useState("")
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null)

  const filtered = activeSection
    ? {
        [activeSection]: {
          ...catalogSections[activeSection],
          metrics: catalogSections[activeSection].metrics.filter(
            (m) =>
              !search ||
              m.name.toLowerCase().includes(search.toLowerCase()) ||
              m.desc.toLowerCase().includes(search.toLowerCase())
          ),
        },
      }
    : Object.fromEntries(
        sectionKeys.map((k) => [
          k,
          {
            ...catalogSections[k],
            metrics: catalogSections[k].metrics.filter(
              (m) =>
                !search ||
                m.name.toLowerCase().includes(search.toLowerCase()) ||
                m.desc.toLowerCase().includes(search.toLowerCase())
            ),
          },
        ])
      )

  const hasSearchResults = Object.values(filtered).some((s) => s.metrics.length > 0)

  return (
    <div style={{ paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ padding: "24px 16px 16px" }}>
        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#ededf5",
            marginBottom: 14,
          }}
        >
          {activeSection ? catalogSections[activeSection].title : "Metrics Catalog"}
        </div>

        {/* Search bar */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#505068",
              fontSize: 14,
              pointerEvents: "none",
            }}
          >⌕</div>
          <input
            type="text"
            placeholder="Search metrics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 34px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              color: "#ededf5",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(34,197,94,0.35)" }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)" }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#505068",
                cursor: "pointer",
                fontSize: 14,
                padding: 2,
              }}
            >✕</button>
          )}
        </div>
      </div>

      {/* Category nav pills (when not in section view) */}
      {!activeSection && !search && (
        <div style={{ padding: "0 16px 16px" }}>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8080a0",
              marginBottom: 10,
            }}
          >Categories</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {sectionKeys.map((key) => {
              const section = catalogSections[key]
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  style={{
                    background: "#111117",
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderTop: `2px solid ${section.color}`,
                    borderRadius: "0 0 10px 10px",
                    padding: "16px 14px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#17171f" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#111117" }}
                >
                  <div style={{ fontSize: 22, marginBottom: 6, color: section.color }}>{section.icon}</div>
                  <div
                    style={{
                      fontFamily: "Fraunces, serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#ededf5",
                      marginBottom: 2,
                    }}
                  >{section.title}</div>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 9,
                      color: "#505068",
                      letterSpacing: "0.08em",
                    }}
                  >{section.metrics.length} metrics</div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Back button when in section view */}
      {activeSection && !search && (
        <div style={{ padding: "0 16px 12px" }}>
          <button
            onClick={() => setActiveSection(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              color: "#8080a0",
              cursor: "pointer",
              padding: 0,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
            }}
          >
            ← All Categories
          </button>
        </div>
      )}

      {/* Section chips when section is active */}
      {activeSection && (
        <div style={{ padding: "0 16px 12px", display: "flex", gap: 6 }}>
          {sectionKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                padding: "4px 10px",
                background: activeSection === key ? `rgba(${hexToRgbArr(catalogSections[key].color)},0.12)` : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeSection === key ? catalogSections[key].color + "44" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: activeSection === key ? catalogSections[key].color : "#505068",
              }}
            >
              {catalogSections[key].icon}
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {!hasSearchResults && (
        <div style={{ padding: "20px 16px", textAlign: "center", color: "#505068", fontFamily: "Inter, sans-serif", fontSize: 13 }}>
          No metrics found for "{search}"
        </div>
      )}

      {/* Metric cards */}
      {(activeSection ? [activeSection] : sectionKeys).map((key) => {
        const sk = key as SectionKey
        const section = (filtered as typeof catalogSections)[sk]
        if (!section || section.metrics.length === 0) return null
        return (
          <div key={sk} style={{ padding: "0 16px 8px" }}>
            {(!activeSection || search) && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ color: section.color, fontSize: 14 }}>{section.icon}</span>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: section.color,
                    fontWeight: 600,
                  }}
                >{section.title}</div>
              </div>
            )}
            {section.metrics.map((metric) => {
              const isAbove = metric.value >= metric.avg
              const color = isAbove ? "#22c55e" : "#f87171"
              const chartData = [
                { label: "You", value: metric.value },
                { label: "Avg", value: metric.avg },
              ]
              return (
                <div
                  key={metric.name}
                  style={{
                    background: "#111117",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    padding: "14px 14px",
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, paddingRight: 12 }}>
                      <div
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 9,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#8080a0",
                          marginBottom: 4,
                        }}
                      >{metric.name}</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                        <span
                          style={{
                            fontFamily: "Fraunces, serif",
                            fontSize: 22,
                            fontWeight: 600,
                            color: "#ededf5",
                            lineHeight: 1,
                          }}
                        >{metric.value}{metric.unit}</span>
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 10,
                            color,
                            fontWeight: 600,
                          }}
                        >{isAbove ? "↑" : "↓"} avg {metric.avg}{metric.unit}</span>
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 11,
                          color: "#505068",
                          lineHeight: 1.4,
                        }}
                      >{metric.desc}</div>
                    </div>

                    {/* Mini bar chart */}
                    <div style={{ width: 56, height: 44, flexShrink: 0 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barGap={4}>
                          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                            {chartData.map((_entry, index) => (
                              <Cell key={index} fill={index === 0 ? color : "rgba(255,255,255,0.15)"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 2 }}>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 7, color: "#505068" }}>You</span>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 7, color: "#505068" }}>Avg</span>
                      </div>
                    </div>
                  </div>

                  {/* Comparison bar */}
                  <div style={{ marginTop: 10 }}>
                    <div style={{ position: "relative", height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "visible" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          height: "100%",
                          width: `${Math.min(100, (metric.value / (Math.max(metric.value, metric.avg) * 1.2)) * 100)}%`,
                          background: color,
                          borderRadius: 2,
                        }}
                      />
                      {/* avg marker */}
                      <div
                        style={{
                          position: "absolute",
                          left: `${(metric.avg / (Math.max(metric.value, metric.avg) * 1.2)) * 100}%`,
                          top: -2,
                          width: 2,
                          height: 7,
                          background: "rgba(255,255,255,0.35)",
                          borderRadius: 1,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}

    </div>
  )
}

function hexToRgbArr(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
