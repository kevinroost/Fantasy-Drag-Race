import { Queen } from "../models/queen.js"
import { Event } from "../models/event.js"


function index(req, res) {
  Queen.find({})
  .then(queens => {
    // const total = queens.pointEvents.reduce((prev, event) => {
    //   prev + event.points
    // }, 0) 
    res.render('queens', {
      queens: queens,
      title: "All Queens",
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
    res.redirect('/queens')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function edit(req, res) {
  Queen.findById(req.params.id)
  .populate('pointEvents')
  .then(queen => {
    Event.find({})
    .then(events => {
      res.render(`queens/edit`, {
        events: events,
        queen: queen,
        title: 'Update Queen'
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
}

function update(req, res) {
  req.body.eliminated = !!req.body.eliminated
  console.log(req.body.eliminated);
  Queen.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(queen => {
    res.redirect(`/queens`)
    console.log(queen);
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function addEvent(req, res) {
  Queen.findById(req.params.id)
  .then(queen => {
    queen.pointEvents.push(req.body.event)
    Event.findById(req.body.event)
    .then(event => {
      queen.totalPoints += event.points
      queen.save()
      res.redirect(`/queens/${queen._id}/edit`)
    })
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
  edit,
  update,
  addEvent,
}