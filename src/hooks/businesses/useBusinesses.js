import { useQuery } from 'react-query';
import { useAxios } from '../../services';

const fetchBusinesses = async () => {
    const { data } = await useAxios({
        method: 'get',
        url: '/business',
    });

    return data;
};

export const useBusinesses = () => useQuery('businesses', fetchBusinesses);