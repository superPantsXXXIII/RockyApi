const express = require("express");
const { RockModel, validateRock } = require("../models/rockModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {

    let perPage = 10;
    let page = req.query.page > 0 ? req.query.page - 1 : 0 || 0;

    try {
        let data = await RockModel.find({}, { date_created: 0, user_id: 0, __v: 0 }).limit(perPage).skip(page * perPage);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/single/:id", async (req, res) => {
    try {
        let data = await RockModel.findOne({_id: req.params.id}, { date_created: 0, user_id: 0, __v: 0 });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/search", async (req, res) => {
    let query = req.query.s;
    let searchExp = new RegExp(query, "i");
    let perPage = 10;
    let page = req.query.page > 0 ? req.query.page - 1 : 0 || 0;

    try {
        let data = await RockModel.find({ $or: [{ name: searchExp }, { info: searchExp }] }, { date_created: 0, user_id: 0, __v: 0 }).limit(perPage).skip(page * perPage);
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err });
    }
})

router.get("/category/:catName", async (req, res) =>{
    let perPage = 10;
    let page = req.query.page > 0 ? req.query.page - 1 : 0 || 0;


    try {
        let data = await RockModel.find({category:req.params.catName}, { date_created: 0, user_id: 0, __v: 0 }).limit(perPage).skip(page * perPage);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/priceRange", async (req, res) =>{
    let perPage = 10;
    let page = req.query.page > 0 ? req.query.page - 1 : 0 || 0;
    let min = req.query.min || 0;
    let max = req.query.max || 99999;


    try {
        let data = await RockModel.find({price:{$gte: min, $lte: max}}, { date_created: 0, user_id: 0, __v: 0 }).limit(perPage).skip(page * perPage);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.post("/", auth, async (req, res) => {
    let validBody = validateRock(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let rock = new RockModel(req.body);
        rock.user_id = req.tokenData._id;
        await rock.save();
        res.json(rock)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.put("/:id", auth, async (req, res) => {
    let validBody = validateRock(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let id = req.params.id;
        let data = await RockModel.updateOne({ _id: id, user_id: req.tokenData._id }, req.body);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        let id = req.params.id;
        let data = await RockModel.deleteOne({ _id: id, user_id: req.tokenData._id });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

module.exports = router;