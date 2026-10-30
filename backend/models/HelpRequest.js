<<<<<<< HEAD
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
=======
const mongoose=require('mongoose');
const schema=new mongoose.Schema({
 title:{type:String,required:true,trim:true,minlength:8,maxlength:100},
 category:{type:String,required:true,trim:true},serviceType:{type:String,required:true,trim:true},
 description:{type:String,required:true,trim:true,minlength:20,maxlength:1200},
 area:{type:String,required:true,trim:true,maxlength:120},
 urgency:{type:String,enum:['Urgent','Today','This week','Weekend','Flexible'],default:'Today'},
 location:{type:{type:String,enum:['Point'],required:true,default:'Point'},coordinates:{type:[Number],required:true}},
 requester:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 acceptedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},
 status:{type:String,enum:['Open','Accepted','In progress','Completed','Cancelled'],default:'Open'},
 matchedProviders:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
 responses:[{provider:{type:mongoose.Schema.Types.ObjectId,ref:'User'},message:{type:String,trim:true,maxlength:500},createdAt:{type:Date,default:Date.now}}]
},{timestamps:true});
schema.index({location:'2dsphere'});schema.index({status:1,category:1,createdAt:-1});
module.exports=mongoose.model('HelpRequest',schema);
>>>>>>> e015e11 (first commit)
