const express = require('express');
const router = express.Router();

const foodController = require('../src/controllers/food.controller');
const authMiddleware = require('../src/middlewares/auth.middleware');
const authFoodPartnerMiddleware = authMiddleware.authFoodPartnerMiddleware;
const authUserMiddleware = authMiddleware.authUserMiddleware;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single('video'),
  foodController.createFood
);

router.get(
  '/',
  authMiddleware.authUserMiddleware,
  foodController.getFoodItems
);

router.get(
  '/partner/:id',
  authMiddleware.authUserMiddleware,
  foodController.getFoodsByPartner
);

module.exports = router;
