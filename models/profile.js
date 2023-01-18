import mongoose from 'mongoose'
import { tallyQueensTotalPoints } from '../middleware/middleware'

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
