import * as chalk from 'chalk'
import { spawn, SpawnOptions } from 'child_process'

export function command(cmd: string, opt?: SpawnOptions): Promise<T_command_result> {
  console.info(chalk.gray('>', cmd))

  opt = {
    shell: true,
    stdio: 'inherit',
    ...opt,
  }

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, opt)

    const result: { message?: string, code?: number } = {}

    child.on('message', r => {
      result.message = r
    })

    child.on('error', e => {
      reject(e)
    })

    child.on('exit', (r) => {
      result.code = r
      resolve(result)
    })
  })
}

export interface T_command_result {
  message?: string,
  code?: number
}
