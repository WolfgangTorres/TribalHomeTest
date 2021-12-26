import { useQuery } from 'react-query';
import { useAxios } from '../../services';

const fetchPerson = async (personId, businessId) => {
    const { data } = await useAxios({
        method: 'get',
        url: `/business/${businessId}/persons/${personId}`,
    });

    return data;
};

export const usePerson = (personId, businessId) => useQuery(
    ['businesses', businessId, 'persons', personId],
    () => fetchPerson(personId, businessId)
);