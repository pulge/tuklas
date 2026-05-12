# Contributing to Tuklas

Tuklas is an open-source, self-hosted job hunting assistant. Contributions are welcome.

---

## Getting started

```bash
git clone https://github.com/pulge/tuklas.git
cd tuklas
npm install
cp .env.example .env
# Fill in ENCRYPTION_KEY: openssl rand -hex 32
npm run db:migrate
npm run dev
```

---

## Commit convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org). Every commit message must follow this format:
type(scope): short description

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Tooling, deps, config |
| `docs` | Documentation only |
| `refactor` | Code change with no behavior change |
| `perf` | Performance improvement |
| `test` | Tests only |

Commits are enforced locally via commitlint + husky. PRs with non-conforming commits will not be merged.

---

## Branching

- `main` — stable, release-ready
- `feat/<name>` — new features
- `fix/<name>` — bug fixes

Open a PR against `main`. Squash your commits before requesting review.

---

## Pull request checklist

- [ ] `npm run build` passes with no errors
- [ ] Commit messages follow conventional commits
- [ ] `.env.example` updated if new env vars were added
- [ ] `CHANGELOG.md` is not manually edited — it is generated on release

---

## What not to contribute

- Anything that adds a server-side database (Supabase, Postgres, etc.) — Tuklas OSS is intentionally local-first with SQLite
- Auto-apply features — semi-automatic review is a core design constraint
- Admin dashboards or multi-user features — those belong in the cloud version

---

## Questions

Open a [GitHub Discussion](https://github.com/pulge/tuklas/discussions) for questions or ideas before opening a PR for large changes.