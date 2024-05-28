//import env variable
require('dotenv').config()

const express = require("express");
const app = express();
const os = require('os')


//importing models 
const mongoose = require("mongoose");
const CompteModel = require('./models/Compte.js');
const EtudiantModel = require('./models/Etudiant.js');
const ModuleModel = require('./models/Module.js');
const NoteModel = require('./models/Note.js');
const SpécialitéModel = require('./models/Spécialité.js');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
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
    const networkInterfaces = os.networkInterfaces();
    //fancy listen detailed msg shenanigans the bot made :
    const addresses = Object.keys(networkInterfaces).reduce((acc, interfaceName) => {
        const interfaceAddresses = networkInterfaces[interfaceName]
            .filter(iface => iface.family === 'IPv4' && !iface.internal)
            .map(iface => iface.address);
        return acc.concat(interfaceAddresses);
    }, []);
    // Log the server startup messages
    console.log('Server is running:');
    //since running on port 3001
    console.log('  Local:    http://localhost:3001');
     // Log network addresses
     addresses.forEach(address => {
        console.log(`  Network:  http://${address}:3001`);
    });

     // Once connected to MongoDB, log a success message
     mongoose.connection.once('open', () => {
        console.log(`Connected to MongoDB at ${process.env.MONGODB_URI}`);
    });
});

//basic CRUD tests
app.get('/testInsert',async(req,res) =>{
    try{
        //create test doc for compte model
        const testCompte = new CompteModel({login:'test',password:'test'})
        //save test doc to db
        await testCompte.save();
        //respond with success msg and the added doc
        res.json({message:'test doc inserted successfully',document:testCompte})
    }
    catch(err){
        //respond w error 500 bcs db unatainable or sum idk
        res.status(500).json({error : 'Failed to insert test document 😟🥺🥺'})
    }
})

app.get('/testFetch',async(req,res) => {
    try {
        //fetch all doc
        const comptes = await CompteModel.find({});
        //res w success and fetched docs
        res.json({message:'yippy docs fetched succssfully woohoo atchiwaywaywa',documents : comptes});

    }
    catch(err){
        res.status(500).json({error : 'Failed fetching les docus 😢😢😥😥😭😭😓'})
    }
})
/**
 * endpoint qui supprime tte la db
 */
app.delete('/resetDb',async(req,res) => {
    try {
        await CompteModel.deleteMany({});
        await EtudiantModel.deleteMany({});
        await ModuleModel.deleteMany({});
        await NoteModel.deleteMany({});
        await SpécialitéModel.deleteMany({});
        res.json({ message: 'Database reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset database' });
    }
})


// Endpoint to seed Compte data
app.post('/seedCompte', async (req, res) => {
    try {
        const comptes = [
            { login: 'user1', password: 'pass1' },
            { login: 'user2', password: 'pass2' },
            { login: 'user3', password: 'pass3' }
        ];

        await CompteModel.insertMany(comptes);
        res.json({ message: 'Comptes seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to seed Comptes' });
    }
});




//endpoint to seed specialite of students 
app.post('/seedSpecialite', async (req, res) => {
    try {
        const specialites = [
            { nom: 'Specialite1'},
            { nom: 'Specialite2'},
            { nom: 'Specialite3'}
        ];

        await SpécialitéModel.insertMany(specialites);
        res.json({ message: 'Specialites seeded successfully' });
    } catch (error) {
        res.status(500).json({ err: 'Failed to seed Specialites' , errObj : error});
    }
});





// Endpoint to seed Etudiant data
app.post('/seedEtudiant', async (req, res) => {
    //some logs to keep track of wtf is going on:
    console.log('POST /seedEtudiant called');
    try {

        console.log('Seeding etudiant data...');

        // Fetch Compte and Specialite documents to get their ObjectIds
        const compte1 = await CompteModel.findOne({ login: 'user1' });
        console.log("retrieved comtpe1");
        const compte2 = await CompteModel.findOne({ login: 'user2' });
        console.log("retrieved comtpe2");
        const compte3 = await CompteModel.findOne({ login: 'user3' });
        console.log("retrieved comtpe3");

        
        console.log("retrieved compte1,2,3 now fetching specialites")
        const specialite1 = await SpécialitéModel.findOne({ name: 'Specialite1' });
        console.log("retrieved specialite1");
        const specialite2 = await SpécialitéModel.findOne({ name: 'Specialite2' });
        console.log("retrieved specialite2");
        const specialite3 = await SpécialitéModel.findOne({ name: 'Specialite3' });
        console.log("retrieved specialite3");
        console.log("fetched all specialites and comptes now seeding etudiants")
        // Ensure the fetched documents exist
        if (!compte1 || !compte2 || !compte3 || !specialite1 || !specialite2 || !specialite3) {
            return res.status(500).json({ error: 'Required seed data not found in database' });
        }

        // Seed Etudiant data using actual ObjectIds sinn c la merde
        const etudiants = [
            { matricule: 'E001', nom: 'Smith', prenom: 'John', compte_id: compte1._id, spécialité: specialite1._id },
            { matricule: 'E002', nom: 'Doe', prenom: 'Jane', compte_id: compte2._id, spécialité: specialite2._id },
            { matricule: 'E003', nom: 'Brown', prenom: 'Mike', compte_id: compte3._id, spécialité: specialite3._id }
        ];
        await EtudiantModel.insertMany(etudiants);
        console.log("Etudiants seeded successfully wooohooo  ATCHIWAYWAYWA CHAMPIOOOONEEEE");
    } catch (err) {
        res.status(500).json({ error: 'Failed to seed Etudiants' , errBody : err});
    }
});