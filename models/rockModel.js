const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
    name: String,
    info: String,
    category: String,
    img_url: String,
    price: Number,
    date_created: {
        type: Date, default: Date.now
    },
    user_id: String
})

exports.RockModel = mongoose.model("rocks", schema);

exports.validateRock = (reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        info: Joi.string().min(2).max(150).required(),
        category: Joi.string().min(2).max(150).required(),
        img_url: Joi.string().min(2).max(500).allow(null,""),
        price: Joi.number().min(1).max(99999).required()
    })
    return joiSchema.validate(reqBody);
}