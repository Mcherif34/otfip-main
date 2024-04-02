/* eslint-disable prettier/prettier */
import axios from 'axios';

import { baseUrl } from "@/config";

const publicationBaseUrl = `${baseUrl}/publicationType/rest`;

export const getAllPublicationType = async () => {
 
    try {
        const response = await axios.get(`${publicationBaseUrl}/getAll`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des publications :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};


