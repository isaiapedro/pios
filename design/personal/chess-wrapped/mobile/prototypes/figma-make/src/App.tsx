import { useState } from "react"
import FilterHeader from "./components/FilterHeader"
import BottomNav from "./components/BottomNav"
import WrappedPage from "./pages/WrappedPage"
import InsightsSummaryPage from "./pages/InsightsSummaryPage"
import InsightsDetailPage from "./pages/InsightsDetailPage"
import StudyPage from "./pages/StudyPage"

export type Page = "wrapped" | "insights" | "catalog" | "study"
export type TimeRange = "yearly" | "monthly" | "weekly" | "daily"
export type ChessFormat = "classical" | "rapid" | "blitz" | "bullet"

export interface FilterState {
  timeRange: TimeRange
  chessFormat: ChessFormat
  selectedDate: string
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("insights")
  const [filter, setFilter] = useState<FilterState>({
    timeRange: "yearly",
    chessFormat: "rapid",
    selectedDate: new Date().toISOString().split("T")[0],
  })

  const navigate = (page: Page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: 430,
        minHeight: "100svh",
        background: "#0a0a0f",
        color: "#ffffff",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
        borderRight: "1px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      {/* Sticky filter header */}
      <FilterHeader filter={filter} onChange={setFilter} />

      {/* Scrollable page content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {activePage === "wrapped" && <WrappedPage filter={filter} />}
        {activePage === "insights" && (
          <InsightsSummaryPage filter={filter} onOpenCatalog={() => navigate("catalog")} />
        )}
        {activePage === "catalog" && <InsightsDetailPage filter={filter} />}
        {activePage === "study" && <StudyPage filter={filter} />}
      </div>

      {/* Fixed bottom nav */}
      <BottomNav activePage={activePage} onNavigate={navigate} />
    </div>
  )
}
