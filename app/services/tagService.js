/* eslint-disable prettier/prettier */
import axios from 'axios';

import { baseUrl } from "@/config";

const tagBaseUrl = `${baseUrl}/tag/rest`;

export const getAllTags = async () => {
 
    try {
        const response = await axios.get(`${tagBaseUrl}/getAll`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des tags :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};



