import { useQueryClient } from '@tanstack/react-query';

import { FormRequest } from './Form';

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
