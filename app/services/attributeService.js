/* eslint-disable prettier/prettier */
import axios from 'axios';

import { baseUrl } from "@/config";

const attributeBaseUrl = `${baseUrl}/attribute/rest`;

export const getAllAttributes = async () => {
    try {
        const response = await axios.get(`${attributeBaseUrl}/getAll`);
        if (!response.data) {
            throw new Error('La réponse ne contient pas de données');
        }
        
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des attributs :', error.message);
        throw error;
    }
};


export const getAllAttributesNames = async (dataId, year) => {

    const dataYear = year || new Date().getFullYear();
    // console.log(dataId, dataYear);
 
    try {
        const response = await axios.get(`${attributeBaseUrl}/getAllAttributeName/${dataId}/${dataYear}`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des attributes :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};

export const getAllXAxisAttribute = async (dataId, year) => {

    const dataYear = year || new Date().getFullYear();
    // console.log(dataId, dataYear);
 
    try {
        const response = await axios.get(`${attributeBaseUrl}/getAllXAxisAttribute/${dataId}/${dataYear}`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des attributes :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};


export const getAllYAxisAttribute = async (dataId, year) => {

    const dataYear = year || new Date().getFullYear();
    // console.log(dataId, dataYear);
 
    try {
        const response = await axios.get(`${attributeBaseUrl}/getAllYAxisAttribute/${dataId}/${dataYear}`);
        return response.data;
    } catch (error) {
        // Gérer les erreurs ici (par exemple, enregistrer dans un journal, afficher un message d'erreur, etc.)
        console.error('Erreur lors de la récupération des attributes :', error);
        //throw error; // Vous pouvez choisir de lancer l'erreur pour la gérer plus haut dans l'application si nécessaire.
    }
};



