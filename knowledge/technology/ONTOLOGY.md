# Technology Domain Ontology & Concept Map

## Key Entities & Frameworks

### 1. Architecture & Design Patterns
- **API Architectural Patterns**: RESTful resource design, OpenAPI/Swagger specifications, GraphQL, gRPC.
- **Data Storage & Pipeline Design**: PostgreSQL schemas, object storage, ETL orchestration, indexing strategies.
- **System Design Principles**: Clean Architecture, Domain-Driven Design (DDD), Microservices vs. Modular Monolith.

### 2. Engineering Operations (DevOps)
- **CI/CD & Automation**: Testing frameworks, automated linting, build pipelines, release tagging.
- **Security & Identity**: OAuth2, OpenID Connect, Role-Based Access Control (RBAC), data encryption.

## Inter-Domain Relationships
- **Technology -> Health**: Provides runtime infrastructure, database schemas, and REST endpoints for FHIR/OMOP services (`knowledge/health/`).
- **Technology -> Business**: Implements technical controls (unit testing, design documentation, audit logging) required by IEC 62304 and ISO 13485 (`knowledge/business/`).
