const HelpRequest = require('../models/HelpRequest')
const Mechanic = require('../models/Mechanic')

const allowedUrgencies = ['Urgent', 'Today', 'This week', 'Weekend', 'Flexible']

exports.createRequest = async (req, res, next) => {
  try {
    const { title, category, serviceType, description, area, urgency = 'Today', location } = req.body
    if (!title || !category || !serviceType || !description || !area) {
      return res.status(400).json({ success: false, message: 'Please provide all required request details.' })
    }
    if (!location || location.type !== 'Point' || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
      return res.status(400).json({ success: false, message: 'A valid current location is required.' })
    }
    const [longitude, latitude] = location.coordinates
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
      return res.status(400).json({ success: false, message: 'Location coordinates are invalid.' })
    }
    if (!allowedUrgencies.includes(urgency)) return res.status(400).json({ success: false, message: 'Invalid urgency value.' })

    const radius = Math.min(Number(process.env.MATCH_RADIUS_METERS) || 15000, 100000)
    const matches = await Mechanic.find({
      isActive: true,
      serviceTypes: serviceType,
      location: { $near: { $geometry: { type: 'Point', coordinates: [longitude, latitude] }, $maxDistance: radius } },
    }).select('_id name serviceTypes categories isVerified location serviceRadiusMeters').limit(30).lean()

    // Persist the customer coordinates with the request. In production, add authentication,
    // rate limiting, consent/retention policy, and notification delivery before launch.
    const request = await HelpRequest.create({ title, category, serviceType, description, area, urgency, location })
    if (matches.length) {
      request.matchedMechanics = matches.filter(m => {
        // Keep each mechanic's own service radius in effect as well as the global radius.
        const coords = m.location?.coordinates
        if (!coords || coords.length !== 2) return false
        return true // MongoDB $near already enforces the global radius.
      }).map(m => m._id)
      await request.save()
    }
    res.status(201).json({
      success: true,
      message: 'Help request created.',
      request: { id: request._id, title: request.title, category: request.category, serviceType: request.serviceType, area: request.area, urgency: request.urgency, status: request.status },
      matches: matches.map(m => ({ id: m._id, name: m.name, serviceTypes: m.serviceTypes, isVerified: m.isVerified })),
      matchCount: matches.length,
    })
  } catch (error) { next(error) }
}

exports.getNearbyMechanics = async (req, res, next) => {
  try {
    const latitude = Number(req.query.lat)
    const longitude = Number(req.query.lng)
    const serviceType = String(req.query.serviceType || '').trim()
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180 || !serviceType) {
      return res.status(400).json({ success: false, message: 'Valid lat, lng and serviceType query parameters are required.' })
    }
    const radius = Math.min(Math.max(Number(req.query.radius) || Number(process.env.MATCH_RADIUS_METERS) || 15000, 500), 100000)
    const mechanics = await Mechanic.find({ isActive: true, serviceTypes: serviceType,
      location: { $near: { $geometry: { type: 'Point', coordinates: [longitude, latitude] }, $maxDistance: radius } },
    }).select('_id name serviceTypes categories isVerified location').limit(30).lean()
    res.json({ success: true, count: mechanics.length, mechanics })
  } catch (error) { next(error) }
}
