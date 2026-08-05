# Trends Service — Behavior Specification

## 1. Execution Boundary
- Analytical service. No high-throughput compute (that's `services/video/`).
- Runs off its own venv/requirements (see `requirements.txt`), not `services/video/venv/`.

## 2. Existing Capability: Keyword Demand Velocity
- `src/scrape_google_trends.py` fetches Google Trends `interest_over_time` for a keyword list via `pytrends`.
- Outputs a markdown table to `knowledge/blog_manager/raw/tech/tech_trends.md`.

## 3. New Capability: Channel Momentum Score

**Purpose:** Given a YouTube `channel_id`, score whether its first-10-video launch strategy (niche focus, format, hook style) is a viable blueprint to replicate — turns ad-hoc competitive research into a repeatable number.

**Input:** `channel_id` (YouTube channel), optionally a niche keyword list (reused for Demand Velocity).

**Pipeline (first 10 published videos of the channel):**

1. **Niche Consistency — mean pairwise cosine similarity**
   - Fetch title + description per video (YouTube Data API v3, `videos.list`).
   - Embed each title+description via Ollama `nomic-embed-text`.
   - Compute cosine similarity across all C(10,2)=45 pairs; take the mean.
   - Range 0–1. Higher = tighter thematic focus (see prior research: focused niches got +40% impressions vs -25% for generic/mixed channels under 2026 Browse clustering).

2. **Supply Deficit Ratio**
   - `avg_view_count / avg_subscriber_count` across the 10 videos.
   - View counts: `videos.list` (statistics.viewCount) per video.
   - Subscriber count: `channels.list` (statistics.subscriberCount), single current snapshot for the channel.
   - **Known limitation:** subscriberCount is a *current* snapshot, not historical-at-upload-time. Ratio is somewhat time-skewed for older videos/channels — treat as directional, not exact.

3. **Angle Leverage — cognitive-trigger score (diagnostic, not part of the index)**
   - Per video, LLM-judge (Ollama `llama3.2`) scores title (+description) 1–5 on each of:
     - Curiosity gap
     - Relatability / identity
     - Stakes / tension
   - Per-video score = mean of the 3 triggers. Channel score = mean across the 10 videos.
   - Reported alongside the Blueprint Viability Index but **not multiplied into it** — it's a separate qualitative signal on hook strength, since it doesn't have the same scale/units as the other three ratio-based metrics.

4. **Demand Velocity**
   - Reuses `scrape_google_trends.py` unchanged, for the channel's niche keyword(s).

5. **Blueprint Viability Index**
   - `mean_cosine_similarity × supply_deficit_ratio × demand_velocity`
   - Single scalar. Higher = stronger case that this niche/format blueprint is worth replicating right now.

**Output:** Markdown report to `knowledge/blog_manager/raw/tech/channel_momentum_<channel_id>.md`, containing all 4 raw metrics + the index + the 10 source video IDs/titles for traceability.

## 4. Privacy Boundary
- This capability MUST NOT read from or write to the `/api/v1/trends/behavioral` endpoint (personal-schedule adherence/variance metrics). That endpoint mixes personal data into this analytical/objective-domain service, which already conflicts with the root privacy boundary (`master_manager/CLAUDE.md`) — flagged for separate review, not extended here.
- All data consumed by Channel Momentum Score is public YouTube/Trends data only.
