# Overview
The Grocery Manager service is a twin-engine item categorization and synchronization capability. It is built to run both locally as a CLI automation tool and in production as a serverless microservice hosted on AWS Lambda, persisting state inside a PostgreSQL cloud database instance.

---

# Components
- **API/Serverless Gateways:** `src/lambda_function.py` acts as the cloud entry handler wrapping transaction payloads.
- **Orchestration Engines:** `src/grocery_manager.py` (local execution) and `src/pg_grocery_manager.py` (cloud engine) process list updates.
- **Parsing & Taxonomy Layers:** `src/parser.py` maps string inputs to structures, and `src/categories.py` provides semantic category lookup indices.
- **Persistence Abstractors:** `src/db.py`, `src/models.py`, and `src/crud.py` manage atomic SQL state transactions.

---

# Data Flow
1. Text/Message Stream Payload enters via `lambda_function.py` or terminal invocation.
2. Unstructured items are routed to `src/parser.py` to extract counts and names.
3. Named entities are cross-referenced with taxonomic categories inside `src/categories.py`.
4. The structured block is passed to `src/crud.py` which executes database state mutations via `src/db.py` to the target PostgreSQL engine.

---

# External Dependencies
- **AWS Lambda Runtime Environment:** Native serverless code execution triggers.
- **PostgreSQL Database Instance:** Persistent storage destination for structured grocery vectors.

---

# Failure Modes
- **Database Connection Failure:** If PostgreSQL times out, the system fails loudly to prevent silent data drop.
- **Taxonomy Miss:** Items missing category mappings fallback into an implicit "Uncategorized" structural bin.

---

# Deployment
Handled programmatically via `config/deploy.sh` which archives Python library signatures from `config/requirements.txt` along with the contents of the `src/` directory into an AWS Lambda zip deployment package.
