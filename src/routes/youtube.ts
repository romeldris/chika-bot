import { Router, Request, Response } from 'express'
import DiscordService from '../services/discord'
const router: Router = Router()

router.get('/subscribe', async (req: Request, res: Response) => {
  console.log('we are trying to subscribe')
  console.log(req)
  DiscordService.sendMessage('hello')
  const { query } = req
  res.status(200).send(query['hub.challenge'])
})

router.post('/subscribe', async (req: Request, res: Response) => {
  console.log('we are trying to subscribe post')
  console.log(JSON.stringify(req.body))
  DiscordService.sendMessage('hello')
  res.sendStatus(200)
})
export default router
