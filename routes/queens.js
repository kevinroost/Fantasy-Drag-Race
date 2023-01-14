import { Router } from 'express'
import * as queensCtrl from '../controllers/queens.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', queensCtrl.index)
router.get('/new', isLoggedIn, queensCtrl.new)
router.get('/:id/edit', queensCtrl.edit)
router.post('/', queensCtrl.create)
router.post('/:id/events', queensCtrl.addEvent)
router.put('/:id', queensCtrl.update)

export {
  router
}
