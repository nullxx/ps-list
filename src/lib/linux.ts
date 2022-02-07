import { execFile } from 'child_process'
import { promisify } from 'util'
import { LinuxProcess } from '.'

export async function getProcessList(): Promise<LinuxProcess[]> {
  const result = await promisify(execFile)('ps', ['-eo', 'pid,comm'])
  return result.stdout.split('\n').map((line) => {
    const [pid, name] = line.trim().split(' ')
    return new LinuxProcess(Number(pid), name)
  })
}
