<<<<<<< HEAD
const express = require('express')
const { createRequest, getNearbyMechanics } = require('../controllers/requestController')
const router = express.Router()

router.post('/', createRequest)
router.get('/nearby-mechanics', getNearbyMechanics)

module.exports = router
=======
const router=require('express').Router();const c=require('../controllers/requestController');const{protect}=require('../middleware/auth');
router.get('/',c.listRequests);router.get('/mine',protect,c.myRequests);router.get('/provider',protect,c.providerRequests);router.get('/nearby-providers',c.nearbyProviders);router.post('/',protect,c.createRequest);router.get('/:id',c.getRequest);router.post('/:id/accept',protect,c.acceptRequest);router.patch('/:id/status',protect,c.updateStatus);router.delete('/:id',protect,c.deleteRequest);module.exports=router;
>>>>>>> e015e11 (first commit)
