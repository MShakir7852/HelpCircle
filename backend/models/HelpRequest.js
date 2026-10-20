const mongoose = require('mongoose')

const helpRequestSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 8, maxlength: 100 },
  category: { type: String, required: true, trim: true },
  serviceType: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true, minlength: 20, maxlength: 1200 },
  area: { type: String, required: true, trim: true, maxlength: 120 },
  urgency: { type: String, enum: ['Urgent', 'Today', 'This week', 'Weekend', 'Flexible'], default: 'Today' },
  location: {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: { type: [Number], required: true }, // GeoJSON order: [longitude, latitude]
  },
  status: { type: String, enum: ['Open', 'Accepted', 'In progress', 'Completed', 'Cancelled'], default: 'Open' },
  matchedMechanics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic' }],
}, { timestamps: true })

helpRequestSchema.index({ location: '2dsphere' })
module.exports = mongoose.model('HelpRequest', helpRequestSchema)
