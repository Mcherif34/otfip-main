/* eslint-disable prettier/prettier */
import axios from 'axios';

import { baseUrl } from "@/config";

const datasetBaseUrl = `${baseUrl}/dataset/rest`;
const dataBaseUrl = `${baseUrl}/data/rest`;
const metadataBaseUrl = `${baseUrl}/metadata/rest`;

export const getAllDatasets = async () => {
 
    try {
        const response = await axios.get(`${datasetBaseUrl}/getAll`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des datasets :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};

export const getAllDatas = async () => {

    try {
        const response = await axios.get(`${dataBaseUrl}/getAll`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des datasets :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};
export const getAllMetadatas = async () => {

    try {
        const response = await axios.get(`${metadataBaseUrl}/getAll`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des datasets :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};



