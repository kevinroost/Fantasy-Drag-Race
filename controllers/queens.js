import { Queen } from "../models/queen.js"
import { Event } from "../models/event.js"
import { Profile } from "../models/profile.js"
import { tallyProfileTotalPoints, tallyQueensTotalPoints } from "../middleware/middleware.js"


function index(req, res) {
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
    Profile.findById(req.user?.profile._id)
    .then(profile => {
      tallyQueensTotalPoints(queens)
      res.render('queens', {
        profile,
        queens: queens,
        title: "All Queens",
        user: req.user,
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
  .populate('episodes.pointEvents')
  .then(queen => {
    Event.find({})
    .then(events => {
      res.render(`queens/edit`, {
        queen: queen,
        events: events,
        title: 'Update Queen'
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  req.body.eliminated = !!req.body.eliminated
  Queen.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(queen => {
    res.redirect(`/queens`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function addEvent(req, res) {
  Queen.findById(req.params.queenId)
  .populate()
  .then(queen => {
    queen.episodes.id(req.params.episodeId).pointEvents.push(req.body.selectedEvent)
    Event.findById(req.body.selectedEvent)
    .then(event => {
      queen.save()
      res.redirect(`/queens/${queen._id}`)
    })
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
      req.local.log('ERROR', err)
      res.redirect(`/queens/${queen.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/queens/${queen.id}`)
  })
}

function removeEvent(req, res) {
  Queen.findById(req.params.queenId)
  .then(queen => {
    let targetId = req.params.eventId
    queen.episodes.id(req.params.episodeId).pointEvents = queen.episodes.id(req.params.episodeId).pointEvents.filter(event => !String(event).includes(targetId))
    Event.findById(req.params.eventId)
    .then((event) => {
      queen.save()
      res.redirect(`/queens/${queen.id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/queens/${queen.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/queens`)
  })
}

function editEpisode(req, res) {
  Queen.findById(req.params.id)
  .then(queen => {
    res.render('queens/episodes', {
      queen: queen,
      title: "Edit Episodes"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/queens`)
  })
}

function updateEpisodes(req, res) {
  Queen.find({})
  .then(queens => {
    queens.forEach(q => {
      q.episodes.forEach((ep, index) => {
        ep.number = req.body.number[index]
        ep.title = req.body.title[index]
      });
      q.save()
    })
    res.redirect(`/queens/${req.params.id}`)
  })
}

function deleteQueen(req, res) {
  Queen.findById(req.params.id)
  .then(queen => {
    if (queen.createdBy.equals(req.user.profile._id)) {
      queen.delete()
      .then(()=> {
        res.redirect(`/queens`)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/queens')
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
  removeEvent,
  editEpisode,
  updateEpisodes,
  deleteQueen,
}