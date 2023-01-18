import { Router } from 'express'
import { Profile } from "../models/profile.js"
import { tallyQueensTotalPoints } from '../middleware/middleware.js'
import { tallyProfileTotalPoints } from '../middleware/middleware.js'
import { Queen } from "../models/queen.js"

const router = Router()

router.get('/', function (req, res) {
  if (req.user) {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      Queen.find({_id: {$in: profile.team}})
      .populate({
        path: 'episodes',
        model: 'Episode',
        populate: {
          path: 'pointEvents',
          model: 'Event'
        }
      })
      .then(queens => {
        tallyQueensTotalPoints(queens)
        profile.totalPoints = 0
        queens.forEach(queen => profile.totalPoints += queen.totalPoints)
        console.log('profile', profile)
        res.render('index', {
          title: 'Home Page',
          queens,
          profile
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect("/")
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
  }
})

export {
  router
}
