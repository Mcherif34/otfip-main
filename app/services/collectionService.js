/* eslint-disable prettier/prettier */
import axios from 'axios';

import { baseUrl } from "@/config";

const collectionBaseUrl = `${baseUrl}/collection/rest`;

export const getAllCollections = async () => {
 
    try {
        const response = await axios.get(`${collectionBaseUrl}/getAll`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des collections :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};



