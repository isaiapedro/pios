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
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "12px 16px",
      }}
    >
      {/* Time range row with Red Geometric Buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {timeRanges.map((t) => {
          const isActive = filter.timeRange === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTimeRange(t.id)}
              className={`filter-rect ${isActive ? "active" : ""}`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Daily calendar picker */}
      {filter.timeRange === "daily" && (
        <div style={{ marginBottom: 10 }}>
          <input
            type="date"
            value={filter.selectedDate}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "rgba(240, 240, 240, 0.9)",
              border: "1px solid #000000",
              borderRadius: "0px",
              color: "#111111",
              fontSize: "12px",
              fontFamily: "'IBM Plex Mono', monospace",
              outline: "none",
              fontWeight: "600",
            }}
          />
        </div>
      )}

      {/* Chess format row */}
      <div style={{ display: "flex", gap: 6 }}>
        {formats.map((f) => {
          const isActive = filter.chessFormat === f.id
          return (
            <button
              key={f.id}
              onClick={() => setFormat(f.id)}
              style={{
                flex: 1,
                padding: "6px 0",
                fontSize: "10px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: isActive ? 700 : 400,
                letterSpacing: "0.05em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                background: isActive ? "#D32531" : "rgba(255,255,255,0.05)",
                color: isActive ? "#ffffff" : "#cccccc",
                border: isActive ? "1px solid #ffffff" : "1px solid rgba(255,255,255,0.15)",
                borderRadius: "0px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: "14px", lineHeight: 1 }}>{f.symbol}</span>
              <span style={{ fontSize: "9px", textTransform: "uppercase" }}>{f.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
