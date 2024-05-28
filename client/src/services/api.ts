import axios , { AxiosResponse} from 'axios';
import { Etudiant } from '../models/etudiant';


//create the api call obj
const api = axios.create({
    baseURL : 'http://localhost:3001',
});

export const fetchEtudiants =():Promise<AxiosResponse<Etudiant[]>> => api.get('/getEtudiant');

export const seedDatabase =():Promise<AxiosResponse<{success : boolean;message : string}>> => api.post('/seedAll');

export default api;