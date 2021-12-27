import { useMutation, useQueryClient } from 'react-query';
import { useAxios } from '../../services';

/** Deletes a person from the business
 * 
 * @param {String} personId 
 * @param {String} businessId 
 * @returns {Object} Axios Response
 */
const deletePerson = async (personId, businessId) => {
    const result = await useAxios({
        method: 'delete',
        url: `/business/${businessId}/persons/${personId}`,
    });

    return result;
};

export const useDeletePerson = (businessId) => {
    const queryClient = useQueryClient();

    return useMutation(
        (personId) => deletePerson(personId, businessId),
        {
            onSuccess: (data, variables, context) => {
                queryClient.setQueryData(['businesses', businessId, 'persons'], ({ persons }) => {
                    return { persons: persons?.filter(person => person.personId !== variables) };
                });
            },
        }
    );
};