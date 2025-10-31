// import axios from 'axios';
// import { graphqlRequest } from '../graphql-client';

// // Mock the entire axios module
// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('graphql-client', () => {
//     const mockPost = jest.fn();

//     beforeEach(() => {
//         jest.clearAllMocks();

//         // Mock axios.create to return an object with a post method
//         mockedAxios.create = jest.fn(() => ({
//             post: mockPost
//         } as any));
//     });

//     test('should create axios instance with correct baseURL', () => {
//         // Just verify axios.create was called with right config
//         expect(mockedAxios.create).toHaveBeenCalledWith({
//             baseURL: 'http://localhost:8896',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     });

//     test('should call post with correct parameters', async () => {
//         // Setup
//         mockPost.mockResolvedValue({ data: { data: { test: 'data' } } });

//         // Call the function
//         await graphqlRequest('query { test }');

//         // Verify post was called correctly
//         expect(mockPost).toHaveBeenCalledWith('/graphql', {
//             query: 'query { test }',
//             variables: undefined,
//         });
//     });

//     test('should pass variables when provided', async () => {
//         // Setup
//         mockPost.mockResolvedValue({ data: { data: { test: 'data' } } });
//         const variables = { id: 1 };

//         // Call the function
//         await graphqlRequest('query { test }', variables);

//         // Verify variables were passed
//         expect(mockPost).toHaveBeenCalledWith('/graphql', {
//             query: 'query { test }',
//             variables: { id: 1 },
//         });
//     });

//     test('should return data from response', async () => {
//         // Setup
//         const expectedData = { users: ['user1', 'user2'] };
//         mockPost.mockResolvedValue({ data: { data: expectedData } });

//         // Call and verify
//         const result = await graphqlRequest('query { users }');
//         expect(result).toEqual(expectedData);
//     });

//     test('should throw error when response has errors', async () => {
//         // Setup
//         mockPost.mockResolvedValue({
//             data: {
//                 errors: [{ message: 'Something went wrong' }]
//             }
//         });

//         // Verify it throws
//         await expect(graphqlRequest('query { test }')).rejects.toThrow('Something went wrong');
//     });
// });
