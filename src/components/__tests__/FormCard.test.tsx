import { render, screen, fireEvent } from '@testing-library/react';
import FormCard from '../FormCard';

// Mock the router
jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

// Mock the API hook
jest.mock('../../api/forms/useForms', () => ({
    useDeleteForm: () => ({
        mutate: jest.fn(),
    }),
}));

describe('FormCard', () => {
    const defaultProps = {
        id: '123',
        title: 'Test Form',
        publishedBy: 'John Doe',
        publishedDate: '2024-01-01',
    };

    test('renders form card with title', () => {
        render(<FormCard {...defaultProps} />);
        expect(screen.getByText('Test Form')).toBeInTheDocument();
    });

    test('renders published by information', () => {
        render(<FormCard {...defaultProps} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    test('shows Draft button when not published', () => {
        render(<FormCard {...defaultProps} isPublished={false} />);
        expect(screen.getByText('Draft')).toBeInTheDocument();
    });

    test('shows Published button when published', () => {
        render(<FormCard {...defaultProps} isPublished={true} />);
        expect(screen.getByText('Published')).toBeInTheDocument();
    });

    test('View Responses button is disabled when not published', () => {
        render(<FormCard {...defaultProps} isPublished={false} />);
        const button = screen.getByText('View Responses');
        expect(button.closest('button')).toBeDisabled();
    });

    test('View Responses button is enabled when published', () => {
        render(<FormCard {...defaultProps} isPublished={true} />);
        const button = screen.getByText('View Responses');
        expect(button.closest('button')).not.toBeDisabled();
    });

    test('shows dropdown menu when more icon is clicked', () => {
        render(<FormCard {...defaultProps} />);
        const moreIcon = screen.getByTestId('MoreVertIcon');
        fireEvent.click(moreIcon);
        expect(screen.getByText('Delete Form')).toBeInTheDocument();
    });
});
