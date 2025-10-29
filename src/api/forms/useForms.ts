import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlRequest } from "../graphql-client"
import { INDEX_FORMS, CREATE_FORM, DELETE_FORM } from "./queries";
import toast from 'react-hot-toast';
import { FormRequest } from "../../features/forms/Form";

export const useForms = () => {
    return useQuery({
        queryKey: ['forms'],
        queryFn: async () => {
            const response = await graphqlRequest(INDEX_FORMS);
            console.log(response)
            return response.indexForms;
        },
        refetchOnWindowFocus: false,
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