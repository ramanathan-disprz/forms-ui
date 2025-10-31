import { render, screen } from '@testing-library/react';
import FormEditPage from '../FormEditPage';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

jest.mock('../../api/forms/useForms', () => ({
  useFormWithQuestions: jest.fn()
}));

jest.mock('../FormEditControl', () => {
  return function FormEditControl({ formId, form }: any) {
    return (
      <div>
        <div>Form Edit Control</div>
        <div>Form ID: {formId}</div>
        <div>Form Title: {form.title}</div>
      </div>
    );
  };
});

import { useParams } from 'react-router-dom';
import { useFormWithQuestions } from '../../api/forms/useForms';

describe('FormEditPage', () => {
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

    render(<FormEditPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to load' }
    });

    render(<FormEditPage />);
    expect(screen.getByText('Error loading form')).toBeInTheDocument();
  });

  it('shows form not found when no data', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    });

    render(<FormEditPage />);
    expect(screen.getByText('Form not found')).toBeInTheDocument();
  });

  it('renders FormEditControl with form data', () => {
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

    render(<FormEditPage />);
    expect(screen.getByText('Form Edit Control')).toBeInTheDocument();
    expect(screen.getByText('Form ID: test-id')).toBeInTheDocument();
    expect(screen.getByText('Form Title: Test Form')).toBeInTheDocument();
  });

  it('passes correct formId from params', () => {
    const mockForm = { id: 'form-123', title: 'My Form' };
    
    (useParams as jest.Mock).mockReturnValue({ id: 'form-123' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: mockForm,
      isLoading: false,
      error: null
    });

    render(<FormEditPage />);
    expect(screen.getByText('Form ID: form-123')).toBeInTheDocument();
  });
});
