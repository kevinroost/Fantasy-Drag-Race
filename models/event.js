import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: String,
  points: Number,
  approved: Boolean,
}, {
  timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

export {
  Event
}
