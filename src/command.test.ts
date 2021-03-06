import { command } from './command'

it('Can mute', async () => {
  await command('ls', { mute: false })
  console.log('-------------------')
  await command('ls', { mute: true })
})

it('Can ignore', async () => {
  await command('ls', { ignore_stdio: false })
  console.log('-------------------')
  await command('ls', { ignore_stdio: true })
})

it('ok', async () => {
  expect((await command('ls')).ok).toBeTruthy()
  expect((await command('_a_not_exist_command')).ok).toBeFalsy()
})
