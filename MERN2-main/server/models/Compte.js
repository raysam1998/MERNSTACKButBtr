const mongoose = require("mongoose");

const CompteSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
       
    },
});

const CompteModel = mongoose.model("Compte",CompteSchema, "Compte");
module.exports = CompteModel;