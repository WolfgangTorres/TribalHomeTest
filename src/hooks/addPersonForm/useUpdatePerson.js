import { useMutation, useQueryClient } from 'react-query';
import { useAxios } from '../../services';

const updatePerson = async (personId, personData, businessId) => {
    const result = await useAxios({
        method: 'put',
        url: `/business/${businessId}/persons/${personId}`,
        data: personData,
    });

    return result;
};

export const useUpdatePerson = (businessId, personId) => {
    const queryClient = useQueryClient();

    return useMutation(
        (personData) => updatePerson(personId, personData, businessId),
        {
            onSuccess: ({ data }, variables, context) => {
                queryClient.setQueryData(['businesses', businessId, 'persons'], ({ persons }) => {
                    return { persons: persons.map(person => person.personId === data.personId ? { ...data, 'join_date': person.join_date } : person) };
                });
            },
        }
    );
};