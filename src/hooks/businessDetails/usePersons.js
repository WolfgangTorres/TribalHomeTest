import { useQuery } from 'react-query';
import { useAxios } from '../../services';

/** Gets persons from a business
 * 
 * @param {String} businessId 
 * @returns {Object} Axios Response Data
 */
const fetchPersons = async (businessId) => {
    const { data } = await useAxios({
        method: 'get',
        url: `/business/${businessId}/persons`,
    });

    return data;
};

export const usePersons = (businessId) => useQuery(
    ['businesses', businessId, 'persons'],
    () => fetchPersons(businessId)
);