import mongoose from 'mongoose'
import { tallyProfileTotalPoints } from '../middleware/middleware.js'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  team: [{ type: Schema.Types.ObjectId, ref: "Queen" }],
  totalPoints: Number
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
