import {
  getProcessList,
  MacOSProcess,
  WindowsProcess,
  LinuxProcess,
} from '../src'

describe('getProcessList', () => {
  test('> 0', async () => {
    const processes = await getProcessList()
    expect(processes.length).toBeGreaterThan(0)
  })

  test('correct platform', async () => {
    const processes = await getProcessList()
    if (processes.length === 0) return

    if (process.platform === 'darwin') {
      expect(processes[0]).toBeInstanceOf(MacOSProcess)
    } else if (process.platform === 'win32') {
      expect(processes[0]).toBeInstanceOf(WindowsProcess)
    } else if (process.platform === 'linux') {
      expect(processes[0]).toBeInstanceOf(LinuxProcess)
    }
  })
})
