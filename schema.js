const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    title: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required(),
    image: Joi.object({
        url: Joi.string().allow(null, ""),
        filename: Joi.string().allow(null, "")
    }).optional(),
    price: Joi.number().required().min(0),
    place: Joi.string().trim().min(1).required(),
    country: Joi.string().trim().min(1).required(),
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
});
