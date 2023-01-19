import { Event } from "../models/event.js"

function index(req, res) {
  Event.find({})
  .then(events => {
    res.render('events', {
      title: "New Event",
      events: events
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.approved = false
  Event.create(req.body)
  res.redirect('/events')
}

function deleteEvent(req, res) {
  Event.findByIdAndDelete(req.params.id)
  .then(events => {
    res.redirect('/events')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function approve(req, res) {
  Event.findById(req.params.id)
  .then(event => {
    event.approved = true
    event.save()
    res.redirect('/events')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index,
  create,
  deleteEvent as delete,
  approve,
}