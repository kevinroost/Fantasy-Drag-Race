import { Router } from 'express'
import * as eventsCtrl from '../controllers/events.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/new', isLoggedIn, eventsCtrl.new)

export {
  router
}
