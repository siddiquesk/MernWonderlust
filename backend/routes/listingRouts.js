const express = require('express');
const router = express.Router();
const listingController = require("../controllers/listingController");

router.route('/listings').get(listingController.getListings);
router.route('/listings/:id').get(listingController.showListings);
router.route('/listings').post(listingController.createListings);
router.route('/listings/:id').put(listingController.EditListings);
router.route('/listings/:id').delete(listingController.deleteListing);

module.exports = router;

