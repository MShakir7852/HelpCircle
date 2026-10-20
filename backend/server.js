const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const requestRoutes = require('./routes/requestRoutes')

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.get('/', (_req, res) => res.json({ success: true, message: 'HelpCircle API is running' }))
app.use('/api/requests', requestRoutes)
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' })
})

const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/helpcircle')
  .then(() => app.listen(PORT, () => console.log(`HelpCircle API running on port ${PORT}`)))
  .catch(error => { console.error('MongoDB connection failed:', error.message); process.exit(1) })
