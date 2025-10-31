import { render, screen, fireEvent } from '@testing-library/react';
import LongTextTile from '../LongTextTile';
import { QuestionRequest } from '../../../../features/forms/Form';

describe('LongTextTile', () => {
    const mockQuestion: QuestionRequest = {
        questionText: 'Enter long text',
        description: 'Provide detailed answer',
        required: false,
        order: 3
    };

    const mockOnUpdate = jest.fn();
    const mockOnClone = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with question text', () => {
        render(
            <LongTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Enter long text')).toBeInTheDocument();
    });

    it('shows placeholder for long text input', () => {
        render(
            <LongTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Long Text (Up to 500 Character)')).toBeInTheDocument();
    });

    it('shows description when present', () => {
        render(
            <LongTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Provide detailed answer')).toBeInTheDocument();
    });

    it('updates question text when changed', () => {
        render(
            <LongTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );

        const input = screen.getByDisplayValue('Enter long text');
        fireEvent.change(input, { target: { value: 'New long text question' } });

        expect(mockOnUpdate).toHaveBeenCalledWith({ questionText: 'New long text question' });
    });

    it('renders untitled question when questionText is empty', () => {
        const emptyQuestion = { ...mockQuestion, questionText: '' };
        render(
            <LongTextTile
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
            <LongTextTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );

        const descInput = screen.getByDisplayValue('Provide detailed answer');
        fireEvent.change(descInput, { target: { value: 'New description' } });

        expect(mockOnUpdate).toHaveBeenCalledWith({ description: 'New description' });
    });
});
