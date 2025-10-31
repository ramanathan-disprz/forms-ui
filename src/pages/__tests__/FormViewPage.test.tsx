import { render, screen } from '@testing-library/react';
import FormViewPage from '../FormViewPage';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

jest.mock('../../api/forms/useForms', () => ({
  useFormWithQuestions: jest.fn()
}));

jest.mock('../FormEditControl', () => {
  return function FormEditControl({ formId, form, canEdit }: any) {
    return (
      <div>
        <div>Form Edit Control</div>
        <div>Form ID: {formId}</div>
        <div>Form Title: {form.title}</div>
        <div>Can Edit: {canEdit ? 'Yes' : 'No'}</div>
      </div>
    );
  };
});

import { useParams } from 'react-router-dom';
import { useFormWithQuestions } from '../../api/forms/useForms';

describe('FormViewPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    render(<FormViewPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to load' }
    });

    render(<FormViewPage />);
    expect(screen.getByText('Error loading form')).toBeInTheDocument();
  });

  it('shows form not found when no data', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    });

    render(<FormViewPage />);
    expect(screen.getByText('Form not found')).toBeInTheDocument();
  });

  it('renders FormEditControl with form data and canEdit false', () => {
    const mockForm = {
      id: 'test-id',
      title: 'Test Form',
      description: 'Test Description'
    };

    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: mockForm,
      isLoading: false,
      error: null
    });

    render(<FormViewPage />);
    expect(screen.getByText('Form Edit Control')).toBeInTheDocument();
    expect(screen.getByText('Form ID: test-id')).toBeInTheDocument();
    expect(screen.getByText('Form Title: Test Form')).toBeInTheDocument();
    expect(screen.getByText('Can Edit: No')).toBeInTheDocument();
  });

  it('passes correct formId from params', () => {
    const mockForm = { id: 'form-123', title: 'My Form' };
    
    (useParams as jest.Mock).mockReturnValue({ id: 'form-123' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: mockForm,
      isLoading: false,
      error: null
    });

    render(<FormViewPage />);
    expect(screen.getByText('Form ID: form-123')).toBeInTheDocument();
  });

  it('always sets canEdit to false for view mode', () => {
    const mockForm = {
      id: 'test-id',
      title: 'View Only Form',
      description: 'This form is in view mode'
    };

    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: mockForm,
      isLoading: false,
      error: null
    });

    render(<FormViewPage />);
    expect(screen.getByText('Can Edit: No')).toBeInTheDocument();
  });

  it('handles empty string id param', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: { id: '', title: 'Form' },
      isLoading: false,
      error: null
    });

    render(<FormViewPage />);
    expect(screen.getByText('Form ID:')).toBeInTheDocument();
  });

  it('handles undefined id param', () => {
    (useParams as jest.Mock).mockReturnValue({});
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: { id: 'default', title: 'Form' },
      isLoading: false,
      error: null
    });

    render(<FormViewPage />);
    expect(screen.getByText('Form Edit Control')).toBeInTheDocument();
  });

  it('renders form with complex data structure', () => {
    const mockForm = {
      id: 'complex-form',
      title: 'Complex Form',
      description: 'Complex Description',
      questions: [
        { id: 'q1', text: 'Question 1' },
        { id: 'q2', text: 'Question 2' }
      ],
      settings: {
        isPublic: true,
        allowMultipleSubmissions: false
      }
    };

    (useParams as jest.Mock).mockReturnValue({ id: 'complex-form' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: mockForm,
      isLoading: false,
      error: null
    });

    render(<FormViewPage />);
    expect(screen.getByText('Form Title: Complex Form')).toBeInTheDocument();
    expect(screen.getByText('Form ID: complex-form')).toBeInTheDocument();
  });
});
