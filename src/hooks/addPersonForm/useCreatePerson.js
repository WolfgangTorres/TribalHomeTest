import { useMutation, useQueryClient } from 'react-query';
import { useAxios } from '../../services';

/** Creates a person in a business
 * 
 * @param {Object} personData
 * @param {string} personData.email
 * @param {string} personData.name
 * @param {string} personData.phone
 * @param {string} personData.role
 * @param {string} personData.join_date
 * 
 * @param {String} businessId 
 * @returns {Object} Axios Response
 */
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