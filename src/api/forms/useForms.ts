import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlRequest } from "../graphql-client"
import {
    INDEX_FORMS,
    FETCH_FORM_WITH_QUESTIONS,
    CREATE_FORM,
    UPDATE_FORM,
    DELETE_FORM
} from "./queries";

import toast from 'react-hot-toast';
import { FormRequest, QuestionRequest } from "../../features/forms/Form";

export const useForms = () => {
    return useQuery({
        queryKey: ['forms'],
        queryFn: async () => {
            const response = await graphqlRequest(INDEX_FORMS);
            return response.indexForms;
        },
        refetchOnWindowFocus: false,
    });
};

export const useFormWithQuestions = (id: string) => {
    return useQuery({
        queryKey: ['form', id],
        queryFn: async () => {
            const response = await graphqlRequest(FETCH_FORM_WITH_QUESTIONS, { id });

            const { form, questions } = response.fetchFormWithQuestions;

            const formData: FormRequest = {
                ...form,
                questions: questions as QuestionRequest[]
            };

            return formData;
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormRequest) => {
            const response = await graphqlRequest(CREATE_FORM, { request: formData });
            return response.createForm;
        },
        onSuccess: (data) => {
            toast.success('Form created successfully!');
            queryClient.invalidateQueries({ queryKey: ['forms'] });
            return data;
        },
        onError: (error) => {
            console.error('Error creating form:', error);
            toast.error('Failed to create form');
        }
    });
};

export const useUpdateForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, formData }: { id: string; formData: FormRequest }) => {
            console.log('Calling updateForm mutation with:', {
                id,
                request: formData
            });
            
            const response = await graphqlRequest(UPDATE_FORM, {
                id,
                request: formData
            });
            return response.updateForm;
        },
        onSuccess: (data, variables) => {
            toast.success('Form updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['forms'] });
            queryClient.invalidateQueries({ queryKey: ['form', variables.id] });
            return data;
        },
        onError: (error) => {
            console.error('Error updating form:', error);
            toast.error('Failed to update form');
        }
    });
};

export const useDeleteForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await graphqlRequest(DELETE_FORM, { id });
            return response.deleteForm;
        },
        onSuccess: () => {
            toast.remove('Form deleted successfully!');
            queryClient.invalidateQueries({ queryKey: ['forms'] });
        },
        onError: (error) => {
            console.error('Error deleting form:', error);
        }
    });
};