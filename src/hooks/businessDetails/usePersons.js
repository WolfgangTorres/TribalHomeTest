import { useQuery } from 'react-query';
import { useAxios } from '../../services';

const fetchPersons = async (businessId) => {
    const { data } = await useAxios({
        method: 'get',
        url: `/business/${businessId}/persons`,
    });

    return data;
};

export const usePersons = (businessId) => useQuery('persons', () => fetchPersons(businessId));