import React, { useEffect } from 'react';
import { useState } from "react"
import { Etudiant } from "../models/etudiant"
import { fetchEtudiants } from '../services/api';


const EtudiantList : React.FC = () => {
    //define state to hold the list of students
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [error, setError] = useState<string | null>(null);

    //use the use effect hook to fetch data when the compounent plugs in
    useEffect(() =>{
        const fetchData = async() => {
            try{
                //api call
                const response = await fetchEtudiants();
                setEtudiants(response.data);
            }
            catch(error : unknown)
            {
                if(error instanceof Error){
                    setError(error.message);
                }
                else{
                    setError("une erreur chelou occured");
                }
                console.error("erreur fetching etudiants",error)

            }
        };

        fetchData();
    },[])//empty dependency array fait en sorte that it runs only once (when it mounts)
    return(
        <div>
            <h2>List of Etudiants</h2>
            {/* show err in case err not null */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {etudiants.map((etudiant =>(
                    <li key={etudiant.matricule}>
                        {etudiant.nom} {etudiant.prenom}
                    </li>
                )))}
            </ul>
        </div>
    )
}


export default EtudiantList;

