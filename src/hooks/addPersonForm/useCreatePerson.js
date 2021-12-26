import { useMutation, useQueryClient } from 'react-query';
import { useAxios } from '../../services';

const createPerson = async (personData, businessId) => {
    const result = await useAxios({
        method: 'post',
        url: `/business/${businessId}/persons`,
        data: personData,
    });

    return result;
};

export const useCreatePerson = (businessId) => {
    const queryClient = useQueryClient();

    return useMutation(
        (personData) => createPerson(personData, businessId),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries(['businesses', businessId, 'persons'])
            },
        }
    );
};