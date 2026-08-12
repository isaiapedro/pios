import { type FilterState, type TimeRange, type ChessFormat } from "../App"

interface Props {
  filter: FilterState
  onChange: (f: FilterState) => void
}

const timeRanges: { id: TimeRange; label: string }[] = [
  { id: "yearly", label: "Year" },
  { id: "monthly", label: "Month" },
  { id: "weekly", label: "Week" },
  { id: "daily", label: "Day" },
]

const formats: { id: ChessFormat; label: string; symbol: string }[] = [
  { id: "classical", label: "Classical", symbol: "♔" },
  { id: "rapid", label: "Rapid", symbol: "♞" },
  { id: "blitz", label: "Blitz", symbol: "♝" },
  { id: "bullet", label: "Bullet", symbol: "♟" },
]

export default function FilterHeader({ filter, onChange }: Props) {
  const setTimeRange = (t: TimeRange) => onChange({ ...filter, timeRange: t })
  const setFormat = (f: ChessFormat) => onChange({ ...filter, chessFormat: f })
  const setDate = (d: string) => onChange({ ...filter, selectedDate: d })

  return (
    <div
      style={{
        background: "rgba(10,10,15,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "10px 16px",
      }}
    >
      {/* Time range row */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {timeRanges.map((t) => (
          <button
            key={t.id}
            onClick={() => setTimeRange(t.id)}
            style={{
              flex: 1,
              padding: "5px 0",
              fontSize: 11,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: filter.timeRange === t.id ? 600 : 400,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background: filter.timeRange === t.id ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)",
              color: filter.timeRange === t.id ? "#22c55e" : "#8080a0",
              border: filter.timeRange === t.id ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.05)",
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Daily calendar picker */}
      {filter.timeRange === "daily" && (
        <div style={{ marginBottom: 8 }}>
          <input
            type="date"
            value={filter.selectedDate}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: "100%",
              padding: "6px 10px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 6,
              color: "#ededf5",
              fontSize: 12,
              fontFamily: "JetBrains Mono, monospace",
              outline: "none",
            }}
          />
        </div>
      )}

      {/* Chess format row */}
      <div style={{ display: "flex", gap: 4 }}>
        {formats.map((f) => (
          <button
            key={f.id}
            onClick={() => setFormat(f.id)}
            style={{
              flex: 1,
              padding: "5px 0",
              fontSize: 10,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: filter.chessFormat === f.id ? 600 : 400,
              letterSpacing: "0.03em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              background: filter.chessFormat === f.id ? "rgba(129,140,248,0.1)" : "rgba(255,255,255,0.03)",
              color: filter.chessFormat === f.id ? "#818cf8" : "#8080a0",
              border: filter.chessFormat === f.id ? "1px solid rgba(129,140,248,0.25)" : "1px solid rgba(255,255,255,0.04)",
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 13, lineHeight: 1 }}>{f.symbol}</span>
            <span style={{ fontSize: 9, textTransform: "uppercase" }}>{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
