import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from '../PrimaryButton';

describe('PrimaryButton', () => {
    test('renders button with text', () => {
        render(<PrimaryButton text="Primary" onClick={() => {}} />);
        expect(screen.getByText('Primary')).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<PrimaryButton text="Submit" onClick={handleClick} />);
        
        fireEvent.click(screen.getByText('Submit'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders disabled button', () => {
        render(<PrimaryButton text="Disabled" onClick={() => {}} disabled={true} />);
        
        const button = screen.getByText('Disabled').closest('button');
        expect(button).toBeDisabled();
    });

    test('does not call onClick when disabled', () => {
        const handleClick = jest.fn();
        render(<PrimaryButton text="Disabled" onClick={handleClick} disabled={true} />);
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
