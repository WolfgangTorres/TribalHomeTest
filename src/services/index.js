import Constants from 'expo-constants'
import axios from 'axios';

const baseUrl = Constants.manifest.extra.apiUrl;
const _headers = {
    'x-api-key': Constants.manifest.extra.apiKey,
    'Content-Type': 'application/json',
};

axios.defaults.baseURL = baseUrl;
axios.defaults.headers = _headers;

export const useAxios = async (axiosParams) => {
    const result = await axios.request(axiosParams);
    return result;
};