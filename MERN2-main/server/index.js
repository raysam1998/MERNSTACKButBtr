const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CompteModel = require('./models/Compte.js');
const EtudiantModel = require('./models/Etudiant.js');
const ModuleModel = require('./models/Module.js');
const NoteModel = require('./models/Note.js');
const SpécialitéModel = require('./models/Spécialité.js');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/ecole', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/getCompte", (req, res) => {
     CompteModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
     });
});

app.get("/getEtudiant", (req, res) => {
    EtudiantModel.find({}, (err, result) => {
       if (err) {
           res.json(err);
       } else {
           res.json(result);
       }
    });
});

app.get("/getModule", (req, res) => {
    ModuleModel.find({}, (err, result) => {
       if (err) {
           res.json(err);
       } else {
           res.json(result);
       }
    });
});

app.get("/getNote", (req, res) => {
    NoteModel.find({}, (err, result) => {
       if (err) {
           res.json(err);
       } else {
           res.json(result);
       }
    });
});

app.get("/getSpecialite", (req, res) => {
    SpécialitéModel.find({}, (err, result) => {
       if (err) {
           res.json(err);
       } else {
           res.json(result);
       }
    });
});



app.post("/createCompte", async (req, res) => {
    const Compte = req.body
    const newCompte = new CompteModel(Compte);
    await newCompte.save();
    res.json(Compte)

});


app.post("/createEtudiant", async (req, res) => {
    const { matricule, nom, prenom, compte_id, spécialité } = req.body;

    try {
        const newEtudiant = new EtudiantModel({
            matricule,
            nom,
            prenom,
            compte_id: mongoose.Types.ObjectId(compte_id), // Convert to ObjectId
            spécialité: mongoose.Types.ObjectId(spécialité), // Convert to ObjectId
        });

        await newEtudiant.save();
        res.json(newEtudiant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Etudiant' });
    }
});



app.post("/createModule", async (req, res) => {
    const Module = req.body
    const newModule = new ModuleModel(Module);
    await newModule.save();
    res.json(Module)

});

app.post("/createNote", async (req, res) => {
    const Note = req.body
    const newNote = new NoteModel(Note);
    await newNote.save();
    res.json(Note)

});


app.post("/createSpecialite", async (req, res) => {
    const Specialite = req.body
    const newSpecialite = new SpécialitéModel(Specialite);
    await newSpecialite.save();
    res.json(Specialite)

});


app.put("/updateCompte/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body;
        const updatedCompte = await CompteModel.findByIdAndUpdate(id, updatedData, {
            new: true, 
        });

        if (!updatedCompte) {
            return res.status(404).json({ error: 'Compte not found' });
        }

        res.json(updatedCompte); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to update compte' });
    }
});



app.put("/updateModule/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body;
        const updatedModule = await ModuleModel.findByIdAndUpdate(id, updatedData, {
            new: true, 
        });

        if (!updatedModule) {
            return res.status(404).json({ error: 'Module not found' });
        }

        res.json(updatedModule); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Module' });
    }
});



app.put("/updateSpécialité/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body;
        const updatedSpécialité = await SpécialitéModel.findByIdAndUpdate(id, updatedData, {
            new: true, 
        });

        if (!updatedSpécialité) {
            return res.status(404).json({ error: 'Spécialité not found' });
        }

        res.json(updatedNote); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Spécialité' });
    }
});





app.put("/updateEtudiant/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body;
        
        // Convert id to a mongoose.Types.ObjectId
        const etudiantId = mongoose.Types.ObjectId(id);

        const updatedEtudiant = await EtudiantModel.findByIdAndUpdate(etudiantId, updatedData, {
            new: true, 
        });

        if (!updatedEtudiant) {
            return res.status(404).json({ error: 'Etudiant not found' });
        }

        res.json(updatedEtudiant); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Etudiant' });
    }
});




app.put("/updateNote/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL parameter
        const updatedData = req.body; // Data received from the client

        // Find the document by ID and update it
        const updatedNote = await NoteModel.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
        });

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(updatedNote); // Respond with the updated document
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
});


app.delete("/deleteCompte/:login", async (req, res) => {
    try {
        const { login } = req.params;
        const result = await CompteModel.findOneAndDelete({ login });

        if (!result) {
            return res.status(404).json({ message: "Compte not found" });
        }

        return res.status(200).json({ message: "Compte deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});




app.delete("/deleteEtudiant/:matricule", async (req, res) => {
    try {
      const { matricule } = req.params;
      const result = await EtudiantModel.findOneAndDelete({ matricule });
  
      if (!result) {
        return res.status(404).json({ message: "Etudiant not found" });
      }
  
      return res.status(200).json({ message: "Etudiant deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  


app.delete("/deleteModule/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ModuleModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Module not found" });
        }

        return res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});


app.delete("/deleteNote/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await NoteModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});



app.delete("/deleteSpecialite/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await SpécialitéModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Spécialité not found" });
        }

        return res.status(200).json({ message: "Spécialité deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});





app.listen(3001, () => {
    console.log("Works");
});