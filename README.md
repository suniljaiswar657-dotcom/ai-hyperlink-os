# HYPERLINK OS — AI Command Center

Original independent frontend foundation for an AI operations workspace.

## Included in this first build
- Responsive futuristic dashboard and navigation
- Agent list + create-agent interaction (local UI state)
- Module search and module navigation
- Workflow run interaction and activity stream
- Mobile responsive layout

## Honest integration status
This is **Phase 1 frontend foundation**, not a production AI SaaS yet.
- AI model calls are not connected.
- Agent creation is local UI state (not persisted).
- Automation run is a UI simulation.
- Authentication, database, billing, real integrations, and server-side secrets are not configured.
- No API keys are embedded.

## Run locally
```bash
npm install
npm run dev
```

## Build check
```bash
npm run build
```

## Next production phases
1. Supabase Auth + PostgreSQL + Row Level Security
2. Persist agents and workflow definitions
3. Secure server-side AI provider integration (never expose secret keys in browser)
4. Real workflow execution service and logs
5. Integration settings, rate limits, audit trail and security review
6. Test suite and deployment verification
