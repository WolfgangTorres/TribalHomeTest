import { useQuery } from 'react-query';
import { useAxios } from '../../src/services';

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