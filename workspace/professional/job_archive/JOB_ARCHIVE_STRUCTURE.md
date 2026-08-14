# Job Archive — Structure Definition & Goals

**Status:** Partially superseded (2026-08-13)  
**Target:** `workspace/professional/job_archive/`  
**Parent architecture:** PIOS Professional Workspace  
**Primary concern:** Secure, local-first work-history and Jira sync/update  

> **Pivot:** Slack create/approve path removed. Company **n8n** owns card creation + approval.  
> This service focuses on mirroring existing cards locally, updating owned tasks, and sanitized git summaries.  
> See `DECISIONS.md` ADR-007 and current `ARCHITECTURE_SPEC.md`.

---

## 1. Purpose

`job_archive` is a professional-workspace service that maintains a **local, sanitized execution archive** for company work while providing a controlled bridge to Jira and Slack.

Its purpose is not to mirror an entire company environment. It should instead preserve the minimum useful operational state needed to:

1. understand what professional work was performed;
2. associate local execution evidence with Jira work;
3. generate sanitized progress summaries;
4. propose Jira work without allowing an LLM to create Jira issues directly;
5. obtain explicit human approval through Slack;
6. maintain a durable local history of proposals, approvals, and resulting Jira cards.

The project must remain compatible with PIOS's domain-isolation rules and should be treated as a **professional operational service**, not as a knowledge repository.

---

## 2. Architectural Goals

### G1 — Local-first execution

Git history, diffs, local state, proposal drafts, sanitization, and synchronization logic should execute locally.

External systems are integration endpoints, not the primary state store.

### G2 — Human approval as a hard boundary

The LLM may propose work, but it must never receive a direct Jira-creation capability.

The only creation path is:

`proposal -> local pending state -> Slack approval -> Jira creation -> local mirror`

An approval event must be validated against the locally stored proposal before Jira creation.

### G3 — Sanitized model context

LLM-facing interfaces must expose only compact, sanitized representations.

Raw source code, unrestricted git diffs, secrets, credentials, database URLs, proprietary implementation details, and arbitrary Jira API payloads must not be exposed through the agent interface.

### G4 — Durable asynchronous state

Slack approval is asynchronous and may happen after the originating agent session has ended.

Pending approvals therefore require durable local state rather than in-memory LLM context.

### G5 — PIOS-native structure

The project must follow the existing PIOS workspace conventions:

- local `manifest.yaml`;
- explicit `SYSTEM.md`;
- explicit `BEHAVIOR.md`;
- project-level `AGENTS.md`;
- `TASKS.md` for implementation state;
- explicit architectural decisions where project-level standards change;
- strict containment inside `workspace/professional/job_archive/`.

### G6 — Separation of orchestration and adapters

Business rules should not be embedded in Slack or Jira clients.

The architecture should separate:

- domain/application orchestration;
- local persistence;
- sanitization;
- code scanning;
- Slack transport;
- Jira transport;
- agent interface;
- CLI operations.

This keeps the approval invariant testable independently from external APIs.

### G7 — Idempotent integrations

Slack events, Jira creation, synchronization, and local mirror updates must tolerate retries.

The system should never create duplicate Jira cards because the same Slack interaction or network operation is delivered more than once.

### G8 — Auditability

Every state transition should be locally traceable:

`drafted -> submitted -> approved/rejected -> created/failed`

The archive should preserve timestamps, actor identifiers where appropriate, external IDs, and failure information without storing unnecessary proprietary content.

---

## 3. Recommended Directory Structure

```text
workspace/professional/job_archive/
├── manifest.yaml
├── SYSTEM.md
├── BEHAVIOR.md
├── AGENTS.md
├── TASKS.md
├── README.md
├── ARCHITECTURE_SPEC.md
├── DECISIONS.md
├── config.yaml
├── .env
├── .gitignore
│
├── cards/
│   └── PROJ-123.md
│
├── pending_approvals/
│   └── draft_001.json
│
├── archive/
│   ├── proposals/
│   ├── approvals/
│   └── executions/
│
├── state/
│   ├── sync_state.json
│   └── event_log.jsonl
│
├── src/
│   ├── __init__.py
│   ├── application/
│   │   ├── orchestrator.py
│   │   ├── approval_service.py
│   │   └── card_service.py
│   │
│   ├── domain/
│   │   ├── models.py
│   │   ├── states.py
│   │   └── policies.py
│   │
│   ├── infrastructure/
│   │   ├── storage.py
│   │   ├── slack_client.py
│   │   ├── jira_client.py
│   │   └── git_client.py
│   │
│   ├── processing/
│   │   ├── code_scanner.py
│   │   ├── sanitizer.py
│   │   └── summarizer.py
│   │
│   ├── interfaces/
│   │   ├── cli.py
│   │   └── mcp_server.py
│   │
│   └── workers/
│       └── slack_listener.py
│
└── tests/
    ├── unit/
    ├── integration/
    └── fixtures/
```

### Why this is preferable to a flat `src/`

The proposed specification's flat module layout is workable for a prototype, but the project has several independent responsibilities and a security-critical approval rule.

Separating `domain`, `application`, `infrastructure`, `processing`, and `interfaces` makes it harder for a Slack/Jira adapter to accidentally acquire authority over business decisions.

The most important invariant should live in the application/domain layer:

> External integrations may report events, but only the approval service may authorize Jira creation.

---

## 4. File Responsibilities

### `manifest.yaml`

Declares the project to PIOS.

It should identify:

- project name and type;
- owner;
- status;
- dependencies;
- permitted integrations;
- local-only security boundary;
- exported sanitized outputs.

It should not contain credentials or environment-specific secrets.

### `SYSTEM.md`

Defines how `job_archive` participates in PIOS.

It should specify:

- inputs;
- outputs;
- integration boundaries;
- state resolution;
- synchronization expectations;
- what the project explicitly does not do.

### `BEHAVIOR.md`

Defines operational rules.

At minimum:

- never create Jira directly from an LLM tool;
- never bypass Slack approval;
- never expose raw proprietary code to the LLM interface;
- preserve historical state;
- make external operations idempotent;
- reject stale or invalid approval events.

### `AGENTS.md`

Provides agent-facing navigation and safety instructions.

It should explain which files can be read by an agent and which operations require the local engine rather than direct model execution.

### `TASKS.md`

Tracks implementation work using the PIOS markdown task convention.

### `DECISIONS.md`

Records architectural changes and their rationale.

The Slack approval boundary, hybrid integration decision, storage strategy, and sanitization policy should be recorded here.

### `config.yaml`

Contains non-secret operational configuration:

- Jira project key;
- Jira issue type;
- Slack approval channel;
- permitted approver IDs;
- local repository registrations;
- sanitization rule configuration;
- scan limits.

Secrets belong in `.env`, never in tracked YAML.

---

## 5. Core Domain Model

The system should treat a proposal as a stateful domain object.

```text
Proposal
├── draft_id
├── title
├── description
├── source_context
├── target_project
├── requested_by
├── approver
├── created_at
├── status
├── slack_message_id
├── slack_channel_id
├── jira_issue_key
└── audit_events[]
```

Recommended lifecycle:

```text
DRAFT
  │
  ▼
PENDING_APPROVAL
  ├──────────────► REJECTED
  │
  ▼
APPROVED
  │
  ▼
JIRA_CREATION_PENDING
  │
  ├──────────────► CREATION_FAILED
  │
  ▼
CREATED
  │
  ▼
MIRRORED
```

No state other than `APPROVED` should authorize Jira creation.

---

## 6. Approval Security Model

The Slack button value must not itself be treated as authorization.

On approval:

1. identify the proposal by immutable draft ID;
2. verify the proposal exists locally;
3. verify it is still `PENDING_APPROVAL`;
4. verify the Slack channel and message match the stored proposal;
5. verify the acting Slack user is an authorized approver;
6. record the approval event;
7. atomically transition the proposal to an approved state;
8. create the Jira issue using the approved stored payload;
9. persist the resulting Jira key;
10. update the Slack thread and local mirror.

A repeated approval event must be harmless.

A rejected, expired, already-created, or otherwise invalid proposal must never reach Jira creation.

---

## 7. LLM Interface

The LLM should receive a deliberately small interface.

### Allowed capabilities

- `propose_jira_card(...)`
- `read_local_card(...)`
- `get_pending_proposals(...)`
- `get_sanitized_work_summary(...)`

### Explicitly forbidden capabilities

The LLM must not receive:

- `jira_create_issue(...)`;
- arbitrary Jira REST access;
- arbitrary Slack API access;
- raw git execution;
- raw filesystem access to registered company repositories;
- credential access.

The critical design principle is:

```text
LLM authority
    ↓
proposal only

Local engine authority
    ↓
approval validation
    ↓
Jira creation
```

This makes the approval rule architectural rather than prompt-dependent.

---

## 8. Local State Strategy

Three categories of state should be separated.

### Operational state

`state/`

Small machine-readable state needed for current operation:

- synchronization cursors;
- event IDs;
- listener state;
- idempotency records.

### Pending transactional state

`pending_approvals/`

Only proposals that have not completed their approval lifecycle.

These files can be deleted or archived after terminal resolution.

### Historical archive

`archive/`

Append-oriented records of:

- proposals;
- approvals/rejections;
- Jira creation attempts;
- integration failures.

This preserves chronology without turning the active state directory into an ever-growing log.

---

## 9. Card Mirror

`cards/` is a **sanitized operational mirror**, not a complete Jira export.

A card should contain:

```markdown
# PROJ-123: Title

## Description

Sanitized description.

## Status

Created / In Progress / Done

## Code Tracking Log

- 2026-08-12 — Sanitized execution summary.

## Approval History

- 2026-08-12 — Approved via Slack.

## External References

- Jira key: PROJ-123
```

Do not mirror arbitrary Jira custom fields, ADF payloads, comments, attachments, or proprietary metadata unless they are explicitly required.

---

## 10. Code Scanner and Sanitizer

The scanner should operate in two stages.

### Stage A — Extraction

`git_client.py` / `code_scanner.py` obtains:

- changed file paths;
- commit metadata;
- bounded diff statistics;
- optionally bounded diff content.

The scanner should enforce configured limits before processing.

### Stage B — Sanitization

`sanitizer.py` removes or abstracts:

- API keys;
- access tokens;
- credentials;
- database URLs;
- private URLs;
- certificates/private keys;
- environment variables containing secrets;
- explicitly configured proprietary patterns.

Sanitization should be deterministic and testable.

The LLM should receive a sanitized summary, not the original diff.

---

## 11. Jira Adapter

`jira_client.py` should be a narrow infrastructure adapter.

It should expose domain-oriented operations such as:

```text
create_approved_card(...)
get_card(...)
update_card(...)
```

It should not expose a generic arbitrary REST method to the application or LLM layer.

Responses should be normalized immediately into small internal models.

This prevents Jira's verbose API representation from leaking into the rest of the application.

---

## 12. Slack Adapter and Worker

The Slack component has two distinct responsibilities.

### Outbound

Send approval requests containing:

- proposal title;
- sanitized description;
- target Jira project;
- proposal ID;
- approve/reject controls.

### Inbound

The Socket Mode worker receives interactive events and passes them to the approval service.

The worker should contain no Jira business logic.

```text
Slack event
    ↓
slack_listener
    ↓
approval_service
    ↓
policy validation
    ↓
Jira adapter
```

This separation also makes the approval workflow testable without Slack.

---

## 13. CLI

> **Live command reference:** `README.md` (this section is historical).

The CLI is the primary human/debugging interface for the local engine.

Current commands (post n8n pivot):

```text
job-archive status
job-archive scan <repository> [--since …]
job-archive summarize <repository> [--since …]
job-archive cards sync [KEY…]
job-archive card show KEY
job-archive card update KEY [--summary …] [--description …] [--status …] [--comment …] [--tracking …] [--local-only-comment]
job-archive export --professional
```

Removed from this service (owned by company n8n or deleted):

```text
job-archive propose
job-archive approvals list
job-archive worker slack
```

The CLI should call application services directly. MCP is optional and currently not shipped.

---

## 14. MCP Server

`mcp_server.py` should be intentionally thin.

Its responsibilities are limited to:

1. validating tool arguments;
2. invoking application services;
3. returning compact sanitized results.

It should not contain:

- Jira REST logic;
- Slack event handling;
- approval rules;
- git parsing;
- sanitization implementation.

This keeps MCP replaceable. The same local engine can later be driven by another agent interface without changing the security model.

---

## 15. Data Flow

### Work observation

```text
Local repository
      ↓
Git scanner
      ↓
Sanitizer
      ↓
Sanitized execution summary
      ↓
Local archive / card mirror
```

### Jira proposal

```text
LLM
 ↓
propose_jira_card
 ↓
Application service
 ↓
pending_approvals/
 ↓
Slack
 ↓
Human approver
 ↓
Approval service
 ↓
Jira adapter
 ↓
Jira issue
 ↓
cards/ + archive/
```

The LLM is never placed between Slack approval and Jira creation.

---

## 16. Security Boundaries

### Boundary A — Company repositories

Accessible only to the local scanner.

### Boundary B — Sanitized summaries

May be consumed by the LLM.

### Boundary C — Credentials

Accessible only to the integration process through environment configuration.

### Boundary D — Jira creation

Accessible only to the approval service after validated human approval.

### Boundary E — PIOS workspace

Only sanitized, useful professional state should be exported outside this project.

The project should not export raw company source material into `knowledge/`, `personal/`, or unrelated PIOS domains.

---

## 17. Integration With PIOS

`job_archive` should integrate with the Professional Workspace at the **sanitized operational-summary level**.

It should provide:

```text
job_archive
    │
    ├── active work themes
    ├── sanitized execution summaries
    ├── Jira card states
    └── blockers / milestones
             │
             ▼
professional workspace
             │
             ▼
PIOS planning / execution context
```

It should not provide:

- raw source code;
- full company documents;
- secrets;
- unrestricted Jira data;
- unrestricted Slack history.

This preserves the Professional Workspace's existing privacy and execution-context boundaries.

---

## 18. Implementation Phases

### Phase 1 — PIOS project foundation

- [x] Create `manifest.yaml`.
- [x] Create `SYSTEM.md`.
- [x] Create `BEHAVIOR.md`.
- [x] Create `AGENTS.md`.
- [x] Create `TASKS.md`.
- [x] Create `DECISIONS.md`.
- [x] Add `.gitignore` and secret-handling rules.
- [x] Define configuration schema.

### Phase 2 — Domain and persistence

- [x] Define proposal and approval state models.
- [x] Implement local state storage.
- [x] Implement append-oriented audit events.
- [x] Implement card mirror manager.
- [x] Add idempotency handling.

### Phase 3 — Sanitized execution archive

- [x] Implement git adapter.
- [x] Implement bounded code scanner.
- [x] Implement deterministic sanitizer.
- [x] Implement sanitized work summarization.
- [x] Add security-focused tests.

### Phase 4 — Slack approval

- [ ] Create Slack app. *(operator step in Slack admin)*
- [ ] Enable Socket Mode. *(operator step in Slack admin)*
- [x] Implement outbound approval messages.
- [x] Implement inbound interactive events.
- [x] Validate approver identity.
- [x] Implement approval state transitions.
- [x] Implement retry/idempotency behavior.

### Phase 5 — Jira bridge

- [x] Implement normalized Jira client.
- [x] Implement approved-card creation.
- [x] Persist Jira issue keys.
- [x] Update card mirrors.
- [x] Handle creation failures safely.

### Phase 6 — Agent interface

- [x] Implement thin MCP server.
- [x] Expose proposal/read-only tools only.
- [x] Verify that direct Jira creation is impossible through MCP.
- [x] Add CLI parity with application services.

### Phase 7 — PIOS integration

- [x] Define sanitized outputs consumed by Professional Workspace.
- [x] Add synchronization/status reporting.
- [x] Verify no raw company data crosses the workspace boundary.

---

## 19. Definition of Done

The project is structurally complete when:

1. a local git change can be converted into a sanitized work summary;
2. an LLM can propose a Jira card without possessing Jira-creation authority;
3. a coworker can approve or reject the proposal asynchronously in Slack;
4. only a validated approval can create the Jira issue;
5. repeated Slack events cannot create duplicate issues;
6. the resulting Jira card is represented locally as a compact Markdown mirror;
7. proposal and approval history remains auditable;
8. secrets and proprietary source material remain outside the LLM-facing interface;
9. the project satisfies PIOS manifest/behavior/system conventions;
10. sanitized professional context can be consumed by the Professional Workspace without exposing raw company data.

---

## 20. Architectural Principle

The central rule of `job_archive` is:

> **The LLM may recommend work; the local system enforces policy; a human authorizes Jira creation; external APIs execute the authorized action.**

This is stronger than relying on an LLM prompt to obey an approval policy. The permission boundary is enforced by the software architecture itself.
