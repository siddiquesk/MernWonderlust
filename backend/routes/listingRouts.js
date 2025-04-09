const express = require('express');
const router = express.Router();
const listingController = require("../controllers/listingController");
const listingSchema=require("../middleware/zodValidation");
const validation = require("../middleware/valiadtion");
router.route('/listings').get(listingController.getListings);
router.route('/listings/:id').get(listingController.showListings);
router.route('/listings').post(validation(listingSchema.listingSchema),listingController.createListings);
router.route('/listings/:id').put(validation(listingSchema.listingSchema),listingController.EditListings);
router.route('/listings/:id').delete(listingController.deleteListing);

module.exports = router;

