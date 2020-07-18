import { Router, Request, Response } from 'express'
import TwitchService from '../services/twitch'
import DiscordService from '../services/discord'
const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  const followers = await TwitchService.getFollowers()
  res.send({ followers })
})

router.post('/', async (req: Request, res: Response) => {
  res.sendStatus(200)
})

router.get('/clip', (req: Request, res: Response) => {
  const { query } = req
  console.log(query)
  TwitchService.clip(query.title as string)
  res.sendStatus(200)
})

router.get('/subscribe', async (req: Request, res: Response) => {
  console.log('we are trying to subscribe')
  DiscordService.sendMessage('hello')
  TwitchService.subscribe()
  res.sendStatus(200)
})

router.post('/updates', async (req: Request, res: Response) => {
  const { body } = req
  const data = body.data[0]
  console.log(body.data[0])
  DiscordService.sendMessage(`${data.user_name} is now live on twitch ${data}`)
  res.sendStatus(200)
})

router.get('/updates', async (req: Request, res: Response) => {
  const { query } = req
  res.status(200).send(query['hub.challenge'])
})
export default router
