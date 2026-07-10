# Service Review

## Reliability
Any failures in database reconnection routines or error handling steps?

## Performance
Any throughput issues or timeout anomalies running heavy parsing workflows on Lambda?

## Architecture
Are script separations between database queries and core classification logic completely preserved?

## Interfaces
Have any payload signatures changed that could break the upstream messaging clients?

## Dependencies
Are all modules used in `src/` clearly mapped in `config/requirements.txt`?

## Security
Verify that no plaintext tokens or local passwords accidentally slipped into source revisions.
