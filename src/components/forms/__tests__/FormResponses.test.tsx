import { render, screen } from '@testing-library/react';
import FormResponses from '../FormResponses';

// Mock the hooks
jest.mock('../../../api/submissions/useSubmissions', () => ({
  useFormSubmissions: jest.fn()
}));

jest.mock('../../../features/forms/useFormStates', () => ({
  useSetFormState: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

import { useFormSubmissions } from '../../../api/submissions/useSubmissions';

describe('FormResponses', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFormSubmissions as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });
  });

  it('renders Response Summary tab', () => {
    render(
      <FormResponses formId="test-id" />
    );
    expect(screen.getByText('Response Summary')).toBeInTheDocument();
  });

  it('renders Individual Response tab', () => {
    render(
      <FormResponses formId="test-id" />
    );
    expect(screen.getByText('Individual Response')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(
      <FormResponses formId="test-id" />
    );
    expect(screen.getByPlaceholderText('Search by Name/User ID')).toBeInTheDocument();
  });

  it('renders Export to Excel button', () => {
    render(
      <FormResponses formId="test-id" />
    );
    expect(screen.getByText('Export to Excel')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useFormSubmissions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });
    
    render(
      <FormResponses formId="test-id" />
    );
    expect(screen.getByText('Loading submissions...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useFormSubmissions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to load' }
    });
    
    render(
      <FormResponses formId="test-id" />
    );
    expect(screen.getByText('Error loading submissions: Failed to load')).toBeInTheDocument();
  });

  it('shows empty state when no submissions', () => {
    (useFormSubmissions as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });
    
    render(
      <FormResponses formId="test-id" />
    );
    expect(screen.getByText('No submissions yet for this form.')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    (useFormSubmissions as jest.Mock).mockReturnValue({
      data: [{ id: '1', userId: 1, submittedAt: '2024-01-01' }],
      isLoading: false,
      error: null
    });
    
    render(
      <FormResponses formId="test-id" />
    );
    
    expect(screen.getByText('Submitted By')).toBeInTheDocument();
    expect(screen.getByText('User Id')).toBeInTheDocument();
    expect(screen.getByText('Submitted On')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Response')).toBeInTheDocument();
  });
});
