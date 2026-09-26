const legacySslModes = new Set(["prefer", "require", "verify-ca"])

/**
 * Keep pg's current secure behavior explicit ahead of pg-connection-string 3.
 */
export function withExplicitSslMode(connectionString: string) {
  const url = new URL(connectionString)
  const sslMode = url.searchParams.get("sslmode")

  if (sslMode && legacySslModes.has(sslMode)) {
    url.searchParams.set("sslmode", "verify-full")
  }

  return url.toString()
}
