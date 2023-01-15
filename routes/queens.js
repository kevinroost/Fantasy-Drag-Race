import { Router } from 'express'
import * as queensCtrl from '../controllers/queens.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', queensCtrl.index)
router.get('/new', isLoggedIn, queensCtrl.new)
router.get('/:id', queensCtrl.edit)
router.post('/', queensCtrl.create)
router.post('/:queenId/episodes/:episodeId/pointEvents', queensCtrl.addEvent)
router.post('/:id/episodes', queensCtrl.createEpisode)
router.put('/:id', queensCtrl.update)
router.delete('/:queenId/episodes/:episodeId', queensCtrl.delete)

export {
  router
}
