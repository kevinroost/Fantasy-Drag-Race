// import { Taco } from "../models/taco.js"

function index(req, res) {
  res.render('profiles', {
    title: "My Team",
    user: req.user ? req.user : null
  })
  // Taco.find({})
  // .populate("owner")
  // .then(tacos => {
  //   res.render('tacos/index', {
  //     tacos,
  //     title: "🌮",
  //     user: req.user ? req.user : null
  //   })
  // })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index,

}