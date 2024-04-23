import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'; // Import Router components


function App() {
  const [noteIdToDelete, setNoteIdToDelete] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [etudiantId, setEtudiantId] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [message, setMessage] = useState('');
  const [compteId, setCompteId] = useState('');
  const [listOfComptes, setListOfComptes] = useState([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [listOfNotes, setListOfNotes] = useState([]);
  const [noteValue, setNoteValue] = useState('');
  const [module_id, setModule_id] = useState('');
  const [listOfEtudiants, setListOfEtudiants] = useState([]);
  const [matricule, setMatricule] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [compte_id, setCompte_id] = useState('');
  const [spécialité, setSpécialité] = useState('');
  const [moduleNames, setModuleNames] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const isObjectId = (value) => {
    const strippedValue = value.replace(/["']/g, ''); // Remove quotes if present
    return /^[0-9a-fA-F]{24}$/.test(strippedValue);
  };
  
  useEffect(() => {
    Axios.get('http://localhost:3001/getCompte').then((response) => {
      setListOfComptes(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/getEtudiant').
    then((response) => {
      setListOfEtudiants(response.data);
    });
  }, []);

  const fetchNotes = () => {
    Axios.get('http://localhost:3001/getNote')
      .then((response) => {
        setListOfNotes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Notes:', error);
      });
  };

  const createCompte = () => {
    Axios.post('http://localhost:3001/createCompte', {
      login,
      password,
    }).then((response) => {
      alert('COMPTE CREATED');
    });
  };

  const deleteCompte = () => {
    Axios.delete(`http://localhost:3001/deleteCompte/${login}`)
      .then((response) => {
        alert('COMPTE DELETED');
      })
      .catch((error) => {
        console.error('Error deleting Compte:', error);
        // Handle the error or display an error message as needed
      });
  };

  const deleteEtudiant = (matricule) => {
    Axios.delete(`http://localhost:3001/deleteEtudiant/${matricule}`)
      .then((response) => {
        alert('Etudiant DELETED');
      })
      .catch((error) => {
        console.error('Error deleting Etudiant:', error);
        // Handle the error or display an error message as needed
      });
  };
  const createEtudiant = () => {
    // Validate that compte_id and spécialité are valid ObjectId strings
    if (!isObjectId(compte_id) || !isObjectId(spécialité)) {
      alert('Invalid ObjectId format for compte_id or spécialitéee');
      return;
    }
  
    // Prepare the etudiantData object
    const etudiantData = {
      matricule,
      nom,
      prenom,
      compte_id,
      spécialité,
    };
  
    Axios.post('http://localhost:3001/createEtudiant', etudiantData)
      .then((response) => {
        alert('ETUDIANT CREATED');
        // Optionally, you can clear the input fields after successful creation
        setMatricule('');
        setNom('');
        setPrenom('');
        setCompte_id('');
        setSpécialité('');
      })
      .catch((error) => {
        console.error('Error creating Etudiant:', error);
        // Display the error message or handle it accordingly
      });
  };
  const createNote = () => {
    if (!noteValue || !compte_id || !module_id) {
      alert('Please fill in all fields.');
      return;
    }

    Axios.post('http://localhost:3001/createNote', {
      etd_id: compte_id,
      notes: [
        {
          note: noteValue,
          module_id: module_id,
        },
      ],
    })
      .then((response) => {
        alert('NOTE CREATED');
        fetchNotes();
        setNoteValue('');
        setCompte_id('');
        setModule_id('');
      })
      .catch((error) => {
        console.error('Error creating Note:', error);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  

  useEffect(() => {
    // Fetch the etudiant details by etudiantId
    Axios.get(`http://localhost:3001/getEtudiantById/${etudiantId}`)
      .then((response) => {
        const etudiant = response.data;
        // Populate the form fields with etudiant details
        setMatricule(etudiant.matricule);
        setNom(etudiant.nom);
        setPrenom(etudiant.prenom);
        setCompte_id(etudiant.compte_id);
        setSpécialité(etudiant.spécialité);
      })
      .catch((error) => {
        console.error('Error fetching Etudiant:', error);
      });
  }, [etudiantId]);
  
  const updateEtudiant = () => {
    // Validate that compte_id and spécialité are valid ObjectId strings
    if (!isObjectId(compte_id) || !isObjectId(spécialité)) {
      alert('Invalid ObjectId format for compte_id or spécialité');
      return;
    }

    // Prepare the etudiantData object
    const etudiantData = {
      matricule,
      nom,
      prenom,
      compte_id,
      spécialité,
    };

    Axios.put(`http://localhost:3001/updateEtudiant/${etudiantId}`, etudiantData)
      .then((response) => {
        alert('Etudiant UPDATED');
        // Optionally, you can clear the input fields after successful update
        setMatricule('');
        setNom('');
        setPrenom('');
        setCompte_id('');
        setSpécialité('');
      })
      .catch((error) => {
        console.error('Error updating Etudiant:', error);
        // Handle the error or display an error message as needed
      });
  };

useEffect(() => {
  Axios.get('http://localhost:3001/getModule')
    .then((response) => {
      const moduleData = response.data;
      const moduleNamesMap = {};

      // Create a mapping of module IDs to module names
      moduleData.forEach((module) => {
        moduleNamesMap[module._id] = module.nom;
      });

      setModuleNames(moduleNamesMap);
    })
    .catch((error) => {
      console.error('Error fetching Module Names:', error);
    });
}, []);

const deleteNoteById = () => {
  // Validate noteIdToDelete
  if (!noteIdToDelete) {
    setDeleteMessage('Please enter a valid Note ID.');
    return;
  }

  // Make a DELETE request to your API
  Axios.delete(`http://localhost:3001/deleteNote/${noteIdToDelete}`)
    .then((response) => {
      // Check if the delete was successful
      if (response.status === 200) {
        setDeleteMessage('Note deleted successfully');
        // Update the UI or state as needed, e.g., remove the deleted note from listOfNotes
        // You can fetch updated data if necessary
        fetchNotes();
      } else {
        setDeleteMessage('Failed to delete note');
      }
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
      setDeleteMessage('Error deleting note');
    });
  };


  

  return (
    <div className="App">
  {/* Create Compte */}
  <div>
    <h1>Create Compte</h1>
    <input
      type="text"
      placeholder="Login..."
      onChange={(event) => {
        setLogin(event.target.value);
      }}
    />
    <input
      type="text"
      placeholder="Password..."
      onChange={(event) => {
        setPassword(event.target.value);
      }}
    />
    <button onClick={createCompte}>Create Compte</button>
  </div>

  {/* Delete Compte */}
  <div>
    <h1>Delete Compte</h1>
    <input
      type="text"
      placeholder="Login..."
      onChange={(event) => {
        setLogin(event.target.value);
      }}
    />
    <button onClick={deleteCompte}>Delete Compte</button>
  </div>

  {/* Display Compte list */}
  <div>
    <h1>Compte List</h1>
    <ul>
      {listOfComptes.map((compte) => (
        <li key={compte._id}>
          <p>Login: {compte.login}, Password: {compte.password}</p>
        </li>
      ))}
    </ul>
  </div>

  {/* Create Etudiant */}
  <div>
    <h1>Create Etudiant</h1>
    <input
      type="number"
      placeholder="Matricule..."
      onChange={(event) => {
        setMatricule(event.target.value);
      }}
    />
    <input
      type="text"
      placeholder="Nom..."
      onChange={(event) => {
        setNom(event.target.value);
      }}
    />
    <input
      type="text"
      placeholder="Prenom..."
      onChange={(event) => {
        setPrenom(event.target.value);
      }}
    />
    <input
      type="text"
      placeholder="Compte_id..."
      onChange={(event) => {
        setCompte_id(event.target.value);
      }}
    />
    <input
      type="text"
      placeholder="Spécialité_id..."
      onChange={(event) => {
        setSpécialité(event.target.value);
      }}
    />
    <button onClick={createEtudiant}>Create Etudiant</button>
  </div>

  {/* Delete Etudiant */}
  <div>
    <h1>Delete Etudiant</h1>
    <input
      type="text"
      placeholder="Matricule..."
      onChange={(event) => {
        setMatricule(event.target.value);
      }}
    />
    <button onClick={() => deleteEtudiant(matricule)}>Delete Etudiant</button>
  </div>

  <div>
  <h1>Etudiant List</h1>
  <ul>
    {listOfEtudiants.map((etudiant) => (
      <li key={etudiant.matricule}>
        Matricule: {etudiant.matricule}, Nom: {etudiant.nom}, Prenom: {etudiant.prenom}
      </li>
    ))}
  </ul>
</div>
  <div>
    <h1>Etudiant List</h1>
    <ul>
    </ul>
  </div>

  {/* Create Note */}
  <div>
    <h1>Create Note</h1>
    <input
      type="text"
      placeholder="Note Value"
      value={noteValue}
      onChange={(e) => setNoteValue(e.target.value)}
    />
    <input
      type="text"
      placeholder="Compte ID"
      value={compte_id}
      onChange={(e) => setCompte_id(e.target.value)}
    />
    <input
      type="text"
      placeholder="Module ID"
      value={module_id}
      onChange={(e) => setModule_id(e.target.value)}
    />
    <button onClick={createNote}>Create Note</button>
  </div>

  {/* Delete Note */}
  <div>
    <h1>Delete Note by ID</h1>
    <div>
      <label htmlFor="noteIdToDelete">Note ID:</label>
      <input
        type="text"
        id="noteIdToDelete"
        value={noteIdToDelete}
        onChange={(e) => setNoteIdToDelete(e.target.value)}
      />
    </div>
    <button onClick={deleteNoteById}>Delete Note</button>
    {deleteMessage && <p>{deleteMessage}</p>}
  </div>

  {/* Display Note list */}
  <div>
    <h1>Note List</h1>
    <ul>
    <div>
  <h1>Note List</h1>
  <ul>
    {listOfNotes.map((noteDoc) => (
      <li key={noteDoc._id}>
        <p>User/Student ID: {noteDoc.etd_id}</p>
        <ul>
          {noteDoc.notes.map((note) => (
            <li key={note.module_id}>
              Note: {note.note}, Module Name: {moduleNames[note.module_id] || 'Module Name Not Found'}
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
</div>
    </ul>
  </div>
</div>
  );
}

export default App;



