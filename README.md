 <h3 align="center">ps-list</h3>

  <p align="center">
    No dependency nodeJS multi-platform module for listing processes. 

### Installation

```
npm install --save-dev @nullx/ps-list
```

## Usage

```ts
import { getProcessList } from '@nullx/ps-list';

getProcessList().then((processes) => {
  // getting the first process
  if (processes[0] instanceof MacOSProcess) {
    console.log('MacOS pid', processes[0].pid)
    console.log('MacOS name', processes[0].name)
  } else if (processes[0] instanceof WindowsProcess) {
    console.log('Windows Image Name', processes[0]['Image Name'])
    console.log('Windows Mem Usage', processes[0]['Mem Usage'])
    console.log('Windows PID', processes[0]['PID'])
    console.log('Windows Session Name', processes[0]['Session Name'])
    console.log('Windows Session#', processes[0]['Session#'])
  } else if (processes[0] instanceof LinuxProcess) {
    console.log('Linux pid', processes[0].pid)
    console.log('Linux name', processes[0].name)
  }
})
```
## Licencia

Distributed under the MIT License. See `LICENSE` for more information.

## Contacto
Jon Lara - [@nullxme](https://twitter.com/nullxme)

Project Link: [https://github.com/nullxx/ps-list](https://github.com/nullxx/ps-list)
