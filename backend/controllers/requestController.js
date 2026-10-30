<<<<<<< HEAD
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
=======
const HelpRequest=require('../models/HelpRequest');const User=require('../models/User');
const urgencies=['Urgent','Today','This week','Weekend','Flexible'];
const escapeRegex=value=>String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const distance=(a,b)=>{const R=6371000,rad=x=>x*Math.PI/180;const dLat=rad(b[1]-a[1]),dLon=rad(b[0]-a[0]);const x=Math.sin(dLat/2)**2+Math.cos(rad(a[1]))*Math.cos(rad(b[1]))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(x))};
exports.createRequest=async(req,res,next)=>{try{const{title,category,serviceType,description,area,urgency='Today',location}=req.body;if(!title||!category||!serviceType||!description||!area)return res.status(400).json({success:false,message:'Please complete all required fields.'});if(!urgencies.includes(urgency))return res.status(400).json({success:false,message:'Invalid urgency.'});if(location?.type!=='Point'||!Array.isArray(location.coordinates)||location.coordinates.length!==2)return res.status(400).json({success:false,message:'Please share a valid current location.'});const[ lng,lat ]=location.coordinates;if(!Number.isFinite(lng)||!Number.isFinite(lat)||Math.abs(lng)>180||Math.abs(lat)>90)return res.status(400).json({success:false,message:'Invalid location coordinates.'});const radius=Math.min(100000,Number(process.env.MATCH_RADIUS_METERS)||15000);const candidates=await User.find({role:'provider','provider.isAvailable':true,'provider.serviceTypes':serviceType,'provider.location':{$near:{$geometry:{type:'Point',coordinates:[lng,lat]},$maxDistance:radius}}}).select('_id provider').limit(50).lean();const matches=candidates.filter(p=>p.provider?.location?.coordinates&&distance([lng,lat],p.provider.location.coordinates)<=Math.min(radius,p.provider.serviceRadiusMeters||15000)).map(p=>p._id);const request=await HelpRequest.create({title,category,serviceType,description,area,urgency,location,requester:req.user._id,matchedProviders:matches});const populated=await request.populate('requester','name avatar');res.status(201).json({success:true,message:'Your help request has been published.',request:populated,matchesCount:matches.length})}catch(e){next(e)}};
exports.listRequests=async(req,res,next)=>{try{const{q,category,urgency,area,status='Open',page=1,limit=12}=req.query;const filter={};if(status!=='All')filter.status=status;if(category&&category!=='All categories')filter.category=category;if(urgency&&urgency!=='Any time')filter.urgency=urgency;if(area)filter.area={$regex:escapeRegex(area),$options:'i'};if(q)filter.$or=[{title:{$regex:escapeRegex(q),$options:'i'}},{description:{$regex:escapeRegex(q),$options:'i'}},{serviceType:{$regex:escapeRegex(q),$options:'i'}},{category:{$regex:escapeRegex(q),$options:'i'}},{area:{$regex:escapeRegex(q),$options:'i'}}];const p=Math.max(1,Number(page)||1),l=Math.min(50,Math.max(1,Number(limit)||12));const[requests,total]=await Promise.all([HelpRequest.find(filter).select('-location').populate('requester','name avatar').populate('acceptedBy','name avatar').sort({createdAt:-1}).skip((p-1)*l).limit(l),HelpRequest.countDocuments(filter)]);res.json({success:true,requests,pagination:{page:p,limit:l,total,pages:Math.ceil(total/l)}})}catch(e){next(e)}};
exports.getRequest=async(req,res,next)=>{try{const request=await HelpRequest.findById(req.params.id).select('-location').populate('requester','name avatar').populate('acceptedBy','name avatar');if(!request)return res.status(404).json({success:false,message:'Request not found.'});res.json({success:true,request})}catch(e){next(e)}};
exports.myRequests=async(req,res,next)=>{try{const requests=await HelpRequest.find({requester:req.user._id}).populate('acceptedBy','name avatar phone').sort({createdAt:-1});res.json({success:true,requests})}catch(e){next(e)}};
exports.providerRequests=async(req,res,next)=>{try{const requests=await HelpRequest.find({$or:[{matchedProviders:req.user._id},{acceptedBy:req.user._id}]}).populate('requester','name avatar phone').sort({createdAt:-1});res.json({success:true,requests})}catch(e){next(e)}};
exports.acceptRequest=async(req,res,next)=>{try{if(req.user.role!=='provider')return res.status(403).json({success:false,message:'Only service providers can accept requests.'});const request=await HelpRequest.findOneAndUpdate({_id:req.params.id,status:'Open',matchedProviders:req.user._id},{$set:{status:'Accepted',acceptedBy:req.user._id}},{new:true}).populate('requester','name avatar phone').populate('acceptedBy','name avatar phone');if(!request)return res.status(409).json({success:false,message:'This request is unavailable or you are not a matched provider.'});res.json({success:true,message:'Request accepted.',request})}catch(e){next(e)}};
exports.updateStatus=async(req,res,next)=>{try{const{status}=req.body;if(!['In progress','Completed','Cancelled'].includes(status))return res.status(400).json({success:false,message:'Invalid status transition.'});const request=await HelpRequest.findById(req.params.id);if(!request)return res.status(404).json({success:false,message:'Request not found.'});const owner=request.requester.toString()===req.user._id.toString(),provider=request.acceptedBy?.toString()===req.user._id.toString();if(!owner&&!provider&&req.user.role!=='admin')return res.status(403).json({success:false,message:'You cannot update this request.'});if(status==='In progress'&&!provider&&req.user.role!=='admin')return res.status(403).json({success:false,message:'Only the assigned provider can start work.'});if(status==='Completed'&&!owner&&req.user.role!=='admin')return res.status(403).json({success:false,message:'Only the requester can confirm completion.'});if(status==='Cancelled'&&!owner&&req.user.role!=='admin')return res.status(403).json({success:false,message:'Only the requester can cancel this request.'});if(status==='In progress'&&request.status!=='Accepted'||status==='Completed'&&request.status!=='In progress'||status==='Cancelled'&&!['Open','Accepted'].includes(request.status))return res.status(409).json({success:false,message:`Cannot change ${request.status} to ${status}.`});request.status=status;await request.save();res.json({success:true,message:`Request marked ${status.toLowerCase()}.`,request})}catch(e){next(e)}};
exports.deleteRequest=async(req,res,next)=>{try{const request=await HelpRequest.findById(req.params.id);if(!request)return res.status(404).json({success:false,message:'Request not found.'});if(request.requester.toString()!==req.user._id.toString()&&req.user.role!=='admin')return res.status(403).json({success:false,message:'You cannot delete this request.'});if(!['Open','Cancelled'].includes(request.status))return res.status(409).json({success:false,message:'Only open or cancelled requests can be deleted.'});await request.deleteOne();res.json({success:true,message:'Request deleted.'})}catch(e){next(e)}};
exports.nearbyProviders=async(req,res,next)=>{try{const lat=Number(req.query.lat),lng=Number(req.query.lng),serviceType=String(req.query.serviceType||'');if(!Number.isFinite(lat)||!Number.isFinite(lng)||!serviceType)return res.status(400).json({success:false,message:'lat, lng and serviceType are required.'});const radius=Math.min(100000,Math.max(500,Number(req.query.radius)||15000));const providers=await User.find({role:'provider','provider.isAvailable':true,'provider.serviceTypes':serviceType,'provider.location':{$near:{$geometry:{type:'Point',coordinates:[lng,lat]},$maxDistance:radius}}}).select('name avatar provider').limit(30).lean();res.json({success:true,providers:providers.filter(p=>distance([lng,lat],p.provider.location.coordinates)<=Math.min(radius,p.provider.serviceRadiusMeters||15000)).map(p=>({id:p._id,name:p.name,avatar:p.avatar,serviceTypes:p.provider.serviceTypes,isVerified:p.provider.isVerified,distanceMeters:Math.round(distance([lng,lat],p.provider.location.coordinates))}))})}catch(e){next(e)}};
>>>>>>> e015e11 (first commit)
