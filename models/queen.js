import mongoose from 'mongoose'

const Schema = mongoose.Schema

const queenSchema = new Schema({
  name: String,
  hometown: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "Profile" },
  eliminated: Boolean,
  totalPoints: [{ type: Schema.Types.ObjectId, ref: "Event" }],
}, {
  timestamps: true
})

const Queen = mongoose.model('Queen', queenSchema)

export {
  Queen
}
