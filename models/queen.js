import mongoose from 'mongoose'

const Schema = mongoose.Schema

const episodeSchema = new Schema({
  number: Number,
  title: String,
  pointEvents: [{type: Schema.Types.ObjectId, ref: "Event", default: []}]
})

const queenSchema = new Schema({
  name: String,
  hometown: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "Profile" },
  eliminated: Boolean,
  episodes: [episodeSchema],
  totalPoints: Number
}, {
  timestamps: true
})

const Queen = mongoose.model('Queen', queenSchema)

export {
  Queen
}
