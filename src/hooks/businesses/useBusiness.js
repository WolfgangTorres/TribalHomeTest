import { useQuery } from 'react-query';
import { useAxios } from '../../services';

/** Gets business by ID
 * 
 * @param {String} businessId 
 * @returns {Object} Axios Response Data
 */
const fetchBusiness = async (businessId) => {
    const { data } = await useAxios({
        method: 'get',
        url: `/business/${businessId}`,
    });

    return data;
};

export const useBusiness = (businessId) => useQuery(
    ['businesses', businessId],
    () => fetchBusiness(businessId)
);