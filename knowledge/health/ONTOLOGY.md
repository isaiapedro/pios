# Health Domain Ontology & Concept Map

## Key Entities & Frameworks

### 1. Interoperability Layer (HL7 FHIR R4)
- **Patient / Encounter**: Represents subject identity and care episodes.
- **Observation / Condition**: Represents clinical findings, labs, and diagnoses.
- **MedicationRequest / Procedure**: Represents clinical interventions and orders.

### 2. Observational Analytics Layer (OMOP CDM v5.4)
- **PERSON / VISIT_OCCURRENCE**: Standardized person demographics and care events.
- **CONDITION_OCCURRENCE / MEASUREMENT**: Standardized clinical observation tables.
- **DRUG_EXPOSURE / PROCEDURE_OCCURRENCE**: Intervention tables linked via Standard Concept IDs.

## Health Crosswalk Matrix (FHIR R4 <-> OMOP CDM v5.4)

| FHIR Resource | OMOP CDM Table | Target Vocabulary |
| :--- | :--- | :--- |
| `Patient` | `PERSON` | Demographic Concepts |
| `Condition` | `CONDITION_OCCURRENCE` | SNOMED CT |
| `Observation` (Labs) | `MEASUREMENT` | LOINC |
| `MedicationRequest` | `DRUG_EXPOSURE` | RxNorm |
| `Procedure` | `PROCEDURE_OCCURRENCE` | CPT4 / SNOMED CT |

## Inter-Domain Relationships
- **Health -> Business**: FHIR/OMOP software implementations require QMS and traceability logs defined under `knowledge/business/raw/ISO 13485, IEC 62304, and EU MDR compliance/`.
- **Health -> Technology**: Data storage and API implementations rely on PostgreSQL schemas and OpenAPI definitions in `knowledge/technology/`.
