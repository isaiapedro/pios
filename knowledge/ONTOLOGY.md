# Master Knowledge Ontology & Correlation Matrix

## Objective Domains
1. **Health**: Medical data structures, clinical guidelines, regulatory health standards, bioinformatics.
2. **Business**: Regulatory frameworks, compliance, corporate strategy, finance operations, QMS.
3. **Technology**: Software engineering, protocol specifications, algorithms, system architecture.
4. **Media**: Publishing, content creation, transcripts, marketing, distribution channels.
5. **Arts**: Visual design, creative writing, aesthetics, audio/video synthesis.

## Cross-Domain Relationship Matrix

### Health <-> Business
- **Regulatory Compliance**: ISO 13485, IEC 62304, and EU MDR (`business/raw/`) dictate software lifecycle and quality management requirements for medical devices and health software (`health/`).
- **Market Strategy**: Healthcare product positioning depends on clinical validation and regulatory clearance.

### Health <-> Technology
- **Data Standards**: HL7 FHIR R4 and OMOP CDM v5.4 (`health/raw/`) map directly to database schemas, REST APIs, and data engineering pipelines (`technology/`).
- **Interoperability**: EHR integrations rely on web protocols, OAuth2 authentication, and structured payload serialization (`technology/`).

### Business <-> Technology
- **Architecture Governance**: QMS compliance (IEC 62304) requires documented software architectures, CI/CD verification pipelines, and trace matrices (`technology/`).

### Media <-> Business
- **Distribution**: Editorial workflows (`media/`) align with brand strategy, content marketing, and customer acquisition models (`business/`).

### Arts <-> Media
- **Asset Creation**: Aesthetic guidelines and visual design systems (`arts/`) serve as foundational inputs for publishing templates and media branding (`media/`).

## Document Linking Standard
All markdown files must link cross-domain references using relative paths in frontmatter:
```yaml
related_nodes:
  - "knowledge/business/raw/ISO 13485, IEC 62304, and EU MDR compliance/README.md"
  - "knowledge/technology/synthesized/api-design.md"
```
