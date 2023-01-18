import { Router } from 'express'
import { tallyQueensTotalPoints } from '../middleware/middleware.js'
import { Profile } from "../models/profile.js"

const router = Router()

router.get('/', function (req, res) {
  Profile.find({})
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
  .then(profiles => {
    profiles.forEach(profile => tallyQueensTotalPoints(profile.team))
    profiles.sort(function(a, b) {return b.totalPoints - a.totalPoints})
    res.render('index', {
      title: 'Home Page',
      profiles
    })
  })
  .catch(err => {
      console.log(err)
      res.redirect("/")
  })
})

export {
  router
}
