const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model'); // added
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );

    res.cookie('token', token);

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );

    res.cookie('token', token);

    res.status(200).json({
        message: 'Login successful',
        token,
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
}

async function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

async function registerFoodPartner(req, res) {
    const { businessName, email,contactNumber,address,cuisineType, password } = req.body;

    const isPartnerAlreadyExists = await userModel.findOne({ email });
    if (isPartnerAlreadyExists) {
        return res.status(400).json({ message: 'Partner already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // added

    const foodPartner = await foodPartnerModel.create({
        businessName,


        email,
        contactNumber,
        address,
        cuisineType,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: foodPartner._id },
        process.env.JWT_SECRET
    );

    res.cookie('token', token);

    res.status(201).json({
        message: 'Food partner registered successfully',
        foodPartner: {
            _id: foodPartner._id,
            businessName: foodPartner.businessName,
            email: foodPartner.email,
            contactNumber: foodPartner.contactNumber,
            address: foodPartner.address,
            cuisineType: foodPartner.cuisineType
        }
    });
}
async function loginFoodPartner(req,res){
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: foodPartner._id },
        process.env.JWT_SECRET
    );

    res.cookie('token', token);

    res.status(200).json({
        message: ' food partner Login successful',
        foodPartner: {
            _id: foodPartner._id,
            businessName: foodPartner.businessName,
            email: foodPartner.email
        }
    });
}
async function logoutFoodPartner(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: ' food partner Logout successful' });
}

async function getFoodPartnerById(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: 'Partner id required' });
    const partner = await foodPartnerModel.findById(id).select('-password');
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.status(200).json({ partner });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};
// export helper looked-up function
module.exports.getFoodPartnerById = getFoodPartnerById;
