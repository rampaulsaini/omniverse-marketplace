# Shirmani Marketplace Automation

This repository is connected to the central Shirmani continuous orchestration layer.

## Automation contract
- Receives the central `shirmani-orchestrator` repository_dispatch event.
- Supports `SHIRMANI_AUTOMATION_MODE=CONTINUOUS|PAUSED`.
- Runs marketplace health checks and publishes a worker status artifact.
- Business actions should use official APIs/integrations and configured secrets only.

## Architecture
Omniverse-Platform -> repository_dispatch -> omniverse-marketplace -> marketplace worker

This worker is intentionally free-first: GitHub Actions and repository-native automation are used before paid infrastructure.
