import { render, screen, fireEvent } from '@testing-library/react';
import FormEditControl from '../FormEditControl';
import { FormRequest, FormStatus, QuestionType } from '../../features/forms/Form';

// Mock all the dependencies
jest.mock('../../components/NavigationBar', () => {
    return function NavigationBar() {
        return <div>Navigation Bar</div>;
    };
});

jest.mock('../../components/FormFooter', () => {
    return function FormFooter({ canEdit, selectedTab, onNext, onPublish, onSaveDraft, onPreview }: any) {
        return (
            <div>
                <button onClick={onNext}>Next</button>
                <button onClick={onPublish}>Publish</button>
                <button onClick={onSaveDraft}>Save Draft</button>
                <button onClick={onPreview}>Preview</button>
                <div>{canEdit ? 'Can Edit' : 'Cannot Edit'}</div>
            </div>
        );
    };
});

jest.mock('../../components/forms/FormConfig', () => {
    return function FormConfig({ formData, onFormChange }: any) {
        return (
            <div>
                <div>Form Configuration</div>
                <input
                    value={formData.title}
                    onChange={(e) => onFormChange('title', e.target.value)}
                    placeholder="Form Title"
                />
            </div>
        );
    };
});

jest.mock('../../components/forms/FormLayout', () => {
    return function FormLayout({ formData, onFormChange }: any) {
        return <div>Form Layout</div>;
    };
});

jest.mock('../../components/forms/FormResponses', () => {
    return function FormResponses({ formId, formData }: any) {
        return (
            <div>
                <div>Form Responses</div>
                <div>Form ID: {formId}</div>
            </div>
        );
    };
});

jest.mock('../../api/forms/useForms', () => ({
    useUpdateForm: jest.fn()
}));

jest.mock('../../features/forms/useFormStates', () => ({
    useSetFormState: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useSearchParams: jest.fn()
}));

jest.mock('react-hot-toast', () => ({
    default: {
        success: jest.fn()
    }
}));

import { useUpdateForm } from '../../api/forms/useForms';
import { useSetFormState } from '../../features/forms/useFormStates';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

describe('FormEditControl', () => {
    const mockMutate = jest.fn();
    const mockNavigate = jest.fn();
    const mockSetFormState = jest.fn();
    const mockSearchParams = new URLSearchParams();

    const mockForm: FormRequest = {
        title: 'Test Form',
        description: 'Test Description',
        formStatus: FormStatus.DRAFT,
        questions: []
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useUpdateForm as jest.Mock).mockReturnValue({
            mutate: mockMutate
        });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useSetFormState as jest.Mock).mockReturnValue(mockSetFormState);
        (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);
    });

    it('renders navigation bar', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );
        expect(screen.getByText('Navigation Bar')).toBeInTheDocument();
    });

    it('renders form configuration tab by default', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );
        expect(screen.getByText('Form Configuration')).toBeInTheDocument();
    });

    it('renders Form Configuration and Form Layout tabs when canEdit is true', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );
        expect(screen.getByText('Form Configuration')).toBeInTheDocument();
        expect(screen.getByText('Form Layout')).toBeInTheDocument();
        expect(screen.queryByText('Form Responses')).not.toBeInTheDocument();
    });

    it('renders Form Responses tab when canEdit is false', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={false}
            />
        );
        expect(screen.getByText('Form Responses')).toBeInTheDocument();
    });

    it('switches to layout tab when clicked', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );

        const layoutTab = screen.getByText('Form Layout');
        fireEvent.click(layoutTab);

        expect(screen.getByText('Form Layout')).toBeInTheDocument();
    });

    it('switches to layout tab when Next button clicked', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        expect(screen.getByText('Form Layout')).toBeInTheDocument();
    });

    it('calls update form when Save Draft button clicked', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );

        const saveDraftButton = screen.getByText('Save Draft');
        fireEvent.click(saveDraftButton);

        expect(mockMutate).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'test-id',
                formData: expect.objectContaining({
                    title: 'Test Form'
                })
            }),
            expect.any(Object)
        );
    });

    it('calls update form with PUBLISHED status when Publish button clicked', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );

        const publishButton = screen.getByText('Publish');
        fireEvent.click(publishButton);

        expect(mockMutate).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'test-id',
                formData: expect.objectContaining({
                    title: 'Test Form',
                    formStatus: FormStatus.PUBLISHED
                })
            }),
            expect.any(Object)
        );
    });

    it('navigates to preview with formId when Preview button clicked', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );

        const previewButton = screen.getByText('Preview');
        fireEvent.click(previewButton);

        expect(mockSetFormState).toHaveBeenCalledWith(mockForm);
        expect(mockNavigate).toHaveBeenCalledWith('/form-builder/preview/test-id');
    });

    it('shows success toast on successful form update', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );

        const publishButton = screen.getByText('Publish');
        fireEvent.click(publishButton);

        // Get the onSuccess callback and call it
        const callArgs = mockMutate.mock.calls[0];
        const callbacks = callArgs[1];
        callbacks.onSuccess({ id: 'test-id' });

        expect(toast.success).toHaveBeenCalledWith('Form published successfully');
        expect(mockNavigate).toHaveBeenCalledWith('/form-builder');
    });

    it('updates form title when changed', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={true}
            />
        );

        const titleInput = screen.getByPlaceholderText('Form Title');
        fireEvent.change(titleInput, { target: { value: 'Updated Form Title' } });

        expect(titleInput).toHaveValue('Updated Form Title');
    });

    it('passes formId to FormResponses component', () => {
        render(
            <FormEditControl
                formId="test-form-123"
                form={mockForm}
                canEdit={false}
            />
        );

        const responsesTab = screen.getByText('Form Responses');
        fireEvent.click(responsesTab);

        expect(screen.getByText('Form ID: test-form-123')).toBeInTheDocument();
    });

    it('handles form with existing questions', () => {
        const formWithQuestions: FormRequest = {
            ...mockForm,
            questions: [
                {
                    id: 'q1',
                    type: QuestionType.SHORT_TEXT,
                    questionText: 'Question 1',
                    order: 1
                },
                {
                    id: 'q2',
                    type: QuestionType.SELECT,
                    questionText: 'Question 2',
                    order: 2,
                    options: [
                        { id: 'opt1', value: 'Option 1', label: 'Option 1' }
                    ]
                }
            ]
        };

        render(
            <FormEditControl
                formId="test-id"
                form={formWithQuestions}
                canEdit={true}
            />
        );

        const publishButton = screen.getByText('Publish');
        fireEvent.click(publishButton);

        expect(mockMutate).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'test-id',
                formData: expect.objectContaining({
                    questions: expect.arrayContaining([
                        expect.objectContaining({ id: 'q1' }),
                        expect.objectContaining({ id: 'q2' })
                    ])
                })
            }),
            expect.any(Object)
        );
    });

    it('initializes with tab from URL params', () => {
        mockSearchParams.set('tab', 'responses');
        (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={false}
            />
        );

        expect(screen.getByText('Form Responses')).toBeInTheDocument();
    });

    it('passes canEdit prop to FormFooter', () => {
        render(
            <FormEditControl
                formId="test-id"
                form={mockForm}
                canEdit={false}
            />
        );

        expect(screen.getByText('Cannot Edit')).toBeInTheDocument();
    });
});
