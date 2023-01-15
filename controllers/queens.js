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
  .then(queen => {
    for (let i = 0; i < queen.episodes.length; i++) {
      queen.populate(`episodes.${i}.pointEvents`)
    }
    Event.find({})
    .then(events => {
      res.render(`queens/edit`, {
        queen: queen,
        events: events,
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
  Queen.findById(req.params.queenId)
  .then(queen => {
    console.log(queen.episodes.id(req.params.episodeId));
    queen.episodes.id(req.params.episodeId).pointEvents.push(req.body.selectedEvent)
    queen.save()
    res.redirect(`/queens/${queen._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createEpisode(req, res) {
  Queen.find({})
  .then(queens => {
    queens.forEach(q => {
      q.episodes.push(req.body)
      q.save()
    })
    Queen.findById(req.params.id)
    .then(queen => {
      res.redirect(`/queens/${queen._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteEpisode(req, res) {
  Queen.findById(req.params.queenId)
  .then(queen => {
    let id = req.params.episodeId
    queen.episodes.id(id).remove()
    queen.save()
    .then(episode => {
      res.redirect(`/queens/${queen.id}`)
    })
    .catch(err => {
      console.log('ERROR', err)
      res.redirect(`/queens/${queen.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/queens/${queen.id}`)
  })
}

export {
  newQueen as new,
  create,
  createEpisode,
  index,
  edit,
  update,
  addEvent,
  deleteEpisode as delete,
}