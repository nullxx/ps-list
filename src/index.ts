import {
  macos,
  windows,
  linux,
  MacOSProcess,
  WindowsProcess,
  LinuxProcess,
} from './lib'

export async function getProcessList(): Promise<
  (MacOSProcess | WindowsProcess | LinuxProcess)[]
> {
  switch (process.platform) {
    case 'darwin':
      return macos.getProcessList()
    case 'win32':
      return windows.getProcessList()
    case 'linux':
      return linux.getProcessList()
    default:
      return Promise.resolve([])
  }
}

export { MacOSProcess, WindowsProcess, LinuxProcess }
