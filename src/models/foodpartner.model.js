const mongoose = require('mongoose');
const foodPartnerSchema = new mongoose.Schema(
    {
        businessName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        contactNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        cuisineType:{
            type: String,
            required: true
        },
        
        password: {
            type: String,
            required: true
        }

    })
const foodPartnerModel = mongoose.model('foodPartner', foodPartnerSchema);
module.exports = foodPartnerModel;
