import { Event } from "../models/event.js"

function newEvent(req, res) {
  res.render('events/new', {
      title: "New Queen",
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  newEvent as new,
}