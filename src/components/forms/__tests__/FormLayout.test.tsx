import { render, screen, fireEvent } from '@testing-library/react';
import FormLayout from '../FormLayout';
import { FormRequest, QuestionType } from '../../../features/forms/Form';

describe('FormLayout', () => {
    const mockFormData: FormRequest = {
        title: 'Test Form',
        description: 'Test Description',
        questions: []
    };

    const mockOnFormChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders Input Fields button', () => {
        render(
            <FormLayout
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );
        expect(screen.getByText('Input Fields')).toBeInTheDocument();
    });

    it('renders Form Header text', () => {
        render(
            <FormLayout
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );
        expect(screen.getByText('Form Header')).toBeInTheDocument();
    });

    it('renders all question type tiles', () => {
        render(
            <FormLayout
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );

        expect(screen.getByText('Short Text')).toBeInTheDocument();
        expect(screen.getByText('Long Text')).toBeInTheDocument();
        expect(screen.getByText('Date Picker')).toBeInTheDocument();
        expect(screen.getByText('Drop Down')).toBeInTheDocument();
        expect(screen.getByText('File Upload')).toBeInTheDocument();
        expect(screen.getByText('Numeric')).toBeInTheDocument();
    });

    it('adds a short text question when Short Text tile clicked', () => {
        render(
            <FormLayout
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );

        const shortTextTile = screen.getByText('Short Text');
        fireEvent.click(shortTextTile.parentElement || shortTextTile);

        expect(mockOnFormChange).toHaveBeenCalledWith('questions',
            expect.arrayContaining([
                expect.objectContaining({
                    type: QuestionType.SHORT_TEXT,
                    questionText: '',
                    order: 1
                })
            ])
        );
    });

    it('renders existing questions', () => {
        const formWithQuestions: FormRequest = {
            ...mockFormData,
            questions: [
                {
                    id: 'q1',
                    type: QuestionType.SHORT_TEXT,
                    questionText: 'Existing Question',
                    order: 1
                }
            ]
        };

        render(
            <FormLayout
                formData={formWithQuestions}
                onFormChange={mockOnFormChange}
            />
        );

        expect(screen.getByDisplayValue('Existing Question')).toBeInTheDocument();
    });
});
