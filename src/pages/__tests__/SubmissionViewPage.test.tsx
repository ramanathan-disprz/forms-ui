import { render, screen } from '@testing-library/react';
import SubmissionViewPage from '../SubmissionViewPage';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

jest.mock('../../api/submissions/useSubmissions', () => ({
  useFormSubmissionDetail: jest.fn()
}));

jest.mock('../SubmissionView', () => {
  return function SubmissionView({ submissionId, formSubmission }: any) {
    return (
      <div>
        <div>Submission View</div>
        <div>Submission ID: {submissionId}</div>
        <div>Form ID: {formSubmission?.formId}</div>
      </div>
    );
  };
});

import { useParams } from 'react-router-dom';
import { useFormSubmissionDetail } from '../../api/submissions/useSubmissions';

describe('SubmissionViewPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useFormSubmissionDetail as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    render(<SubmissionViewPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useFormSubmissionDetail as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to load' }
    });

    render(<SubmissionViewPage />);
    expect(screen.getByText('Error loading form')).toBeInTheDocument();
  });

  it('shows form not found when no data', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useFormSubmissionDetail as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    });

    render(<SubmissionViewPage />);
    expect(screen.getByText('Form not found')).toBeInTheDocument();
  });

  it('renders SubmissionView with data', () => {
    const mockSubmission = {
      id: 123,
      formId: 'form-456',
      userId: 789,
      answers: []
    };

    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useFormSubmissionDetail as jest.Mock).mockReturnValue({
      data: mockSubmission,
      isLoading: false,
      error: null
    });

    render(<SubmissionViewPage />);
    expect(screen.getByText('Submission View')).toBeInTheDocument();
    expect(screen.getByText('Submission ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Form ID: form-456')).toBeInTheDocument();
  });

  it('converts string id to number', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '456' });
    (useFormSubmissionDetail as jest.Mock).mockReturnValue({
      data: { id: 456 },
      isLoading: false,
      error: null
    });

    render(<SubmissionViewPage />);
    expect(screen.getByText('Submission ID: 456')).toBeInTheDocument();
  });

  it('handles invalid id param', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'invalid' });
    (useFormSubmissionDetail as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    });

    render(<SubmissionViewPage />);
    expect(screen.getByText('Form not found')).toBeInTheDocument();
  });
});
