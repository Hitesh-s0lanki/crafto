import { config } from "dotenv"

config({ path: ".env.local" })

import { parseEnv } from "@neon/env"
import { defineConfig } from "drizzle-kit"

import neonConfig from "./src/neon"
import { withExplicitSslMode } from "./src/lib/db/connection-string"

// Direct (unpooled) connection — schema pushes must not go through PgBouncer.
const { postgres } = parseEnv(neonConfig, ["DATABASE_URL_UNPOOLED"])

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: withExplicitSslMode(postgres.databaseUrlUnpooled),
  },
})
