# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

Use the document ownership entry referenced by project instructions (normally `docs/AGENTS.md`) to locate the domain glossary and applicable designs, decisions and constraints for the task.

Resolve document paths from the repository management root established by project instructions, not the current subproject directory. The context map selects domain documents; read context-local paths from it and the document entry rather than assuming every project lives under `src/`. For Agent Notes, use its configured record roots and documented read-only navigation when needed. Ordinary Markdown links resolve relative to their containing file.

- **`GLOSSARY.md`** at the repo root, or
- **`GLOSSARY-MAP.md`** at the repo root if it exists — it points at one `GLOSSARY.md` per context. Read each one relevant to the topic.
- **Configured design and decision sources** — read the inputs whose registered scope applies to the task. In multi-context repos, use the context map and document ownership entry to locate them.

An absent optional glossary does not require creating one upfront. The `domain-modeling` skill creates it when terms are resolved. If a required design or decision input is missing or its scope conflicts with another input, report the specific configuration gap and affected work.

## File structure

A single-context project may use a root `GLOSSARY.md`; a root `GLOSSARY-MAP.md` points to selected context glossaries in a multi-context project. Resolve decision record paths separately from the document ownership entry and, when selected, the Agent Notes record-root configuration.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag decision conflicts

If your output contradicts an applicable decision, identify the configured source and explain the conflict:

> _Contradicts the current Agent Note on order events — revisit that decision because…_
