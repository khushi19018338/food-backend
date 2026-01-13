require('dotenv').config();
const connectDB = require('../src/db/db');
const mongoose = require('mongoose');
const FoodPartner = require('../src/models/foodpartner.model');
const Food = require('../src/models/food.model');

async function main() {
  connectDB();
  // wait for mongoose connection
  await new Promise((res) => setTimeout(res, 1000));

  // create partner if missing
  let partner = await FoodPartner.findOne({ email: 'smoke.partner@example.com' });
  if (!partner) {
    partner = await FoodPartner.create({
      businessName: 'Smoke Partner',
      email: 'smoke.partner@example.com',
      contactNumber: '+10000000000',
      address: '123 Smoke St',
      cuisineType: 'Test',
      password: 'hashed' // not used for this seed
    });
    console.log('Created partner', partner._id.toString());
  } else {
    console.log('Partner exists', partner._id.toString());
  }

  // create a food item for partner if missing
  let food = await Food.findOne({ name: 'Smoke Test Food', foodPartner: partner._id });
  if (!food) {
    food = await Food.create({
      name: 'Smoke Test Food',
      description: 'Test description',
      video: 'https://example.com/video.mp4',
      foodPartner: partner._id
    });
    console.log('Created food', food._id.toString());
  } else {
    console.log('Food exists', food._id.toString());
  }

  // helper for fetch with cookie handling
  const base = 'http://localhost:3000';
  const fetch = global.fetch || require('node-fetch');

  // register a user
  console.log('Registering user...');
  const regRes = await fetch(base + '/api/auth/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'Smoke User', email: 'smoke.user@example.com', password: 'password' })
  });
  const regText = await regRes.text();
  console.log('Register response:', regRes.status, regText.substring(0, 200));
  const setCookie = regRes.headers.get('set-cookie');
  const cookie = setCookie ? setCookie.split(';')[0] : null;
  console.log('Captured cookie:', cookie);

  // fetch partner info (public)
  console.log('Fetching partner info (public)...');
  const pinfo = await fetch(base + `/api/auth/food-partner/${partner._id}`);
  console.log('Partner info status:', pinfo.status);
  console.log(await pinfo.text());

  // fetch partner foods (requires auth) using captured cookie
  console.log('Fetching partner foods (auth)...');
  const foodsRes = await fetch(base + `/api/food/partner/${partner._id}`, {
    headers: { Cookie: cookie }
  });
  console.log('Foods status:', foodsRes.status);
  console.log(await foodsRes.text());

  // place an order (requires auth)
  console.log('Placing order...');
  const orderRes = await fetch(base + '/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ foodId: food._id, partnerId: partner._id, quantity: 2, address: '1 Test Ave' })
  });
  console.log('Order status:', orderRes.status);
  console.log(await orderRes.text());

  // cleanup and exit
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
