import { useQueryClient } from '@tanstack/react-query';
import { FormSubmissionDetail } from './Submission';

// Hook to set/update form state
export const useSetFormSubmissionState = () => {
    const queryClient = useQueryClient();

    return (formData: FormSubmissionDetail) => {
        queryClient.setQueryData(['currentFormSubmission'], formData);
    };
};

// Hook to get the current form from cache
export const useGetFormSubmissionState = (): FormSubmissionDetail | undefined => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData<FormSubmissionDetail>(['currentFormSubmission']);
};
