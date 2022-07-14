// Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/reviews.model');
const { User } = require('../models/user.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

exports.getAllRestaurants = catchAsync(async (req, res, next) => {
	const restaurants = await Restaurant.findAll({
		where: { status: 'active' },
		include: { model: Review }

	});

	res.status(200).json({
		status: 'success',
		data: { restaurants },
	});
});

exports.getRestaurantById = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findOne({
		where: {
			id:id,
			status: 'active' },
		include: { model: Review }
	});

	if (!restaurant) {
		return res.status(404).json({
			status: "error",
			message: "Restaurant not found",
		});
	}

	res.status(200).json({
		status: 'success',
		data: { restaurant },
	});
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
	const { name, address, rating } = req.body;

	const newRestaurant = await Restaurant.create({
		name,
		address,
		rating
	});

	res.status(201).json({
		status: 'success',
		newRestaurant,
	});
});

exports.createRestaurantReview = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const { restaurantId } = req.params;
	const { comment, rating } = req.body;

	const newReview = await Review.create({
		restaurantId:restaurantId,
		userId:userId,
		comment,
		rating
	});

	res.status(201).json({
		status: 'success',
		newReview,
	});
});

exports.updateRestaurantReview = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const { review } = req;
	const { comment, rating } = req.body;
	const mreview = await Review.findOne({
		where:{
			id:review.id
		}
	})
	if(!mreview){
		return res.status(404).json({
			status: "error",
			message: "Review not found",
		});
	}

	if(userId === mreview.userId){
		await review.update({ comment, rating });
		res.status(204).json({ status: 'success' });
	} else {
		res.status(401).json({ status: 'Unauthorized' });
	}
});


exports.updateRestaurant = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const user = await User.findOne({
		where:{
			id:userId
		}
	});
	if( user.role !== 'admin'){
		res.status(401).json({ status: 'Unauthorized' });
	} else{
		const { restaurant } = req;
		const { name, address } = req.body;

		await restaurant.update({ name, address });

		res.status(204).json({ status: 'success' });
	}

});

exports.deleteReview = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const {review} = req
	const mreview = await Review.findOne({
		where:{id:review.restaurantId}
	});
	if( userId !== mreview.userId){
		res.status(401).json({ status: 'Unauthorized' });
	} else {
		await review.update({status: 'deleted'});
		res.status(204).json({status: 'success'});
	}
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id

	const user = await User.findOne({
		where:{id:userId}
	});

	if( user.role !== 'admin'){
		res.status(401).json({ status: 'Unauthorized' });
	} else{
		const { restaurant } = req;


		await restaurant.update({ status: 'deleted' });

		res.status(204).json({ status: 'success' });
	}
});
