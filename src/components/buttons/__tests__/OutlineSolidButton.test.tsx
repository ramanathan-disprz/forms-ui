import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import OutlineSolidButton from '../OutlineSolidButton';

describe('OutlineSolidButton', () => {
    test('renders button with text', () => {
        render(<OutlineSolidButton text="Solid Button" onClick={() => {}} />);
        expect(screen.getByText('Solid Button')).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<OutlineSolidButton text="Click" onClick={handleClick} />);
        
        fireEvent.click(screen.getByText('Click'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders disabled button', () => {
        render(<OutlineSolidButton text="Disabled" onClick={() => {}} disabled={true} />);
        
        const button = screen.getByText('Disabled').closest('button');
        expect(button).toBeDisabled();
    });
});
