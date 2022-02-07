import { execFile } from 'child_process'
import { promisify } from 'util'
import { MacOSProcess } from '.'

export async function getProcessList(): Promise<MacOSProcess[]> {
  const result = await promisify(execFile)('ps', ['-axco', 'pid,comm'], {
    encoding: 'utf8',
  })

  const lines = result.stdout.split('\n')
  const processes = []

  for (let i = 1; i < lines.length; i++) {
    const match = lines[i].match(/\w?(\d+)\s+([^\s]+)/)
    if (match?.length !== 3) continue

    processes.push(new MacOSProcess(Number(match[1]), match[2]))
  }

  return processes
}
