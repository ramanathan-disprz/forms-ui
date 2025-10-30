import { useQueryClient } from '@tanstack/react-query';

import { FormRequest, FormResponse } from './Form';

// Hook to set/update form state
export const useSetFormState = () => {
    const queryClient = useQueryClient();
    
    return (formData: FormRequest) => {
        queryClient.setQueryData(['currentForm'], formData);
    };
};

// Hook to get the current form from cache
export const useGetFormState = (): FormRequest | undefined => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData<FormRequest>(['currentForm']);
};

export const useGetAllFormsState = (): FormResponse[] | undefined => {
    const queryClient = useQueryClient();
    
    return queryClient.getQueryData<FormResponse[]>(['forms'])
};