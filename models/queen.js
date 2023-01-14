import mongoose from 'mongoose'

const Schema = mongoose.Schema



const queenSchema = new Schema({
  name: String,
  hometown: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "Profile" },
  eliminated: Boolean,
  pointEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  totalPoints: { type: Number, default: 0}
}, {
  timestamps: true
})

const Queen = mongoose.model('Queen', queenSchema)

export {
  Queen
}
