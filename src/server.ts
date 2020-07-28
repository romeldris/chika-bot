import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import twitch from './routes/twitch'
import youtube from './routes/youtube'
import xmlparser from 'express-xml-bodyparser'
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send()
})

app.use('/twitch', bodyParser.json(), twitch)
app.use('/youtube', xmlparser(), youtube)

export default app
