import mongoose from 'mongoose'

const Schema = mongoose.Schema

const episodeSchema = new Schema({
  number: String,
  title: String,
  pointEvents: [{type: Schema.Types.ObjectId, ref: "Event", default: []}]
})

const queenSchema = new Schema({
  name: {
    type: String,
    enum: [
      'Amethyst',
      'Anetra',
      'Aura Mayari',
      'Irene Dubois',
      'Jax',
      'Loosey LaDuca',
      'Luxx Noir London',
      'Malaysia Babydoll Foxx',
      'Marcia Marcia Marcia',
      'Mistress Isabelle Brooks',
      'Princess Poppy',
      'Robin Fierce',
      'Salina EsTitties',
      'Sasha Colby',
      'Spice',
      'Sugar',
    ]
  },
  hometown: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "Profile" },
  eliminated: Boolean,
  episodes: [episodeSchema],
  totalPoints: Number,
}, {
  timestamps: true
})

const Queen = mongoose.model('Queen', queenSchema)

export {
  Queen
}
