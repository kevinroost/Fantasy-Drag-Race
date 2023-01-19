import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/rankings', profilesCtrl.ranks)
router.post('/:profileId/team/:queenId', isLoggedIn, profilesCtrl.recruitQueen)
router.delete('/:profileId/team/:queenId', isLoggedIn, profilesCtrl.benchQueen)

export {
  router
}
