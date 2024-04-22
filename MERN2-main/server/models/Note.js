const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    etd_id: {
        type: String,
        required: true,
    },
    notes: {
        type: Array,
        required: true,
       
    },
});

const NoteModel = mongoose.model("Note",NoteSchema, "Note");
module.exports = NoteModel;