
const express=require('express');
const router=express.Router();
const reviewController=require('../controllers/reviewController');
const validation=require('../middleware/valiadtion');
const zodValidation=require("../middleware/zodValidation");
router.route('/listings/:id/reviews').post(validation(zodValidation.reviewSchema),reviewController.reviewPost);
router.route('/listings/:id/reviews').get(reviewController.getReviews);
router.route('/listings/:id/reviews/:reviewId').delete(reviewController.deleteReviews);

module.exports=router;