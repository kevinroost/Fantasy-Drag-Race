import { Router } from 'express'
import * as queensCtrl from '../controllers/queens.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/new', isLoggedIn, queensCtrl.new)

export {
  router
}
