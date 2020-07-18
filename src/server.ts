import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import twitch from './routes/twitch'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send()
})

app.use('/twitch', twitch)

export default app
