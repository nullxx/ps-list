export class MacOSProcess {
  pid: number
  name: string

  constructor(pid: number, name: string) {
    this.pid = pid
    this.name = name
  }
}

export class WindowsProcess {
  'PID': number
  'Image Name': string
  'Session Name': string
  'Mem Usage': string
  'Session#': number

  constructor(
    pid: number,
    imageName: string,
    sessionName: string,
    memUsage: string,
    session: number
  ) {
    this.PID = pid
    this['Image Name'] = imageName
    this['Session Name'] = sessionName
    this['Mem Usage'] = memUsage
    this['Session#'] = session
  }

  static fromObject(p: WindowsProcess): WindowsProcess {
    return new WindowsProcess(
      p.PID,
      p['Image Name'],
      p['Session Name'],
      p['Mem Usage'],
      p['Session#']
    )
  }
}

export class LinuxProcess {
  pid: number
  name: string

  constructor(pid: number, name: string) {
    this.pid = pid
    this.name = name
  }
}

export * as macos from './macos'
export * as windows from './windows'
export * as linux from './linux'
