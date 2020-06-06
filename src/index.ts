require('dotenv').config()
import server from './server'
import DiscordService from './services/discord'

const Discord = new DiscordService()
const PORT = process.env.PORT || 3000

Discord.init()
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
