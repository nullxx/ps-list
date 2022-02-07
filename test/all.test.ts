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

  test('properties', async () => {
    const processes = await getProcessList()
    if (processes.length === 0) return

    const process = processes[0]
    if (process instanceof MacOSProcess) {
      expect(process).toHaveProperty('pid')
      expect(process).toHaveProperty('name')
    } else if (process instanceof WindowsProcess) {
      expect(process).toHaveProperty('PID')
      expect(process).toHaveProperty('Image Name')
      expect(process).toHaveProperty('Session Name')
      expect(process).toHaveProperty('Mem Usage')
      expect(process).toHaveProperty('Session#')
    } else if (process instanceof LinuxProcess) {
      expect(process).toHaveProperty('pid')
      expect(process).toHaveProperty('name')
    }
  })
})
