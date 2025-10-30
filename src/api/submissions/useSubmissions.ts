import { useMutation, useQueryClient } from "@tanstack/react-query"
import { graphqlRequest } from "../graphql-client"
import { SUBMIT_FORM } from "./queries";
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
