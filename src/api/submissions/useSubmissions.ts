import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlRequest } from "../graphql-client"
import { INDEX_ALL_SUBMISSIONS_BY_FORM_ID, SUBMIT_FORM } from "./queries";
import toast from 'react-hot-toast';
import { FormSubmissionRequest } from "../../features/submission/Submission";

export const useSubmitForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (submissionRequest: FormSubmissionRequest) => {
            const response = await graphqlRequest(SUBMIT_FORM, {
                request: submissionRequest
            });
            return response.submitForm;
        },
        onSuccess: (data) => {
            toast.success('Form submitted successfully!');
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
            queryClient.invalidateQueries({ queryKey: ['form-submissions', data.formId] });
            queryClient.invalidateQueries({ queryKey: ['user-submissions', data.userId] });
            return data;
        },
        onError: (error) => {
            console.error('Error submitting form:', error);
            toast.error('Failed to submit form. Please try again.');
        }
    });
};

export const useFormSubmissions = (formId: string) => {
    return useQuery({
        queryKey: ['form-submissions', formId],
        queryFn: async () => {
            const response = await graphqlRequest(INDEX_ALL_SUBMISSIONS_BY_FORM_ID, { formId });
            return response.indexFormSubmissionByFormId;
        },
        enabled: !!formId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
