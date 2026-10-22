# Sandbox

Sandbox is an AI-powered 3D game builder. The Next.js application handles the
UI, authentication, and game metadata, while a Trigger.dev chat agent uses
Anthropic and OpenAI models with Daytona sandboxes to build and run each game.

## Local prerequisites

Install or obtain access to the following before starting:

- Node.js 22 or newer and npm
- The Neon project used by this repository
- The Clerk application used by this repository
- A Trigger.dev account with access to project `proj_zvorsutvvtskdhmmfeje`
- A Daytona API key
- An Anthropic API key
- An OpenAI API key
- Sentry credentials only if local error reporting or source-map uploads are
  needed

The application needs both the Next.js server and the Trigger.dev development
worker running locally.

## 1. Install dependencies

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

`.env.local` is ignored by Git. Never commit API keys or database credentials.

## 2. Configure Neon

Install and authenticate the Neon CLI if it is not already available:

```bash
npm install -g neon@latest
neon login
```

Link the repository and pull the pooled and direct database URLs:

```bash
neon link --project-id little-pine-64259911 --branch production -y
neon env pull --project-id little-pine-64259911 --branch production \
  --file .env.local \
  -e DATABASE_URL \
  -e DATABASE_URL_UNPOOLED \
  -e NEON_BRANCH
```

`DATABASE_URL` is used by the application. `DATABASE_URL_UNPOOLED` is used by
Drizzle for schema operations.

## 3. Configure Clerk

Install the Clerk CLI, sign in, link the correct application, and pull its
development keys:

```bash
npm install -g clerk@latest
clerk auth login
clerk link --app app_3JdVNqwpxuxS3KLxm4Nu9PUFALU
clerk env pull \
  --app app_3JdVNqwpxuxS3KLxm4Nu9PUFALU \
  --instance dev \
  --file .env.local
clerk doctor
```

This populates `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

## 4. Add the remaining credentials

Complete these values in `.env.local`:

```dotenv
# Creates and manages the isolated game sandboxes.
DAYTONA_API_KEY=

# Runs the Trigger.dev chat session from Next.js server actions.
TRIGGER_SECRET_KEY=

# Used for every game and title generation request.
OPENROUTER_API_KEY=
```

Get `TRIGGER_SECRET_KEY` from the Trigger.dev dashboard for the environment you
want to use. The Trigger.dev CLI also needs to be authenticated before its
local worker can start:

```bash
npx trigger.dev@latest login
```

### Optional Sentry configuration

The app runs locally without Sentry credentials. Add the following only when
you want local telemetry or source-map uploads:

```dotenv
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=enra-r3
SENTRY_PROJECT=sandbox
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development
SENTRY_ENVIRONMENT=development
SENTRY_RELEASE=
```

`SENTRY_AUTH_TOKEN` is needed for source-map uploads during builds and Trigger
deployments; it is not required for ordinary local development.

## 5. Apply the database schema

Push the current Drizzle schema directly to the linked Neon database:

```bash
npm run db:push
```

This project intentionally uses `db:push`. Do not run `drizzle-kit generate`
or `drizzle-kit migrate`, and do not create migration files.

## 6. Start the local services

Run the Trigger.dev worker in one terminal:

```bash
npm run trigger:dev
```

Run Next.js in a second terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), sign in or create an
account, and create or select a Clerk organization. Games and credits are
scoped to the active organization.

## Environment variable reference

| Variable | Required locally | Used for |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Pooled Neon connection used by the application |
| `DATABASE_URL_UNPOOLED` | Yes | Direct Neon connection used by Drizzle |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk browser authentication |
| `CLERK_SECRET_KEY` | Yes | Clerk server-side authentication and billing data |
| `DAYTONA_API_KEY` | Yes | Creating and managing game sandboxes |
| `TRIGGER_SECRET_KEY` | Yes | Starting Trigger.dev chat sessions from Next.js |
| `OPENROUTER_API_KEY` | Yes | Game and title generation through OpenRouter |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Browser error reporting |
| `SENTRY_DSN` | No | Server and Trigger.dev worker error reporting |
| `SENTRY_AUTH_TOKEN` | No | Sentry source-map uploads |
| `SENTRY_ORG` / `SENTRY_PROJECT` | No | Sentry project selection |
| `NEXT_PUBLIC_SENTRY_ENVIRONMENT` / `SENTRY_ENVIRONMENT` | No | Sentry environment labels |
| `SENTRY_RELEASE` | No | Explicit Sentry release name |
| `RAILWAY_ENVIRONMENT_NAME` / `RAILWAY_GIT_COMMIT_SHA` | No | Railway deployment metadata |

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run trigger:dev` | Start Trigger.dev tasks locally |
| `npm run db:push` | Apply `src/lib/db/schema.ts` to Neon |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm run format` | Format TypeScript and TSX files |
| `npm run build` | Create a production Next.js build |
| `npm run trigger:deploy` | Deploy Trigger.dev tasks |

## Troubleshooting

- **Drizzle reports that `DATABASE_URL_UNPOOLED` is missing:** ensure the Neon
  variables were pulled into `.env.local`.
- **Clerk reports missing keys:** run `clerk env pull --instance dev --file
.env.local`, then restart the Next.js server.
- **The app signs in but cannot create a game:** create or select an
  organization from the organization switcher.
- **Chat does not start:** confirm `npm run trigger:dev` is running and that
  `TRIGGER_SECRET_KEY`, the API key for the selected model provider, and
  `DAYTONA_API_KEY` are set.
- **Environment changes are ignored:** restart both local processes after
  editing `.env.local`.
