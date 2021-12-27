import Constants from 'expo-constants'
import axios from 'axios';

const baseUrl = Constants.manifest.extra.apiUrl;
const _headers = {
    'x-api-key': Constants.manifest.extra.apiKey,
    'Content-Type': 'application/json',
};

axios.defaults.baseURL = baseUrl;
axios.defaults.headers = _headers;

/**
 * 
 * @param {Object} axiosParams - Request configuration: https://axios-http.com/docs/req_config
 *  Main values used in the project
 * @param {string} axiosParams.method
 * @param {string} axiosParams.url
 * @param {object} axiosParams.data
 * 
 * @returns {Object} Axios Response
 */
export const useAxios = async (axiosParams) => {
    const result = await axios.request(axiosParams);
    return result;
};