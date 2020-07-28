import Discord, { MessageEmbed } from 'discord.js'
import * as commands from '../commands'
const prefix = '!'
export class DiscordBot {
  private client: Discord.Client
  private commands: Discord.Collection<string, any>

  constructor() {
    this.client = new Discord.Client()
    this.commands = new Discord.Collection()
    this.setCommands()
  }

  private setCommands() {
    console.log(commands)
    Object.keys(commands).map((key) =>
      this.commands.set(commands[key].name, commands[key])
    )
  }

  sendTwitchNotification(channelId: string, message: object) {}
  sendYoutubeNotification(channelId: string, message: object) {}

  getClient() {
    return this.client
  }

  init() {
    this.client.on('ready', async () => {
      console.log(`Logged in as ${this.client.user.tag}`)
    })

    this.client.on('message', async (msg) => {
      if (!msg.content.startsWith(prefix) || msg.author.bot) return

      const args = msg.content.slice(prefix.length).trim().split(/ +/)
      const command = args.shift().toLowerCase()

      if (!this.commands.has(command)) return

      try {
        this.commands.get(command).execute(msg, args)
      } catch (error) {
        console.error(error)
        msg.reply('there was an error trying to execute that command!')
      }

      // if (msg.content.indexOf('!setup') === 0) {
      //   if (!this.channelId) {
      //     const [, channelName] = msg.content.split(' ')
      //     const channelId = channelName.substring(
      //       channelName.indexOf('#') + 1,
      //       channelName.indexOf('>')
      //     )
      //     console.log('the id is', channelId)
      //     await this.client.channels.fetch(channelId)
      //     this.channelId = channelId
      //   } else {
      //     msg.reply('We have already initialized a channel')
      //   }
      // }
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
