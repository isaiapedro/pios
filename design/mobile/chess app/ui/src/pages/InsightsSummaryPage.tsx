import { LineChart, Line, ResponsiveContainer } from "recharts"
import { winFactors, lossFactors, monthlyActivity } from "../data/mockData"
import { type FilterState } from "../App"

interface Props {
  filter: FilterState
  onOpenCatalog: () => void
}

function FactorCard({
  name, value, avg, delta, positive, description, chartData,
}: {
  name: string; value: string; avg: string; delta: string; positive: boolean; description: string; chartData: number[]
}) {
  const color = positive ? "#22c55e" : "#f87171"
  const chartColor = positive ? "#22c55e" : "#f87171"
  const chartFormatted = chartData.map((v, i) => ({ i, v }))

  return (
    <div
      style={{
        background: "#111117",
        border: "1px solid rgba(255,255,255,0.06)",
        borderLeft: `3px solid ${color}`,
        borderRadius: "0 10px 10px 0",
        padding: "14px 14px",
        marginBottom: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
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
          >{name}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 26,
                fontWeight: 600,
                color: "#ededf5",
                lineHeight: 1,
              }}
            >{value}</span>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                fontWeight: 600,
                color,
              }}
            >{delta}</span>
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "#505068",
              marginTop: 2,
            }}
          >avg {avg}</div>
        </div>
        <div style={{ width: 70, height: 40 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartFormatted}>
              <Line type="monotone" dataKey="v" stroke={chartColor} strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Benchmark bar */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ position: "relative", height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: positive ? "74%" : "31%",
              background: color,
              borderRadius: 2,
              transition: "width 0.6s ease",
            }}
          />
          {/* average marker */}
          <div
            style={{
              position: "absolute",
              left: positive ? "68%" : "44%",
              top: -1,
              width: 2,
              height: 6,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 1,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#505068" }}>You</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#505068" }}>Platform avg</span>
        </div>
      </div>

      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          color: "#8080a0",
          lineHeight: 1.5,
        }}
      >{description}</div>
    </div>
  )
}

export default function InsightsSummaryPage({ filter, onOpenCatalog }: Props) {
  const winRate = 58

  return (
    <div style={{ paddingBottom: 80 }}>

      {/* Header */}
      <div
        style={{
          background: "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%)",
          padding: "28px 20px 20px",
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#22c55e",
            marginBottom: 6,
          }}
        >Performance Analysis</div>
        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ededf5",
          }}
        >What Moves<br />the Needle</div>
      </div>

      {/* Win/loss donut summary */}
      <div
        style={{
          margin: "0 16px 16px",
          background: "#111117",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "14px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Mini circle chart */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle
              cx="32" cy="32" r="26" fill="none"
              stroke="#22c55e" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 26 * winRate / 100} ${2 * Math.PI * 26 * (1 - winRate / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
            />
            <circle
              cx="32" cy="32" r="26" fill="none"
              stroke="#f87171" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 26 * 30.5 / 100} ${2 * Math.PI * 26 * 69.5 / 100}`}
              strokeLinecap="round"
              strokeDashoffset={`-${2 * Math.PI * 26 * winRate / 100}`}
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 14, fontWeight: 700, color: "#ededf5" }}>{winRate}%</span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
            {[
              { label: "Wins", value: 491, color: "#22c55e" },
              { label: "Draws", value: 98, color: "#94a3b8" },
              { label: "Losses", value: 258, color: "#f87171" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 18, fontWeight: 600, color: item.color }}>{item.value}</div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "#505068" }}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* Monthly rating sparkline */}
          <div style={{ height: 28, marginTop: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyActivity}>
                <Line type="monotone" dataKey="rating" stroke="#818cf8" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* What's working */}
      <div style={{ padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#22c55e",
              fontWeight: 600,
            }}
          >Driving Your Wins</div>
        </div>
        {winFactors.map((f) => (
          <FactorCard key={f.name} {...f} />
        ))}
      </div>

      {/* What's costing you */}
      <div style={{ padding: "8px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f87171" }} />
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#f87171",
              fontWeight: 600,
            }}
          >Costing You Points</div>
        </div>
        {lossFactors.map((f) => (
          <FactorCard key={f.name} {...f} />
        ))}
      </div>

      {/* CTA to catalog */}
      <div style={{ padding: "16px 16px 0" }}>
        <button
          onClick={onOpenCatalog}
          style={{
            width: "100%",
            padding: "14px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)" }}
        >
          <div>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 15, fontWeight: 600, color: "#ededf5", textAlign: "left" }}>Explore All Metrics</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#8080a0", textAlign: "left" }}>Style · Openings · Middlegames · Endgames</div>
          </div>
          <div style={{ color: "#8080a0", fontSize: 18 }}>→</div>
        </button>
      </div>

    </div>
  )
}
