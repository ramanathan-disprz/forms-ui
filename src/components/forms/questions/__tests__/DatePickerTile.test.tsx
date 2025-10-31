import { render, screen, fireEvent } from '@testing-library/react';
import DatePickerTile from '../DatePickerTile';
import { QuestionRequest } from '../../../../features/forms/Form';

describe('DatePickerTile', () => {
    const mockQuestion: QuestionRequest = {
        questionText: 'Select a date',
        description: 'Choose your preferred date',
        required: false,
        dateFormat: 'MM/DD/YYYY',
        order: 1
    };

    const mockOnUpdate = jest.fn();
    const mockOnClone = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with question text', () => {
        render(
            <DatePickerTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Select a date')).toBeInTheDocument();
    });

    it('shows description when hasDescription is true', () => {
        render(
            <DatePickerTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('Choose your preferred date')).toBeInTheDocument();
    });

    it('displays MM/DD/YYYY format by default', () => {
        render(
            <DatePickerTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByDisplayValue('MM/DD/YYYY')).toBeInTheDocument();
    });

    it('changes date format when DD/MM/YYYY is selected', () => {
        render(
            <DatePickerTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );

        const ddmmRadio = screen.getByLabelText('DD/MM/YYYY');
        fireEvent.click(ddmmRadio);

        expect(mockOnUpdate).toHaveBeenCalledWith({ dateFormat: 'DD/MM/YYYY' });
    });

    it('updates question text when changed', () => {
        render(
            <DatePickerTile
                question={mockQuestion}
                onUpdate={mockOnUpdate}
                onClone={mockOnClone}
                onDelete={mockOnDelete}
            />
        );

        const input = screen.getByDisplayValue('Select a date');
        fireEvent.change(input, { target: { value: 'New date question' } });

        expect(mockOnUpdate).toHaveBeenCalledWith({ questionText: 'New date question' });
    });
});
