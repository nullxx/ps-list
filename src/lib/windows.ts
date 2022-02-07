import { execFile } from 'child_process'
import { promisify } from 'util'
import { WindowsProcess } from '.'
import { parseCSV } from './utils'

export async function getProcessList(): Promise<WindowsProcess[]> {
  const result = await promisify(execFile)('tasklist', ['/fo', 'csv'])
  return parseCSV<WindowsProcess>(result.stdout, {
    delimiter: ',',
    quote: '"',
    lineDelimiter: '\r?\n',
  }).map((p) => WindowsProcess.fromObject(p))
}
