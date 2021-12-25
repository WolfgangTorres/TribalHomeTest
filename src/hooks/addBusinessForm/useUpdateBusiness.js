import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAxios } from '../../services';

const updateBusiness = async (businessId, name) => {
    const result = await useAxios({
        method: 'put',
        url: `/business/${businessId}`,
        data: { name }
    });

    return result;
};

export const useUpdateBusiness = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ businessId, name }) => updateBusiness(businessId, name),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries()
            },
        }
    );
};