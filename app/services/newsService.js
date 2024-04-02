/* eslint-disable prettier/prettier */
import axios from 'axios';

import { baseUrl } from "@/config";

const newsBaseUrl = `${baseUrl}/news/rest`;

export const getAllNews = async () => {
 
    try {
        const response = await axios.get(`${newsBaseUrl}/getAllNews`);
        return response.data;
    } catch (error) {
       
        console.error('Erreur lors de la récupération des news :', error);
        //throw error; 
    }
};

export const getAllAnnouncement = async () => {
    try {
        const response = await axios.get(`${newsBaseUrl}/getAllAnnouncement`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des newss :', error);
        //throw error; 
    }
}



