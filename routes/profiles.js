import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.post('/:profileId/team/:queenId', profilesCtrl.recruitQueen)

export {
  router
}
