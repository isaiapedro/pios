# Equal Rights — mobile blog patterns

Mobile is a first-class reading and discovery surface, derived from the responsive implementation rather than a separate brand system.

## Navigation

- Replace the fixed desktop link row at 768px with a full-height right drawer and dimming overlay.
- Transform the hamburger into a close icon, expose theme and direct EN/PT controls inside the drawer, and keep secondary social links there.

## Layout and typography

- Use normal document flow on mobile; desktop absolute, viewport-filling containers are not valid mobile layout primitives.
- Remove desktop search offsets, reduce filter padding, and wrap filters.
- Collapse home and archive grids to a single readable column before text or images become cramped.
- Reduce article titles to about 1.9rem and prose to about 1.05rem while retaining generous line-height.
- Stack review cover, metadata, body, and details rail into reading order. Never require hover to reveal a necessary control.

## Shared rules

See `../../README.md` for visual foundations and `../../desktop/blog/PATTERNS.md` for the complete semantic component inventory. The same Equal Rights assets are consumed from `../../shared/`; do not duplicate them for mobile.
