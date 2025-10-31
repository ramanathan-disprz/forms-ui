import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FormViewCard from '../FormViewCard';

describe('FormViewCard', () => {
    const defaultProps = {
        formId: '123',
        title: 'Test Form',
        description: 'Test Description'
    };

    test('renders form title', () => {
        render(<FormViewCard {...defaultProps} />);
        expect(screen.getByText('Test Form')).toBeInTheDocument();
    });

    test('renders form description', () => {
        render(<FormViewCard {...defaultProps} />);
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<FormViewCard {...defaultProps} onClick={handleClick} />);

        const card = screen.getByText('Test Form').closest('div');
        fireEvent.click(card || document);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders without description', () => {
        const { container } = render(
            <FormViewCard formId="1" title="Form Only" />
        );
        expect(container).toBeTruthy();
    });
});
