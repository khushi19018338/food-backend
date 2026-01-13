const express = require('express');
const router = express.Router();
const multer = require('multer');

const foodController = require('../src/controllers/food.controller');
const authMiddleware = require('../src/middlewares/auth.middleware');

const upload = multer({ storage: multer.memoryStorage() });

// ✅ CREATE FOOD (ONLY PARTNER)
router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single('video'),
  foodController.createFood
);

// ✅ GET ALL FOODS (PUBLIC)
router.get(
  '/',
  foodController.getFoodItems
);

// ✅ GET PARTNER FOODS (PUBLIC)
router.get(
  '/partner/:id',
  foodController.getFoodsByPartner
);

module.exports = router;
