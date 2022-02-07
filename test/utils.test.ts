import { WindowsProcess } from '../src/lib'
import { parseCSV } from '../src/lib/utils'

test('CSV PARSE', () => {
  const csv = '"Image Name","PID","Session Name","Session#","Mem Usage"\n"System Idle Process","0","Services","0","8 K"\n"System","4","Services","0","264 K"\n"Registry","124","Services","0","67,968 K"'
  const result = parseCSV<WindowsProcess>(csv, { delimiter: ',', quote: '"' })

  expect(result.length).toBe(3)

  expect(result[0].PID).toBe(0)
  expect(result[0]['Image Name']).toBe('System Idle Process')
  expect(result[0]['Session Name']).toBe('Services')
  expect(result[0]['Session#']).toBe(0)
  expect(result[0]['Mem Usage']).toBe('8 K')

  expect(result[1].PID).toBe(4)
  expect(result[1]['Image Name']).toBe('System')
  expect(result[1]['Session Name']).toBe('Services')
  expect(result[1]['Session#']).toBe(0)
  expect(result[1]['Mem Usage']).toBe('264 K')

  expect(result[2].PID).toBe(124)
  expect(result[2]['Image Name']).toBe('Registry')
  expect(result[2]['Session Name']).toBe('Services')
  expect(result[2]['Session#']).toBe(0)
  expect(result[2]['Mem Usage']).toBe('67,968 K')
})
