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
  Event.create(req.body)
  res.redirect('/events')
}

function deleteEvent(req, res) {
  Event.findByIdAndDelete(req.params.id)
  .then(events => {
    res.redirect('/events')
  })
}

export {
  index,
  create,
  deleteEvent as delete,
}