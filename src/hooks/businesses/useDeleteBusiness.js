import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAxios } from '../../services';

const deleteBusiness = async (businessId) => {
    const result = await useAxios({
        method: 'delete',
        url: `/business/${businessId}`,
    });

    return result;
};

export const useDeleteBusiness = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (businessId) => deleteBusiness(businessId),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries()
            },
        }
    );
};