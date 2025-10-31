import { render, screen, fireEvent } from '@testing-library/react';
import DropdownTile from '../DropdownTile';
import { QuestionRequest } from '../../../../../features/forms/Form';

describe('DropdownTile', () => {
    const mockQuestion: QuestionRequest = {
        questionText: 'Select an option',
        description: 'Choose one',
        required: false,
        order: 1,
        options: [
            { id: '1', value: 'Option 1', label: 'Option 1' },
            { id: '2', value: 'Option 2', label: 'Option 2' }
        ]
    };

    const mockOnUpdate = jest.fn();
    const mockOnClone = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with question text', () => {
        render(
            <DropdownTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Select an option')).toBeInTheDocument();
    });

    it('renders existing options', () => {
        render(
            <DropdownTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Option 2')).toBeInTheDocument();
    });

    it('adds new option when Add Option clicked', () => {
        render(
            <DropdownTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );

        const addButton = screen.getByText('Add Option');
        fireEvent.click(addButton);

        expect(mockOnUpdate).toHaveBeenCalledWith({
            options: [
                { id: '1', order: 1, value: 'Option 1', label: 'Option 1' },
                { id: '2', order: 2, value: 'Option 2', label: 'Option 2' },
                expect.objectContaining({
                    order: 3,
                    value: 'Option 3',
                    label: 'Option 3'
                })
            ]
        });
    });

    it('updates question text when changed', () => {
        render(
            <DropdownTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );

        const input = screen.getByDisplayValue('Select an option');
        fireEvent.change(input, { target: { value: 'New dropdown question' } });

        expect(mockOnUpdate).toHaveBeenCalledWith({ questionText: 'New dropdown question' });
    });

    it('shows description when present', () => {
        render(
            <DropdownTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Choose one')).toBeInTheDocument();
    });

    it('renders untitled question when questionText is empty', () => {
        const emptyQuestion = { ...mockQuestion, questionText: '' };
        render(
            <DropdownTile
                question={emptyQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Untitled Question')).toBeInTheDocument();
    });

    it('handles empty options array', () => {
        const questionWithNoOptions = { ...mockQuestion, options: [] };
        render(
            <DropdownTile
                question={questionWithNoOptions}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByText('Add Option')).toBeInTheDocument();
    });

    it('handles undefined options', () => {
        const questionWithUndefinedOptions = { ...mockQuestion, options: undefined };
        render(
            <DropdownTile
                question={questionWithUndefinedOptions}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByText('Add Option')).toBeInTheDocument();
    });
});
