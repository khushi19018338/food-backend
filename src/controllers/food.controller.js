const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {

    // ✅ validation MUST come first
    if (!req.file) {
        return res.status(400).json({
            message: 'Video file is required'
        });
    }

    const fileUploadResult = await storageService.uploadFile(
        req.file.buffer,
        uuid()
    );

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,   // ✅ MUST match schema
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({
        message: 'Food item created successfully',
        food: foodItem
    });
}
async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: 'Food items retrieved successfully',
        foodItems
    });
}

async function getFoodsByPartner(req, res) {
    const partnerId = req.params.id;
    if (!partnerId) {
        return res.status(400).json({ message: 'Partner id is required' });
    }
    const foodItems = await foodModel.find({ foodPartner: partnerId });
    res.status(200).json({
        message: 'Food items for partner retrieved successfully',
        foodItems
    });
}

module.exports = {
    createFood,
    getFoodItems,
    getFoodsByPartner
};

