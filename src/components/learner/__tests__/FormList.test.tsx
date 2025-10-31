import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FormList from '../FormList';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn()
}));

// Mock the API hook
jest.mock('../../../api/forms/useForms', () => ({
    useForms: () => ({
        data: [],
        isLoading: false
    })
}));

describe('FormList', () => {
    test('renders without crashing', () => {
        const { container } = render(<FormList />);
        expect(container).toBeTruthy();
    });
});
