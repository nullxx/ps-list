interface ParseCSVOpts {
  delimiter?: string
  quote?: string
  lineDelimiter?: string
}

export function parseCSV<T>(
  csv: string,
  { delimiter = ',', quote = '"', lineDelimiter = '\r?\n' }: ParseCSVOpts
): T[] {
  const lines = csv.split(new RegExp(lineDelimiter))
  const headers = lines[0]
    .split(delimiter)
    .map((h) => h.trim())
    .map((h) => (h.startsWith(quote) && h.endsWith(quote) ? h.slice(1, -1) : h))

  const data = lines.slice(1)
  const newData: T[] = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i].split(delimiter)
    const finalRow: Record<string, unknown> = {}

    for (let j = 0; j < row.length; j++) {
      if (row[j].startsWith(quote) && !row[j].endsWith(quote)) {
        const next = j + 1
        if (!row[next]) continue
        if (!row[next].endsWith(quote)) continue
        row[j] += delimiter + row[next]
        row.splice(next, 1)
      }
    }

    if (row.length !== headers.length) continue // skip invalid rows

    for (let j = 0; j < row.length; j++) {
      let value = row[j]

      if (value.startsWith(quote) && value.endsWith(quote)) {
        value = value.slice(1, -1)
      }

      if (value === '') {
        finalRow[headers[j]] = null
      } else if (value === 'true') {
        finalRow[headers[j]] = true
      } else if (value === 'false') {
        finalRow[headers[j]] = false
      } else if (value === 'null') {
        finalRow[headers[j]] = null
      } else if (!isNaN(Number(value))) {
        finalRow[headers[j]] = Number(value)
      } else {
        finalRow[headers[j]] = value
      }
    }
    newData.push(finalRow as T)
  }
  return newData
}
