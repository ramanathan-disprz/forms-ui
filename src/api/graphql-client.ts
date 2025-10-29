import axios, { AxiosError } from 'axios';

const graphqlClient = axios.create({
    baseURL: 'http://localhost:8896',
    headers: {
        'Content-Type': 'application/json',
    },
});

/*
graphqlClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
*/

export const graphqlRequest = async <T = any>(
    query: string,
    variables?: any
): Promise<T> => {
    try {
        const response = await graphqlClient.post('/graphql', {
            query,
            variables,
        });

        if (response.data.errors && response.data.errors.length > 0) {
            const errorMessage = response.data.errors
                .map((e: any) => e.message)
                .join(', ');
            throw new Error(errorMessage);
        }
        return response.data.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        }
        throw error;
    }
};
