import * as chalk from 'chalk'
import { ChildProcess, spawn, SpawnOptions } from 'child_process'

export function command(cmd: string, opt?: T_command_opt, spawn_opts?: SpawnOptions): Promise<T_command_result> {
  opt = {
    mute: false,
    ignore_stdio: false,
    ...opt,
  }

  spawn_opts = {
    shell: true,
    stdio: opt.ignore_stdio ? 'ignore' : 'inherit',
    ...spawn_opts,
  }

  if ( ! opt.mute) {
    console.info(chalk.gray('>', cmd))
  }

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, spawn_opts)

    const result: T_command_result = { process: child }

    child.on('message', r => {
      result.message = r
    })

    child.on('error', e => {
      reject(e)
    })

    child.on('exit', (r) => {
      result.code = r
      result.ok = r === 0
      resolve(result)
    })
  })
}

export interface T_command_result {
  message?: string
  ok?: boolean
  code?: number
  error?: Error
  process?: ChildProcess
}

export interface T_command_opt {
  mute?: boolean
  ignore_stdio?: boolean
}
