import Discord, { MessageEmbed } from 'discord.js'

export class DiscordBot {
  private client: Discord.Client
  private channelId: string
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
        if (!this.channelId) {
          const [, channelName] = msg.content.split(' ')
          const channelId = channelName.substring(
            channelName.indexOf('#') + 1,
            channelName.indexOf('>')
          )
          console.log('the id is', channelId)
          await this.client.channels.fetch(channelId)
          this.channelId = channelId
        } else {
          msg.reply('We have already initialized a channel')
        }
      }
    })

    this.client.login(process.env.TOKEN)
  }

  async sendMessage(message: string) {
    const channel = await this.client.channels.fetch('718880844944506900')
    // channel.send('hello!')
  }
}

const discordInstance = new DiscordBot()

export default discordInstance
