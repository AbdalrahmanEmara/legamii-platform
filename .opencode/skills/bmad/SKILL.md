# BMAD (Business Method AI Development)

BMAD is a methodology / workflow system installed at `_bmad/`. It provides structured software development processes: analysis, planning, solutioning, implementation, and review.

## When to use

- User mentions "bmad", "BMad Method", or any BMAD skill name (e.g. "bmad-prd", "bmad-quick-dev", "bmad-code-review")
- User asks to talk to a BMAD agent (Mary, Paige, John, Sally, Winston, Amelia)
- User wants a structured workflow: research, PRD, architecture, epics/stories, implementation, code review, sprint planning
- User asks to "investigate", "create a PRD", "run a code review", "plan a sprint", "do a retrospective"
- User says "distill this into a spec" or "generate project context"

## How to use

1. Read `_bmad/_config/bmad-help.csv` for the full skill catalog with descriptions, workflow phases, and usage instructions
2. Read `_bmad/_config/skill-manifest.csv` for skill definitions and their module locations
3. Read `_bmad/config.toml` and `_bmad/bmm/config.yaml` / `_bmad/core/config.yaml` for project configuration
4. Follow the workflow phase order: analysis -> planning -> solutioning -> implementation (with optional anytime skills)
5. Output artifacts go to `_bmad-output/` unless otherwise specified

## BMAD agents

| Name | Role | File |
|------|------|------|
| Mary | Business Analyst | `_bmad/bmm/1-analysis/bmad-agent-analyst/` |
| Paige | Technical Writer | `_bmad/bmm/1-analysis/bmad-agent-tech-writer/` |
| John | Product Manager | `_bmad/bmm/2-plan-workflows/bmad-agent-pm/` |
| Sally | UX Designer | `_bmad/bmm/2-plan-workflows/bmad-agent-ux-designer/` |
| Winston | System Architect | `_bmad/bmm/3-solutioning/bmad-agent-architect/` |
| Amelia | Senior Software Engineer | `_bmad/bmm/4-implementation/bmad-agent-dev/` |

## Modules

- **core** - Cross-cutting skills: brainstorming, editorial review, adversarial review, spec, forge idea, customize, party mode, help, index docs, shard doc, edge case hunter
- **bmm** (BMad Method) - Full SDLC: research, analysis, PRD, UX, architecture, epics/stories, implementation, sprint management, QA, code review, retrospectives
