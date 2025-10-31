import { render, screen, fireEvent } from '@testing-library/react';
import FormListTile from '../FormListTile';

describe('FormListTile', () => {
    const mockOnClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders text', () => {
        render(
            <FormListTile
                icon="/test-icon.svg"
                text="Short Text"
                onClick={mockOnClick}
            />
        );
        expect(screen.getByText('Short Text')).toBeInTheDocument();
    });

    it('renders icon', () => {
        render(
            <FormListTile
                icon="/test-icon.svg"
                text="Test Tile"
                onClick={mockOnClick}
            />
        );
        const icon = screen.getByAltText('icon');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('src', '/test-icon.svg');
    });

    it('calls onClick when clicked', () => {
        render(
            <FormListTile
                icon="/test-icon.svg"
                text="Clickable Tile"
                onClick={mockOnClick}
            />
        );

        const container = screen.getByText('Clickable Tile').parentElement;
        if (container) {
            fireEvent.click(container);
        }

        expect(mockOnClick).toHaveBeenCalled();
    });

    it('applies custom color', () => {
        const { container } = render(
            <FormListTile
                icon="/test-icon.svg"
                text="Colored Tile"
                color="#FF0000"
                onClick={mockOnClick}
            />
        );

        const iconDiv = container.querySelector('[style*="background-color"]');
        expect(iconDiv).toHaveStyle({ backgroundColor: '#FF0000' });
    });

    it('applies default color when no color provided', () => {
        const { container } = render(
            <FormListTile
                icon="/test-icon.svg"
                text="Default Color"
            />
        );

        const iconDiv = container.querySelector('[style*="background-color"]');
        expect(iconDiv).toHaveStyle({ backgroundColor: '#CBE3FE' });
    });
});
