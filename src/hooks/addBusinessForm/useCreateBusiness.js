import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAxios } from '../../services';

const createBusiness = async (businessName) => {
    const result = await useAxios({
        method: 'post',
        url: `/business`,
        data: { name: businessName },
    });

    return result;
};

export const useCreateBusiness = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (businessName) => createBusiness(businessName),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries()
            },
        }
    );
};