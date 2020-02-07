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
