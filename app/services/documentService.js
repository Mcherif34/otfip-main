/* eslint-disable prettier/prettier */
import axios from 'axios';

import { baseUrl } from "@/config";

const documentBaseUrl = `${baseUrl}/document/rest`;
const documentTypeBaseUrl = `${baseUrl}/documentType/rest`;

export const getAllDocuments = async () => {
 
    try {
        const response = await axios.get(`${documentBaseUrl}/getAll`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des documents :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};

export const getAllDocumentTypes = async () => {
 
    try {
        const response = await axios.get(`${documentTypeBaseUrl}/getAll`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des documents :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};

export const getAllDocumentVideos = async () => {

    try {
        const response = await axios.get(`${documentBaseUrl}/getAllVideoDocument/23`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des documents :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};



