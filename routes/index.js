import { Router } from 'express'
import { tallyProfileTotalPoints, tallyQueensTotalPoints } from '../middleware/middleware.js'
import { Profile } from "../models/profile.js"

const router = Router()

router.get('/', function (req, res) {
  Profile.findById(req.user?.profile.id)
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
    console.log('here', profile);
    // tallyQueensTotalPoints(profile.team)
    // tallyProfileTotalPoints(profile)
    // profile.sort(function(a, b) {return b.totalPoints - a.totalPoints})
    res.render('index', {
      title: 'Home Page',
      profile
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
