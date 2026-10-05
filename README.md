# SheetPath v0.1.1 — Vercel-ready baseline

Learning-first spreadsheet MVP for Excel + Google Sheets.

## Flow included

`Concept → Animated Demo → Interactive Tutorial → Guided Practice → Skill Check → Mastery`

The first lesson teaches `SUM` using a lightweight spreadsheet simulator. v0.1.1 deliberately has no database/auth dependency, so importing a fresh GitHub repository into Vercel requires no environment variables.

## Requirements

- Node.js >= 20.9
- npm (ships with Node)

## Verify locally

```bash
npm install
npm run check
npm run dev
```

`npm run check` runs ESLint, TypeScript checking, and the production Next.js build.

## GitHub → Vercel

1. Push this folder to a GitHub repository.
2. Vercel → **Add New → Project** → import that repository.
3. Keep the auto-detected **Next.js** settings and root directory `./`.
4. No environment variables are required for v0.1.1.
5. Deploy.

## Verification status of this export

The project is configured for Next.js 16.3.8 and has been statically reviewed. The build runner used to prepare this export could not reach `registry.npmjs.org` (`EAI_AGAIN`), so dependencies could not be downloaded there and a production build could not be executed in that runner. Run `npm run check` (or let Vercel build the repo) in a network-enabled environment before treating a deployment as verified.

## Next milestone

After this UX slice is validated: Neon PostgreSQL + Drizzle + Better Auth, JSON-driven tutorial content, persistent mastery/progress, and L0 curriculum.
