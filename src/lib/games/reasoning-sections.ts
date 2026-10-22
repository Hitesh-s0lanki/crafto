/** Split provider text at paragraph boundaries so existing rows stay stable. */
export function splitReasoningSections(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const [firstLine, ...lines] = paragraph.split("\n")
      const heading = firstLine.match(/^(?:#{1,6}\s+(.+)|\*\*(.+?)\*\*:?\s*)$/)

      if (heading) {
        return {
          title: heading[1] ?? heading[2],
          body: lines.join("\n").trim(),
        }
      }

      // Labels use the provider's own opening words. Keep the full text below.
      const sentence = paragraph.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim()
      const opening = sentence ?? firstLine
      const title =
        opening.length > 88 ? `${opening.slice(0, 85).trimEnd()}…` : opening
      return { title, body: paragraph === title ? "" : paragraph }
    })
}
