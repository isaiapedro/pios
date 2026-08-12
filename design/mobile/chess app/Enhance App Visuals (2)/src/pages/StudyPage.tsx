import { useState } from "react"
import { mistakePositions, openingPositions } from "../data/mockData"
import { type FilterState } from "../App"

interface Props { filter: FilterState }

type StudyTab = "mistakes" | "opening"

// Chess piece unicode symbols
const PIECES: Record<string, string> = {
  K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟",
}

function parseFEN(fen: string): (string | null)[][] {
  const position = fen.split(" ")[0]
  const rows = position.split("/")
  return rows.map((row) => {
    const squares: (string | null)[] = []
    for (const ch of row) {
      const num = parseInt(ch)
      if (!isNaN(num)) {
        for (let i = 0; i < num; i++) squares.push(null)
      } else {
        squares.push(ch)
      }
    }
    return squares
  })
}

interface HighlightEntry { row: number; col: number; type: "mistake" | "best" | "moved_from" }

function ChessBoard({ fen, highlights = [] }: { fen: string; highlights?: HighlightEntry[] }) {
  const board = parseFEN(fen)

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        borderRadius: 8,
        overflow: "hidden",
        border: "2px solid rgba(255,255,255,0.1)",
        aspectRatio: "1",
      }}
    >
      {board.map((row, rowIdx) =>
        row.map((piece, colIdx) => {
          const isLight = (rowIdx + colIdx) % 2 === 0
          const highlight = highlights.find((h) => h.row === rowIdx && h.col === colIdx)

          let bgColor = isLight ? "#d4b483" : "#8b6034"
          if (highlight?.type === "mistake") bgColor = isLight ? "rgba(248,113,113,0.75)" : "rgba(220,60,60,0.75)"
          if (highlight?.type === "best") bgColor = isLight ? "rgba(34,197,94,0.75)" : "rgba(20,160,70,0.75)"

          const isWhite = piece && piece === piece.toUpperCase()

          return (
            <div
              key={`${rowIdx}-${colIdx}`}
              style={{
                backgroundColor: bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1",
                position: "relative",
              }}
            >
              {/* Rank label */}
              {colIdx === 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 1,
                    left: 2,
                    fontSize: 7,
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 600,
                    color: isLight ? "#8b6034" : "#d4b483",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {8 - rowIdx}
                </span>
              )}
              {/* File label */}
              {rowIdx === 7 && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 1,
                    right: 2,
                    fontSize: 7,
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 600,
                    color: isLight ? "#8b6034" : "#d4b483",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {"abcdefgh"[colIdx]}
                </span>
              )}
              {piece && (
                <span
                  style={{
                    fontSize: "min(4.2vw, 22px)",
                    lineHeight: 1,
                    color: isWhite ? "#fff5e0" : "#1a1006",
                    textShadow: isWhite
                      ? "0 1px 3px rgba(0,0,0,0.9), 0 0 1px rgba(0,0,0,0.8)"
                      : "0 1px 2px rgba(255,220,150,0.25)",
                    userSelect: "none",
                    display: "block",
                  }}
                >
                  {PIECES[piece] || piece}
                </span>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

function MistakesTab() {
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const pos = mistakePositions[current]

  const goNext = () => { setCurrent((c) => Math.min(c + 1, mistakePositions.length - 1)); setRevealed(false) }
  const goPrev = () => { setCurrent((c) => Math.max(c - 1, 0)); setRevealed(false) }

  return (
    <div>
      {/* Position header */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8080a0",
              marginBottom: 2,
            }}
          >{pos.date} · vs {pos.opponent} ({pos.opponentRating})</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#ededf5",
              }}
            >Move {pos.moveNumber}</div>
            <span
              style={{
                background: "rgba(248,113,113,0.12)",
                border: "1px solid rgba(248,113,113,0.25)",
                borderRadius: 4,
                padding: "2px 6px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                color: "#f87171",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >Loss</span>
          </div>
        </div>

        {/* Eval change */}
        <div
          style={{
            textAlign: "right",
          }}
        >
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#8080a0", marginBottom: 2 }}>Eval Change</div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: 700, color: "#f87171" }}>
            {pos.evalBefore} → {pos.evalAfter}
          </div>
        </div>
      </div>

      {/* Eval bar */}
      <div style={{ padding: "8px 16px 0" }}>
        <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: "32%",
              background: "linear-gradient(90deg, #22c55e, #22c55e 32%, #f87171 32%)",
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "#22c55e" }}>White</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "#f87171" }}>Black</span>
        </div>
      </div>

      {/* Board */}
      <div style={{ padding: "10px 16px" }}>
        <ChessBoard fen={pos.fen} highlights={pos.highlights} />
      </div>

      {/* Move display */}
      <div style={{ padding: "0 16px 12px" }}>
        <div
          style={{
            background: "#111117",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f87171", marginBottom: 4 }}>Played</div>
              <div
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#f87171",
                }}
              >{pos.yourMove}</div>
            </div>
            {revealed && (
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "#22c55e", marginBottom: 4 }}>Best Move</div>
                <div
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#22c55e",
                  }}
                >{pos.bestMove}</div>
              </div>
            )}
          </div>

          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              style={{
                width: "100%",
                padding: "8px",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 8,
                color: "#22c55e",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.08em",
              }}
            >
              Reveal Best Move
            </button>
          ) : (
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: "#8080a0",
                lineHeight: 1.6,
              }}
            >
              {pos.commentary}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ padding: "0 16px", display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={goPrev}
          disabled={current === 0}
          style={{
            flex: 1,
            padding: "10px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8,
            color: current === 0 ? "#3a3a50" : "#8080a0",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            cursor: current === 0 ? "default" : "pointer",
          }}
        >← Prev</button>

        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "#505068",
            textAlign: "center",
            minWidth: 40,
          }}
        >
          {current + 1}/{mistakePositions.length}
        </div>

        <button
          onClick={goNext}
          disabled={current === mistakePositions.length - 1}
          style={{
            flex: 1,
            padding: "10px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8,
            color: current === mistakePositions.length - 1 ? "#3a3a50" : "#8080a0",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            cursor: current === mistakePositions.length - 1 ? "default" : "pointer",
          }}
        >Next →</button>
      </div>
    </div>
  )
}

function OpeningPrepTab() {
  const [current, setCurrent] = useState(0)
  const [selectedMove, setSelectedMove] = useState<string | null>(null)
  const pos = openingPositions[current]

  const isCorrect = selectedMove === pos.bestMove

  const handleSelect = (move: string) => {
    if (!selectedMove) setSelectedMove(move)
  }

  const handleNext = () => {
    setCurrent((c) => (c + 1) % openingPositions.length)
    setSelectedMove(null)
  }

  // Shuffle alternatives with best move mixed in
  const allMoves = selectedMove
    ? [pos.bestMove, ...pos.alternatives]
    : shuffleSeed([pos.bestMove, ...pos.alternatives], current)

  return (
    <div>
      {/* Opening info */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fbbf24",
                marginBottom: 3,
              }}
            >{pos.eco} · {pos.gamesPlayed} games</div>
            <div
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#ededf5",
              }}
            >{pos.name}</div>
          </div>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#8080a0", marginBottom: 2 }}>Win Rate</div>
            <div
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 20,
                fontWeight: 600,
                color: pos.winRate >= 55 ? "#22c55e" : pos.winRate >= 48 ? "#fbbf24" : "#f87171",
              }}
            >{pos.winRate}%</div>
          </div>
        </div>
      </div>

      {/* Board */}
      <div style={{ padding: "10px 16px" }}>
        <ChessBoard fen={pos.fen} highlights={selectedMove ? pos.highlights : []} />
      </div>

      {/* Question */}
      <div style={{ padding: "0 16px 10px" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "#ededf5",
            marginBottom: 10,
            fontWeight: 500,
          }}
        >{pos.question}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {allMoves.map((move) => {
            const isSelected = selectedMove === move
            const isBest = selectedMove && move === pos.bestMove
            const isWrong = isSelected && !isCorrect

            let btnBg = "rgba(255,255,255,0.04)"
            let btnBorder = "rgba(255,255,255,0.08)"
            let btnColor = "#8080a0"

            if (isBest) { btnBg = "rgba(34,197,94,0.12)"; btnBorder = "rgba(34,197,94,0.35)"; btnColor = "#22c55e" }
            if (isWrong) { btnBg = "rgba(248,113,113,0.1)"; btnBorder = "rgba(248,113,113,0.3)"; btnColor = "#f87171" }
            if (!selectedMove) { btnColor = "#ededf5" }

            return (
              <button
                key={move}
                onClick={() => handleSelect(move)}
                disabled={!!selectedMove}
                style={{
                  padding: "10px 12px",
                  background: btnBg,
                  border: `1px solid ${btnBorder}`,
                  borderRadius: 8,
                  color: btnColor,
                  fontFamily: "Fraunces, serif",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: selectedMove ? "default" : "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {isBest && "✓ "}
                {isWrong && "✗ "}
                {move}
              </button>
            )
          })}
        </div>

        {/* Commentary */}
        {selectedMove && (
          <div
            style={{
              marginTop: 10,
              background: "#111117",
              border: "1px solid rgba(255,255,255,0.06)",
              borderLeft: `3px solid ${isCorrect ? "#22c55e" : "#f87171"}`,
              borderRadius: "0 8px 8px 0",
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: isCorrect ? "#22c55e" : "#f87171",
                marginBottom: 5,
              }}
            >{isCorrect ? "Correct!" : `Best was ${pos.bestMove}`}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8080a0", lineHeight: 1.6 }}>
              {pos.commentary}
            </div>
          </div>
        )}

        {/* Next button */}
        {selectedMove && (
          <button
            onClick={handleNext}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "10px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 8,
              color: "#22c55e",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
          >
            Next Position →
          </button>
        )}
      </div>

      {/* Opening list */}
      <div style={{ padding: "4px 16px 0" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: "#505068", marginBottom: 8 }}>Your Repertoire</div>
        {openingPositions.map((op, i) => (
          <button
            key={op.id}
            onClick={() => { setCurrent(i); setSelectedMove(null) }}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px",
              background: current === i ? "rgba(251,191,36,0.07)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${current === i ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.05)"}`,
              borderRadius: 8,
              marginBottom: 6,
              cursor: "pointer",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#ededf5" }}>{op.name}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#505068" }}>{op.eco} · {op.gamesPlayed} games</div>
            </div>
            <div
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 15,
                fontWeight: 600,
                color: op.winRate >= 55 ? "#22c55e" : op.winRate >= 48 ? "#fbbf24" : "#f87171",
              }}
            >{op.winRate}%</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function shuffleSeed<T>(arr: T[], seed: number): T[] {
  const copy = [...arr]
  let s = seed
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function StudyPage({ filter: _filter }: Props) {
  const [activeTab, setActiveTab] = useState<StudyTab>("mistakes")

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: "20px 16px 0" }}>
        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#ededf5",
            marginBottom: 14,
          }}
        >Study Board</div>

        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: 3,
            gap: 3,
            marginBottom: 4,
          }}
        >
          {([
            { id: "mistakes" as StudyTab, label: "Critical Mistakes" },
            { id: "opening" as StudyTab, label: "Opening Prep" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "8px 10px",
                background: activeTab === tab.id ? "#17171f" : "transparent",
                border: activeTab === tab.id ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                borderRadius: 8,
                color: activeTab === tab.id ? "#ededf5" : "#505068",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 600 : 400,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.15s",
                textTransform: "uppercase",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ paddingTop: 12 }}>
        {activeTab === "mistakes" ? <MistakesTab /> : <OpeningPrepTab />}
      </div>
    </div>
  )
}
