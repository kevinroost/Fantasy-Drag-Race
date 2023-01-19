import { Profile } from "../models/profile.js"
import { Queen } from "../models/queen.js"
import { tallyQueensTotalPoints } from "../middleware/middleware.js"

function recruitQueen(req, res) {
  Profile.findById(req.user.profile.id)
  .then(profile => {
    Queen.findById(req.params.queenId)
    .then(queen => {
      profile.team.push(queen.id)
      profile.save()
      res.redirect('/queens')
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
}

function ranks(req, res) {
  Queen.find({})
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
    console.log('line 36', queens);
    Profile.find({})
    .populate({
      path: "team",
      populate: { path: "episodes.pointEvents"}})
    .then(profiles => {
      profiles.forEach(profile => {
        profile.populate(('team.episodes.pointEvents'))
        tallyQueensTotalPoints(profile.team) /* <---- call again here! */
        profile.totalPoints = profile.team.reduce((prev, queen) => {prev += queen.totalPoints; return prev}, 0)
      })
      profiles.sort(function(a, b) {return b.totalPoints - a.totalPoints})
      res.render('queens/rankings', {
        title: "Rankings",
        profiles
      })
    })
  })
}

export {
  recruitQueen,
  ranks
}