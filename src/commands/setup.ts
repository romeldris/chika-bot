import Discord from 'discord.js'
import DiscordService from '../services/discord'

const STEPS = [{ name: 'channel' }, { name: 'service' }, { name: 'id' }]
const currentSteps = {}

export default {
  name: 'setup',
  description: 'Setup YouTube or Twitch Pub/Sub',
  async execute(message: Discord.Message) {
    console.log('hello', message.author.username)
    if (!currentSteps[message.author.id]) {
      message.channel.send(
        'Please enter the channel you would like to send the notifications to'
      )
      currentSteps[message.author.id] = 0
    }
    const filter = (m) => m.author.id === message.author.id
    const collector = message.channel.createMessageCollector(filter)

    collector.on('collect', async (m) => {
      const currentStep = currentSteps[m.author.id]
      const params = m.content.split(' ')
      console.log(
        `you are currently on step ${currentStep} ${m.author.username}`
      )
      currentSteps[m.author.id] = currentStep + 1
      if (currentStep === 0) {
        if (params.length > 1) {
          message.channel.send(
            'This step only requires 1 aragument, [channelName]'
          )
        }

        const channelId = params[0].substring(
          params[0].indexOf('#') + 1,
          params[0].indexOf('>')
        )

        const channel = await DiscordService.getClient().channels.fetch(
          channelId
        )
        message.channel.send(
          `Setting up notifications for channel ${channel.id}`
        )
        // handle setting up the notification channel
        message.channel.send('Please enter the service youtube/twitch')
      }
      if (currentStep === 1) {
        // handle setting up the service
        message.channel.send('please enter the id')
      }

      if (currentStep === 2) {
        //handle setting up the pub/sub
      }
      console.log(`Collected ${m.content}`)
    })

    collector.on('end', (collected) => {
      console.log(`Collected ${collected.size} items`)
    })
  },
}
