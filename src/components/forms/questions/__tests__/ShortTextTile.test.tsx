import { render, screen, fireEvent } from '@testing-library/react';
import ShortTextTile from '../ShortTextTile';
import { QuestionRequest } from '../../../../features/forms/Form';

describe('ShortTextTile', () => {
    const mockQuestion: QuestionRequest = {
        questionText: 'Enter short text',
        description: 'Brief answer required',
        required: true,
        order: 4
    };

    const mockOnUpdate = jest.fn();
    const mockOnClone = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with question text', () => {
        render(
            <ShortTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Enter short text')).toBeInTheDocument();
    });

    it('shows placeholder for short text input', () => {
        render(
            <ShortTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Short Text (Up to 100 Character)')).toBeInTheDocument();
    });

    it('shows description when present', () => {
        render(
            <ShortTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Brief answer required')).toBeInTheDocument();
    });

    it('updates question text when changed', () => {
        render(
            <ShortTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );

        const input = screen.getByDisplayValue('Enter short text');
        fireEvent.change(input, { target: { value: 'New short text question' } });

        expect(mockOnUpdate).toHaveBeenCalledWith({ questionText: 'New short text question' });
    });

    it('renders untitled question when questionText is empty', () => {
        const emptyQuestion = { ...mockQuestion, questionText: '' };
        render(
            <ShortTextTile
                question={emptyQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Untitled Question')).toBeInTheDocument();
    });

    it('updates description when changed', () => {
        render(
            <ShortTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );

        const descInput = screen.getByDisplayValue('Brief answer required');
        fireEvent.change(descInput, { target: { value: 'Updated description' } });

        expect(mockOnUpdate).toHaveBeenCalledWith({ description: 'Updated description' });
    });
});
