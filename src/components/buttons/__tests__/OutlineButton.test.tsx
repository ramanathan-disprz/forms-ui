import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import OutlineButton from '../OutlineButton';

describe('OutlineButton', () => {
    test('renders button with text', () => {
        render(<OutlineButton text="Click Me" onClick={() => {}} />);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<OutlineButton text="Click Me" onClick={handleClick} />);
        
        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders disabled button', () => {
        render(<OutlineButton text="Disabled" onClick={() => {}} disabled={true} />);
        
        const button = screen.getByText('Disabled').closest('button');
        expect(button).toBeDisabled();
    });
});
