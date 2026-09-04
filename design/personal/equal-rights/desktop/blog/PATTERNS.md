# Equal Rights — desktop blog pattern inventory

## Public shell

| Pattern | Visual recipe | Behavior |
|---|---|---|
| Masthead | Fixed, 64px dark gradient bar with a white bottom rule; centered wordmark; centered primary links; utility controls to the right. | Active link receives black fill, white double outline, and offset white shadow. On narrow screens, replace links with a full-height right drawer and dismissible overlay. |
| Theme switch | Small icon-only utility control. | Swaps the root light-theme class; preserve every text, divider, surface, and interaction state—not only the page background. |
| Language switch | Icon trigger with compact dark dropdown. | Shows the current locale and closes after choice. The mobile drawer exposes direct EN/PT choices. |
| Mobile drawer | Full-width dark panel with navigation, theme/language controls, and secondary links. | Slides from the right over a dimming overlay; the trigger changes from three bars to an X. |

## Discovery and collection

| Pattern | Visual recipe | Behavior |
|---|---|---|
| Search field | Wide, pale translucent pill on the dark canvas; search glyph inset left; subtle blur and focus brightening. | Enter submits the query. Preserve a visible focus treatment and a clear accessible label. |
| Print-label filter | Uppercase, bold white label on `#D32531`; black 1px inner border; 2px white outer ring; muted offset shadow. | Hover changes the fill treatment; active darkens to `#a0000f`. Used both as an interactive category filter and a noninteractive content tag—distinguish these semantically. |
| Editorial home grid | Three columns: side stories / featured story / text-only list, separated by fine rules and bounded by a heavy top rule. | At ≤1100px, the text list spans below two columns; at ≤800px, collapse to one column. |
| Feature story | Large, cropped image; oversized serif headline; short deck; byline and mono date. | Whole card is a link; headline lightens on hover. Keep image crop separate from the content’s intrinsic dimensions. |
| Masonry article archive | CSS multi-column layout with variable-height image stories. | Four columns desktop, three at 1100px, two at 800px, one at 500px. Cards scale slightly on hover. |
| Progressive reveal | Fixed-height content region with a bottom gradient fade and a print-label “show more” action. | Expands max-height rather than loading a second page; preserve the button’s reachability above the fade. |
| Review collection | Desktop sidebar for filters plus a main list/optional artwork grid and a detail preview pane. | Filters, sorting, and grid density live together; active result gets a high-contrast outline/offset shadow. Narrow screens move to a single stream. |

## Long-form reading

| Pattern | Visual recipe | Behavior |
|---|---|---|
| Article header | Narrow reading column (about 890px); back link, large serif title, muted deck, author/date metadata. | Keep the back link before the title in reading order. |
| Engagement bar | Thin rules above and below; grouped icon actions and counts in muted sans text. | Like state becomes red; actions are compact but must retain an adequate tap target. Share opens a small upward dark menu. |
| Markdown prose | Serif, approximately 1.25rem/1.8 line-height; headings change to sans; links retain an offset underline; blockquotes become dark panels with a left rule. | Preserve semantic heading, list, quote, and code markup rather than styling arbitrary paragraphs. Code is horizontally scrollable. |
| Comments | Minimal stacked thread with a left rule, muted identity/date, and a roomy auto-growing textarea. | Disabled submit is visibly subdued. An author reply nests inward and replaces the left rule with a dark quote panel. |
| Album review header | Large cover beside title/artist/genres/metadata; review page has a radial dark field with nearly imperceptible grain. | Stack cover and metadata on mobile. Genre pills are metadata, not filters, unless wired as such. |
| Review body | Flexible content column plus detail rail. Sections are soft dark, thin-bordered, 16px cards; detail rail carries score, tracklist, and similar releases. | At ≤768px, flow the detail rail after content and reduce heading scale. Embeds and audio load lazily where possible. |
| Score display | Conic-gradient ring around a large numeric score plus star interpretation and verdict. | Score color is informational; text/value must remain available without relying on the ring or stars. |

## About / tactile composition

The about page is an intentionally isolated scrapbook treatment: paper-toned inventory card, irregular paper radius, paperclip, tilted photo, handwritten values, scattered samples, and taped project note. It should be used only where a personal, authored narrative is appropriate. It is not a replacement for the public site’s normal card system or for application forms.

## Authenticated CMS

| Pattern | Visual recipe | Behavior |
|---|---|---|
| Login | Centered compact dark card with a single password field, inline error, and primary action. | Loading disables the field and button; never disclose whether a credential or account was valid. |
| Authoring workspace | Fixed top action bar; left navigation sidebar; scrollable editor. | Sidebar groups articles and reviews by status with counts, collapsible groups, active selection, and “new” action. |
| Editor header | Item title, compact engagement stats, save/export/logout actions, then language tabs. | Save state disables conflicting changes. Translation is available from the source language only and shows its in-progress state. |
| Form layout | Label above control; two- and three-column desktop rows; neutral inputs/selects and publish toggle. | Collapse columns on small screens; bind labels to inputs and keep publication changes explicit. |
| Content blocks | Repeatable cards for structured content/widgets with add/remove affordances. | Empty states explain what can be created next; destructive removal needs confirmation in a future implementation. |

## States and feedback

| State | Contract |
|---|---|
| Loading image | Dark horizontal shimmer placeholder, then image fade-in. Reserve the target aspect ratio to avoid layout shift. |
| Empty / unavailable | Plain centered explanatory text or quiet CMS empty state; avoid decorative alerts for ordinary absence. |
| Error | Brief centered title and supporting text on public pages; inline message for login/forms. Preserve user-entered text when safe. |
| Disabled | Lower opacity and no pointer affordance; do not use opacity as the only distinction—retain the disabled attribute and explain unavailable actions where needed. |
| Light theme | Warm paper canvas; convert dark-on-light rules, cards, metadata, and score backgrounds together. Review and collection surfaces remove decorative dark background imagery. |

## Mobile handoff

Mobile-specific contracts live in `../../mobile/blog/README.md`. Desktop patterns must not rely on hover for an action that has no mobile equivalent.
