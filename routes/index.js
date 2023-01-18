import { Router } from 'express'
import { tallyQueensTotalPoints } from '../middleware/middleware.js'
import { Profile } from "../models/profile.js"

const router = Router()

router.get('/', function (req, res) {
  if (req.user) {
    Profile.findById(req.user.profile._id)
    .populate({
      path: 'team',
      model: 'Queen',
      populate: {
        path: 'episodes',
        model: 'Episode',
        populate: {
          path: 'pointEvents',
          model: 'Event'
        }
      }
    })
    .then(profile => {
      tallyQueensTotalPoints(profile.team)
      res.render('index', {
        title: 'Home Page',
        profile
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  } else {
    res.render('index', {
      title: 'Home Page',
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }
})

export {
  router
}
