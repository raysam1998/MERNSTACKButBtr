export class Etudiant {
    matricule: string;
    nom: string;
    prenom: string;
    compte_id: string;  // Assuming ObjectId is represented as a string
    spécialité: string;  // Assuming ObjectId is represented as a string

  constructor(matricule: string, nom: string, prenom: string, compte_id: string, spécialité: string) {
    this.matricule = matricule;
    this.nom = nom;
    this.prenom = prenom;
    this.compte_id = compte_id;
    this.spécialité = spécialité;
  }
}