import { Profile } from "../models/profile.js"
import { Queen } from "../models/queen.js"
import { tallyQueensTotalPoints } from "../middleware/middleware.js"

function home(req, res) {
  if (req.user) {
    Profile.findById(req.user.profile.id)
    .then(profile => {
      console.log('XXXX', profile);
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
}

export {
  home
}