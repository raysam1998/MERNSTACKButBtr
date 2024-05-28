const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
});

const ModuleModel = mongoose.model("Module",ModuleSchema, "Module");
module.exports = ModuleModel;