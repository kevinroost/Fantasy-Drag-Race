import { Queen } from "../models/queen.js"
import { Profile } from "../models/profile.js"


function index(req, res) {
  Queen.find({})
  .then(queens => {
    res.render('queens', {
      queens: queens,
      title: "All Queens"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function newQueen(req, res) {
  res.render('queens/new', {
      title: "New Queen",
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.createdBy = req.user.profile._id
  req.body.eliminated = false
  Queen.create(req.body)
  .then(queens => {
    console.log(queens);
    res.redirect('/queens')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  newQueen as new,
  create,
  index,
}