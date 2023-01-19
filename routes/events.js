import { Router } from 'express'
import * as eventsCtrl from '../controllers/events.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', isLoggedIn, eventsCtrl.index)
router.post('/', isLoggedIn, eventsCtrl.create)
router.delete('/:id', isLoggedIn, eventsCtrl.delete)

export {
  router
}
