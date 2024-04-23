const mongoose = require("mongoose");

const EtudiantSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
       
    },
    prenom: {
        type: String,
        required: true,
       
    },
    compte_id: {
        type: mongoose.Types.ObjectId,
        required: true,
       
    },
    spécialité: {
        type: mongoose.Types.ObjectId,
        required: true,
       
    },
});

const EtudiantModel = mongoose.model("Etudiant",EtudiantSchema, "Etudiant");
module.exports = EtudiantModel;