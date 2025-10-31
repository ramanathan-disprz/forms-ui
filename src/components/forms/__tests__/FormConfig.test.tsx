import { render, screen, fireEvent } from '@testing-library/react';
import FormConfig from '../FormConfig';
import { FormRequest, FormViewStatus } from '../../../features/forms/Form';

describe('FormConfig', () => {
    const mockFormData: FormRequest = {
        title: 'Test Form',
        description: 'Test Description',
        formViewStatus: FormViewStatus.ENABLED
    };

    const mockOnFormChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders form title', () => {
        render(
            <FormConfig
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );
        expect(screen.getByDisplayValue('Test Form')).toBeInTheDocument();
    });

    it('renders form description', () => {
        render(
            <FormConfig
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );
        expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    });

    it('renders Form Details heading', () => {
        render(
            <FormConfig
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );
        expect(screen.getByText('Form Details')).toBeInTheDocument();
    });

    it('calls onFormChange when title changes', () => {
        render(
            <FormConfig
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );

        const titleInput = screen.getByDisplayValue('Test Form');
        fireEvent.change(titleInput, { target: { value: 'New Title' } });

        expect(mockOnFormChange).toHaveBeenCalledWith('title', 'New Title');
    });

    it('calls onFormChange when description changes', () => {
        render(
            <FormConfig
                formData={mockFormData}
                onFormChange={mockOnFormChange}
            />
        );

        const descInput = screen.getByDisplayValue('Test Description');
        fireEvent.change(descInput, { target: { value: 'New Description' } });

        expect(mockOnFormChange).toHaveBeenCalledWith('description', 'New Description');
    });
});
