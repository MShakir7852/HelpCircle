const mongoose = require('mongoose')

const mechanicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  serviceTypes: [{ type: String, required: true, trim: true }],
  categories: [{ type: String, required: true, trim: true }],
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  serviceRadiusMeters: { type: Number, default: 15000, min: 500, max: 100000 },
  location: {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: { type: [Number], required: true }, // GeoJSON order: [longitude, latitude]
  },
}, { timestamps: true })

mechanicSchema.index({ location: '2dsphere' })
mechanicSchema.index({ serviceTypes: 1, isActive: 1 })
module.exports = mongoose.model('Mechanic', mechanicSchema)
