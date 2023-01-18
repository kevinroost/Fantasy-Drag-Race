import { Queen } from "../models/queen.js"
import { Event } from "../models/event.js"

function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

function tallyProfileTotalPoints(profile) {
  profile.totalPoints = profile.team.reduce((prev, queen) => {return prev += queen.totalPoints}, 0)
}

function tallyQueensTotalPoints(queens) {
  queens.forEach(q => {
    if (q.episodes) {
      q.totalPoints = q.episodes.reduce((prev, ep) => {
        ep.pointEvents.forEach(pe => {
          prev += pe.points
        })
        return prev
      }, 0)
      console.log(q.totalPoints);
      q.episodes.forEach(episode => {console.log(episode.pointEvents)})
    }
  })
  return
}

export {
  passDataToView,
  isLoggedIn,
  tallyQueensTotalPoints,
  tallyProfileTotalPoints
}
