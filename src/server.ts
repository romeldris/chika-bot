import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).send()
})

export default app
