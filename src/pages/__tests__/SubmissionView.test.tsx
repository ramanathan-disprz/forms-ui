import { render, screen } from '@testing-library/react';
import SubmissionView from '../SubmissionView';
import { FormSubmissionDetail } from '../../features/submission/Submission';
import { QuestionType } from '../../features/forms/Form';

// Mock dependencies
jest.mock('../../features/forms/useFormStates', () => ({
  useGetFormState: jest.fn()
}));

jest.mock('../../components/buttons/OutlineButton', () => {
  return function OutlineButton({ text }: any) {
    return <button>{text}</button>;
  };
});

jest.mock('../../components/forms/form-view/FormViewItem', () => {
  return function FormViewItem({ questionText, value, isDisabled }: any) {
    return (
      <div>
        <div>Question: {questionText}</div>
        <div>Answer: {value}</div>
        <div>Disabled: {isDisabled ? 'Yes' : 'No'}</div>
      </div>
    );
  };
});

import { useGetFormState } from '../../features/forms/useFormStates';

describe('SubmissionView', () => {
  const mockFormSubmission: FormSubmissionDetail = {
    id: 1,
    formId: 'form-1',
    userId: 123,
    submittedAt: '2024-01-01',
    answers: [
      { 
        questionId: 'q1', 
        questionType: QuestionType.SHORT_TEXT, 
        valueText: 'Answer 1', 
        valueJson: '' 
      },
      { 
        questionId: 'q2', 
        questionType: QuestionType.SELECT, 
        valueText: '', 
        valueJson: '["Option A"]' 
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows no data message when form data is not available', () => {
    (useGetFormState as jest.Mock).mockReturnValue(null);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={mockFormSubmission}
      />
    );
    expect(screen.getByText('No form data available')).toBeInTheDocument();
  });

  it('renders form title', () => {
    const mockFormData = {
      title: 'Test Form',
      description: 'Test Description',
      questions: []
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={mockFormSubmission}
      />
    );
    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });

  it('renders questions with answers', () => {
    const mockFormData = {
      title: 'Test Form',
      questions: [
        { id: 'q1', type: QuestionType.SHORT_TEXT, questionText: 'Question 1' },
        { id: 'q2', type: QuestionType.SELECT, questionText: 'Question 2' }
      ]
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={mockFormSubmission}
      />
    );
    
    expect(screen.getByText('Question: Question 1')).toBeInTheDocument();
    expect(screen.getByText('Answer: Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Question: Question 2')).toBeInTheDocument();
    expect(screen.getByText('Answer: Option A')).toBeInTheDocument();
  });

  it('renders all fields as disabled', () => {
    const mockFormData = {
      title: 'Test Form',
      questions: [
        { id: 'q1', questionText: 'Question 1' }
      ]
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={mockFormSubmission}
      />
    );
    
    expect(screen.getByText('Disabled: Yes')).toBeInTheDocument();
  });

  it('handles dropdown answers with multiple selections', () => {
    const submissionWithMultiSelect: FormSubmissionDetail = {
      ...mockFormSubmission,
      answers: [
        { 
          questionId: 'q1', 
          questionType: QuestionType.SELECT, 
          valueText: '', 
          valueJson: '["Option A", "Option B", "Option C"]' 
        }
      ]
    };

    const mockFormData = {
      title: 'Test Form',
      questions: [
        { id: 'q1', type: QuestionType.SELECT, questionText: 'Multi Select' }
      ]
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={submissionWithMultiSelect}
      />
    );
    
    expect(screen.getByText('Answer: Option A, Option B, Option C')).toBeInTheDocument();
  });

  it('handles empty answers', () => {
    const emptySubmission: FormSubmissionDetail = {
      ...mockFormSubmission,
      answers: []
    };

    const mockFormData = {
      title: 'Test Form',
      questions: [
        { id: 'q1', questionText: 'Unanswered Question' }
      ]
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={emptySubmission}
      />
    );
    
    expect(screen.getByText('Answer:')).toBeInTheDocument();
  });

  it('handles invalid JSON in dropdown answer', () => {
    const invalidJsonSubmission: FormSubmissionDetail = {
      ...mockFormSubmission,
      answers: [
        { 
          questionId: 'q1', 
          questionType: QuestionType.SELECT, 
          valueText: 'Fallback text', 
          valueJson: 'invalid json' 
        }
      ]
    };

    const mockFormData = {
      title: 'Test Form',
      questions: [
        { id: 'q1', type: QuestionType.SELECT, questionText: 'Select Question' }
      ]
    };

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={invalidJsonSubmission}
      />
    );
    
    expect(screen.getByText('Answer: Fallback text')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error parsing dropdown value:', expect.any(Error));
    
    consoleErrorSpy.mockRestore();
  });

  it('renders default title when not provided', () => {
    const mockFormData = {
      questions: []
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={mockFormSubmission}
      />
    );
    
    expect(screen.getByText('Course Feedback Form')).toBeInTheDocument();
  });

  it('renders default description when not provided', () => {
    const mockFormData = {
      title: 'Test Form',
      questions: []
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(
      <SubmissionView 
        submissionId={1} 
        formSubmission={mockFormSubmission}
      />
    );
    
    expect(screen.getByText('Help us improve! Share your feedback on your learning experience.')).toBeInTheDocument();
  });
});
