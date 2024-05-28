const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    etd_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true
    },
    notes: {
        type: Array,
        required: true,
       
    },
});

const NoteModel = mongoose.model("Note",NoteSchema, "Note");
module.exports = NoteModel;