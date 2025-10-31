import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SecondaryButton from '../SecondaryButton';

describe('SecondaryButton', () => {
    test('renders button with text', () => {
        render(<SecondaryButton text="Secondary" onClick={() => { }} />);
        expect(screen.getByText('Secondary')).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<SecondaryButton text="Cancel" onClick={handleClick} />);

        fireEvent.click(screen.getByText('Cancel'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

});
