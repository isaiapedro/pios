import { useState } from "react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { playerStats, monthlyActivity, hourlyActivity, archetypes, comparisons } from "../data/mockData"
import { type FilterState } from "../App"

interface Props { filter: FilterState }

const formatLabel: Record<string, string> = {
  classical: "Classical",
  rapid: "Rapid",
  blitz: "Blitz",
  bullet: "Bullet",
}

const timeLabel: Record<string, string> = {
  yearly: "2024",
  monthly: "This Month",
  weekly: "This Week",
  daily: "Today",
}

export default function WrappedPage({ filter }: Props) {
  const [activeArchetype, setActiveArchetype] = useState(0)

  const period = timeLabel[filter.timeRange] || "2024"
  const fmt = formatLabel[filter.chessFormat]

  return (
    <div style={{ paddingBottom: 80 }}>

      {/* Hero */}
      <div
        style={{
          background: "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 70%), #0a0a0f",
          padding: "32px 20px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: "absolute",
            right: -20,
            top: -10,
            fontSize: 160,
            lineHeight: 1,
            opacity: 0.03,
            userSelect: "none",
            fontFamily: "serif",
          }}
        >♟</div>

        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#22c55e",
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          {fmt} · {period}
        </div>

        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 36,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#ededf5",
            marginBottom: 4,
          }}
        >
          Your Year<br />in Chess
        </div>

        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "#8080a0",
          }}
        >
          @{playerStats.username}
        </div>
      </div>

      {/* Hero rating number */}
      <div
        style={{
          padding: "20px 20px 0",
          display: "flex",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8080a0",
              marginBottom: 2,
            }}
          >Peak Rating</div>
          <div
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1,
              color: "#ededf5",
              letterSpacing: "-2px",
            }}
          >
            {playerStats.peakRating}
          </div>
        </div>
        <div style={{ paddingBottom: 8 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 20,
              padding: "4px 10px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              fontWeight: 600,
              color: "#22c55e",
            }}
          >
            +{playerStats.ratingChange}
          </div>
        </div>
      </div>

      {/* Key stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          padding: "16px 16px 0",
        }}
      >
        {[
          { label: "Games Played", value: playerStats.totalGames.toLocaleString(), sub: `${playerStats.wins}W · ${playerStats.draws}D · ${playerStats.losses}L` },
          { label: "Win Rate", value: `${playerStats.winRate}%`, sub: "58th percentile" },
          { label: "Time Invested", value: `${playerStats.timeSpentHours}h`, sub: `${playerStats.timeSpentMinutes}m remaining` },
          { label: "Moves Made", value: playerStats.totalMoves.toLocaleString(), sub: `Avg ${playerStats.avgGameLength} per game` },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#111117",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "14px 14px",
            }}
          >
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#8080a0",
                marginBottom: 6,
              }}
            >{stat.label}</div>
            <div
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 32,
                fontWeight: 600,
                lineHeight: 1,
                color: "#ededf5",
                marginBottom: 4,
              }}
            >{stat.value}</div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: "#505068",
              }}
            >{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Rating progression */}
      <div
        style={{
          margin: "16px 16px 0",
          background: "#111117",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "14px 14px 10px",
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#8080a0",
            marginBottom: 12,
          }}
        >Rating Progression · 2024</div>
        <ResponsiveContainer width="100%" height={90}>
          <AreaChart data={monthlyActivity} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "#505068", fontSize: 9, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#17171f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#ededf5", fontFamily: "JetBrains Mono", fontSize: 11 }}
              itemStyle={{ color: "#22c55e" }}
              cursor={{ stroke: "rgba(255,255,255,0.08)" }}
            />
            <Area type="monotone" dataKey="rating" stroke="#22c55e" strokeWidth={2} fill="url(#ratingGrad)" dot={false} activeDot={{ r: 3, fill: "#22c55e" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Activity by month */}
      <div
        style={{
          margin: "8px 16px 0",
          background: "#111117",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "14px 14px 10px",
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#8080a0",
            marginBottom: 12,
          }}
        >Games by Month</div>
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={monthlyActivity} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barGap={2}>
            <XAxis dataKey="month" tick={{ fill: "#505068", fontSize: 9, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#17171f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#ededf5", fontFamily: "JetBrains Mono", fontSize: 11 }}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="wins" name="Wins" fill="#22c55e" opacity={0.9} radius={[2, 2, 0, 0]} />
            <Bar dataKey="games" name="Games" fill="rgba(255,255,255,0.1)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Peak hours */}
      <div
        style={{
          margin: "8px 16px 0",
          background: "#111117",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "14px 14px 10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8080a0",
            }}
          >When You Play</div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: "#8080a0",
            }}
          >
            Peak: <span style={{ color: "#fbbf24", fontWeight: 600 }}>10 PM</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={60}>
          <BarChart data={hourlyActivity} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey="hour" tick={{ fill: "#505068", fontSize: 8, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#17171f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#ededf5", fontFamily: "JetBrains Mono", fontSize: 11 }}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="games" fill="#fbbf24" opacity={0.7} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Archetypes */}
      <div style={{ padding: "16px 16px 0" }}>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8080a0",
            marginBottom: 10,
          }}
        >Your Playing Archetypes</div>

        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {archetypes.map((arch, i) => (
            <button
              key={arch.name}
              onClick={() => setActiveArchetype(i)}
              style={{
                flexShrink: 0,
                background: activeArchetype === i ? `rgba(${hexToRgb(arch.color)},0.12)` : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeArchetype === i ? arch.color + "44" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 10,
                padding: "10px 14px",
                cursor: "pointer",
                transition: "all 0.15s",
                textAlign: "left",
                minWidth: 110,
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 4 }}>{arch.symbol}</div>
              <div
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: activeArchetype === i ? arch.color : "#ededf5",
                  marginBottom: 2,
                }}
              >{arch.name}</div>
            </button>
          ))}
        </div>

        {/* Archetype detail */}
        <div
          style={{
            marginTop: 8,
            background: "#111117",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "#8080a0",
              lineHeight: 1.5,
            }}
          >
            {archetypes[activeArchetype].desc}
          </div>
        </div>
      </div>

      {/* Fun comparisons */}
      <div style={{ padding: "16px 16px 0" }}>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8080a0",
            marginBottom: 10,
          }}
        >What You Could Have Done Instead</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {comparisons.map((c) => (
            <div
              key={c.label}
              style={{
                background: "#111117",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "12px 12px",
              }}
            >
              <div style={{ fontSize: 16, marginBottom: 6 }}>{c.icon}</div>
              <div
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#ededf5",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >{c.value}</div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  color: "#505068",
                  lineHeight: 1.4,
                }}
              >{c.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
