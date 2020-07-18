require('dotenv').config()
import server from './server'
import DiscordService from './services/discord'

const PORT = process.env.PORT || 3000

DiscordService.init()
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
