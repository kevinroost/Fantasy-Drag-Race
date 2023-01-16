import { Profile } from "../models/profile.js"
import { Queen } from "../models/queen.js"

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

export {
  recruitQueen,
}