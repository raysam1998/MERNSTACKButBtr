const mongoose = require("mongoose");

const SpécialitéSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
});

const SpécialitéModel = mongoose.model("Spécialité",SpécialitéSchema, "Spécialité");
module.exports = SpécialitéModel;