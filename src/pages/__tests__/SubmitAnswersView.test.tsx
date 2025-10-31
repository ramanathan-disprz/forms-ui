import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubmitAnswersView from '../SubmitAnswersView';
import { QuestionType } from '../../features/forms/Form';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../api/submissions/useSubmissions', () => ({
  useSubmitForm: jest.fn()
}));

jest.mock('../../components/buttons/OutlineButton', () => {
  return function OutlineButton({ text, onClick }: any) {
    return <button onClick={onClick}>{text}</button>;
  };
});

jest.mock('../../components/buttons/PrimaryButton', () => {
  return function Button({ text, onClick, disabled }: any) {
    return <button onClick={onClick} disabled={disabled}>{text}</button>;
  };
});

jest.mock('../../components/forms/form-view/FormViewItem', () => {
  return function FormViewItem({ questionId, questionText, value, onChange }: any) {
    return (
      <div>
        <div>Question: {questionText}</div>
        <input 
          value={value} 
          onChange={(e) => onChange(questionId, e.target.value)}
          placeholder={`Answer for ${questionId}`}
        />
      </div>
    );
  };
});

import { useNavigate } from 'react-router-dom';
import { useSubmitForm } from '../../api/submissions/useSubmissions';

describe('SubmitAnswersView', () => {
  const mockNavigate = jest.fn();
  const mockMutateAsync = jest.fn();

  const mockFormData = {
    form: {
      id: 'form-1',
      title: 'Test Form',
      description: 'Test Description'
    },
    questions: [
      { id: 'q1', type: QuestionType.SHORT_TEXT, questionText: 'Question 1' },
      { id: 'q2', type: QuestionType.SELECT, questionText: 'Question 2', options: [] }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSubmitForm as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false
    });
  });

  it('renders form title and description', () => {
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders all questions', () => {
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    expect(screen.getByText('Question: Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question: Question 2')).toBeInTheDocument();
  });

  it('renders Clear Form and Submit buttons', () => {
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    expect(screen.getByText('Clear Form')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('updates answer when input changes', () => {
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    const input = screen.getByPlaceholderText('Answer for q1');
    fireEvent.change(input, { target: { value: 'My answer' } });
    
    expect(input).toHaveValue('My answer');
  });

  it('clears form when Clear Form button clicked', () => {
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    const input = screen.getByPlaceholderText('Answer for q1');
    fireEvent.change(input, { target: { value: 'My answer' } });
    
    const clearButton = screen.getByText('Clear Form');
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
  });

  it('submits form with answers', async () => {
    mockMutateAsync.mockResolvedValue({});
    
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    const input = screen.getByPlaceholderText('Answer for q1');
    fireEvent.change(input, { target: { value: 'Answer 1' } });
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          formId: 'form-1',
          userId: expect.any(Number),
          answers: expect.arrayContaining([
            expect.objectContaining({
              questionId: 'q1',
              valueText: 'Answer 1'
            })
          ])
        })
      );
    });
  });

  it('navigates to forms page after successful submission', async () => {
    mockMutateAsync.mockResolvedValue({});
    
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/forms');
    });
  });

  it('shows submitting state', () => {
    (useSubmitForm as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true
    });
    
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByText('Submitting...')).toBeDisabled();
  });

  it('handles submission error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    mockMutateAsync.mockRejectedValue(new Error('Submission failed'));
    
    render(
      <SubmitAnswersView 
        formId="form-1" 
        formData={mockFormData}
      />
    );
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error submitting form:', expect.any(Error));
    });
    
    consoleErrorSpy.mockRestore();
  });
});
