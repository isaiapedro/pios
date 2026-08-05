# Trends Service API Endpoints

### GET /api/v1/trends/social
Returns cross-platform engagement deltas and velocity markers.

### GET /api/v1/trends/behavioral
Returns adherence and variance metrics extracted from personal schedules.

> ⚠️ Flagged: mixes personal data into an analytical/objective-domain service, conflicting with the root privacy boundary in `master_manager/CLAUDE.md`. Not consumed by any new capability below pending separate review.

### GET /api/v1/trends/momentum?channel_id={id}
Returns Channel Momentum Score for the given YouTube channel's first 10 videos:
- `mean_cosine_similarity` — niche consistency (0-1)
- `supply_deficit_ratio` — avg_view_count / avg_subscriber_count
- `demand_velocity` — Google Trends interest_over_time for channel niche keyword(s)
- `blueprint_viability_index` — mean_cosine_similarity × supply_deficit_ratio × demand_velocity
- `angle_leverage` — diagnostic only, mean 1-5 score across curiosity gap / relatability / stakes-tension (not multiplied into the index)
- `videos` — the 10 source video IDs/titles used, for traceability

See `BEHAVIOR.md` §3 for full spec. Requires `YOUTUBE_API_KEY` env var and local Ollama (`nomic-embed-text`, `llama3.2`).
