import { Router, Request, Response } from 'express'
const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  res.sendStatus(200)
})

router.post('/', async (req: Request, res: Response) => {
  res.sendStatus(200)
})

export default router
