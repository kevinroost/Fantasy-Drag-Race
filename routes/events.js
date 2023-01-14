import { Router } from 'express'
import * as eventsCtrl from '../controllers/events.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', isLoggedIn, eventsCtrl.index)
router.post('/', eventsCtrl.create)
router.delete('/:id', eventsCtrl.delete)

export {
  router
}
