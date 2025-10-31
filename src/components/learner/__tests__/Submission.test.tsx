import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Submission from '../Submission';

// Mock the hook
jest.mock('../../features/forms/useFormStates', () => ({
    useGetFormState: () => ({
        title: 'Test Form',
        description: 'Test Description',
        questions: []
    })
}));

describe('SubmissionView', () => {
    const mockSubmission = {
        answers: []
    };

    test('renders without crashing', () => {
        const { container } = render(
            <Submission
            />
        );
        expect(container).toBeTruthy();
    });
});
