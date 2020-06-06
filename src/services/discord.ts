import Discord, { MessageEmbed } from 'discord.js'

export default class DiscordBot {
  private client
  constructor() {
    this.client = new Discord.Client()
  }

  sendTwitchNotification(channelId: string, message: object) {}
  sendYoutubeNotification(channelId: string, message: object) {}

  init() {
    this.client.on('ready', async () => {
      console.log(`Logged in as ${this.client.user.tag}`)
    })

    this.client.on('message', async (msg) => {
      if (msg.content.indexOf('!setup') === 0) {
        const [, channelName] = msg.content.split(' ')
        const channelId = channelName.substring(
          channelName.indexOf('#') + 1,
          channelName.indexOf('>')
        )
        console.log('the id is', channelId)
        const channel = await this.client.channels.fetch(channelId)

        channel.send('hi')
        console.log(channel)
      }
    })

    this.client.login(process.env.TOKEN)
  }
}
