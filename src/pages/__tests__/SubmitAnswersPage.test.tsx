import { render, screen } from '@testing-library/react';
import SubmitAnswersPage from '../SubmitAnswersPage';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

jest.mock('../../api/forms/useForms', () => ({
  useFormWithQuestions: jest.fn()
}));

jest.mock('../SubmitAnswersView', () => {
  return function SubmitAnswersView({ formId, formData }: any) {
    return (
      <div>
        <div>Submit Answers View</div>
        <div>Form ID: {formId}</div>
        <div>Form Title: {formData?.title}</div>
      </div>
    );
  };
});

import { useParams } from 'react-router-dom';
import { useFormWithQuestions } from '../../api/forms/useForms';

describe('SubmitAnswersPage', () => {
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

    render(<SubmitAnswersPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to load' }
    });

    render(<SubmitAnswersPage />);
    expect(screen.getByText('Error loading form')).toBeInTheDocument();
  });

  it('shows form not found when no data', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    });

    render(<SubmitAnswersPage />);
    expect(screen.getByText('Form not found')).toBeInTheDocument();
  });

  it('renders SubmitAnswersView with form data', () => {
    const mockForm = {
      id: 'test-id',
      title: 'Test Form',
      questions: []
    };

    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: mockForm,
      isLoading: false,
      error: null
    });

    render(<SubmitAnswersPage />);
    expect(screen.getByText('Submit Answers View')).toBeInTheDocument();
    expect(screen.getByText('Form ID: test-id')).toBeInTheDocument();
    expect(screen.getByText('Form Title: Test Form')).toBeInTheDocument();
  });

  it('uses default formId when param is empty', () => {
    const mockForm = { title: 'Test Form' };

    (useParams as jest.Mock).mockReturnValue({ id: '' });
    (useFormWithQuestions as jest.Mock).mockReturnValue({
      data: mockForm,
      isLoading: false,
      error: null
    });

    render(<SubmitAnswersPage />);
    expect(screen.getByText('Form ID: 1')).toBeInTheDocument();
  });
});
