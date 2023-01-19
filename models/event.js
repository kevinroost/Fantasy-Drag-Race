import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  approved: Boolean,
}, {
  timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

export {
  Event
}
