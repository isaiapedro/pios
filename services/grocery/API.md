# Public Interfaces

## Serverless Event Trigger (AWS Lambda)
Accepts JSON dictionaries representing raw text or lists.

### Input Event Payload Schema
```json
{
  "raw_text": "3 items of organic milk, apples, coffee"
}
```
Success Response (200 OK):
```json
{
  "status": "success",
  "processed_items": 3,
  "items": [
    {"name": "organic milk", "quantity": 3, "category": "Dairy"},
    {"name": "apples", "quantity": 1, "category": "Produce"},
    {"name": "coffee", "quantity": 1, "category": "Pantry"}
  ],
  "timestamp": "2026-07-10T02:50:00Z"
}
```

# Webhooks

Not implemented. This service operates strictly via synchronous invocation events or direct execution calls.

# CLI

The service can be invoked locally via terminal environments for testing and direct automation scripting routines.

## Usage
```bash
python src/grocery_manager.py --text "2 blocks of cheese, bananas"
```

## Options

    --text, -t: Raw string sequence representing items to be parsed.

    --json, -j: Optional flag to output the result as a raw JSON string to stdout instead of formatted log rows.

# Events

The core serverless handler maps incoming infrastructure gateway invocations directly into internal execution threads.

## AWS Lambda Event Handler (src/lambda_function.py)

    Signature: lambda_handler(event, context)

    Expected Payload Mapping: The handler expects the standard API Gateway Proxy integration event schema, extracting data strings from event['body'].

# Inputs

    Unstructured text strings containing quantities, unit descriptions, and names (parsed via src/parser.py).

    Taxonomic match lists and database connection configurations via environment variables (.env).

# Outputs

    Tabular record streams written directly to relational PostgreSQL tables.

    Standardized structured JSON tracking summaries sent back to calling agents or UI clients.

# Contracts

All database mutations performed by src/crud.py must strictly adhere to the schemas and object properties specified inside src/models.py.
Item Object Constraint Model

    id: Integer (Primary Key, Auto-incrementing).

    name: String (Non-nullable, sanitized lowercase).

    quantity: Integer (Default: 1, Minimum: 1).

    category: String (Non-nullable, matching keys validated by src/categories.py).

    created_at: Timestamp (UTC, automatically appended upon insert).
