import { Router } from 'express'
import * as queensCtrl from '../controllers/queens.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', queensCtrl.index)
router.get('/new', isLoggedIn, queensCtrl.new)
router.get('/:id', queensCtrl.edit)
router.get('/:id/episodes', queensCtrl.editEpisode)
router.post('/', queensCtrl.create)
router.post('/:queenId/episodes/:episodeId/pointEvents', queensCtrl.addEvent)
router.post('/:id/episodes', queensCtrl.createEpisode)
router.put('/:id', queensCtrl.update)
router.put('/:id/episodes/', queensCtrl.updateEpisodes)
router.delete('/:queenId/episodes/:episodeId', queensCtrl.delete)
router.delete('/:queenId/episodes/:episodeId/pointEvents/:eventId', queensCtrl.removeEvent)

export {
  router
}
