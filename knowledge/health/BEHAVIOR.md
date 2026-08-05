# Health Domain Behavioral Guidelines

## Ingestion & Integrity Rules
1. **Clinical & Technical Precision**: Medical terminology (e.g., SNOMED CT, LOINC, RxNorm) and data model specifications must maintain 100% fidelity to upstream standards.
2. **Immutable Standard Specs**: The standard specifications in `raw/HL7 FHIR R4` and `raw/OMOP CDM v5.4` must never be altered directly.
3. **Data Anonymization Notice**: No personal health information (PHI) or real patient records are stored in this repository. All sample payloads must use synthetic data.

## Synthesis & Processing Rules
- Store entity mappings, crosswalks (e.g., FHIR to OMOP mapping), and architecture guides under `synthesized/`.
- Every document in `synthesized/` must reference its parent standard source in `raw/`.
