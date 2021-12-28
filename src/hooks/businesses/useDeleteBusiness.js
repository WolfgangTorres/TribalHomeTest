import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAxios } from '../../services';

/** Deletes a business
 * 
 * @param {String} businessId 
 * @returns {Object} Axios Response
 */
const deleteBusiness = async (businessId) => {
    const result = await useAxios({
        method: 'delete',
        url: `/business/${businessId}`,
    });

    return result;
};

const deleteBusinessMutationFunction = async ({ businessId, getPersonMutation, deletePersonMutation }) => {
    let success = false;
    let error = null
    try {
        const { persons } = await getPersonMutation.mutateAsync(businessId);

        if (persons?.length === 0) { success = true; }

        for (let index = 0; index < persons.length; index++) {
            const person = persons[index];

            const { status } = await deletePersonMutation.mutateAsync({ personId: person?.personId, businessId: businessId });
            success = status === 200;
        }

    } catch (error) {
        throw new Error(error);
    }

    if (success && error === null) {
        return deleteBusiness(businessId);
    } else {
        throw new Error(error);
    }
};

export const useDeleteBusiness = () => {
    const queryClient = useQueryClient();

    return useMutation(
        deleteBusinessMutationFunction,
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries()
            },
        }
    );
};