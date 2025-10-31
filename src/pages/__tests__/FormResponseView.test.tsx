import { render, screen } from '@testing-library/react';
import FormResponseView from '../FormResponseView';
import { QuestionType } from '../../features/forms/Form';

// Mock dependencies
jest.mock('../../features/forms/useFormStates', () => ({
  useGetFormState: jest.fn()
}));

jest.mock('../../components/buttons/OutlineButton', () => {
  return function OutlineButton({ text, onClick }: any) {
    return <button onClick={onClick}>{text}</button>;
  };
});

jest.mock('../../components/forms/form-view/FormViewItem', () => {
  return function FormViewItem({ order, questionText, description, inputType, isRequired }: any) {
    return (
      <div>
        <div>Question {order}: {questionText}</div>
        <div>Type: {inputType}</div>
        <div>Required: {isRequired ? 'Yes' : 'No'}</div>
      </div>
    );
  };
});

import { useGetFormState } from '../../features/forms/useFormStates';

describe('FormResponseView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows no data message when form data is not available', () => {
    (useGetFormState as jest.Mock).mockReturnValue(null);

    render(<FormResponseView formId="test-id" />);
    expect(screen.getByText('No form data available')).toBeInTheDocument();
  });

  it('renders form title in header', () => {
    const mockFormData = {
      title: 'Test Form',
      description: 'Test Description',
      questions: []
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(<FormResponseView formId="test-id" />);
    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });

  it('renders form description', () => {
    const mockFormData = {
      title: 'Test Form',
      description: 'This is a test form description',
      questions: []
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(<FormResponseView formId="test-id" />);
    expect(screen.getByText('This is a test form description')).toBeInTheDocument();
  });

  it('renders default title and description when not provided', () => {
    const mockFormData = {
      questions: []
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(<FormResponseView formId="test-id" />);
    expect(screen.getByText('Course Feedback Form')).toBeInTheDocument();
    expect(screen.getByText('Help us improve! Share your feedback on your learning experience.')).toBeInTheDocument();
  });

  it('renders Clear Form button', () => {
    const mockFormData = {
      title: 'Test Form',
      questions: []
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(<FormResponseView formId="test-id" />);
    expect(screen.getByText('Clear Form')).toBeInTheDocument();
  });

  it('renders questions with correct types', () => {
    const mockFormData = {
      title: 'Test Form',
      questions: [
        {
          id: 'q1',
          type: QuestionType.SHORT_TEXT,
          questionText: 'Short text question',
          required: true
        },
        {
          id: 'q2',
          type: QuestionType.LONG_TEXT,
          questionText: 'Long text question',
          required: false
        },
        {
          id: 'q3',
          type: QuestionType.DATE,
          questionText: 'Date question'
        }
      ]
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(<FormResponseView formId="test-id" />);
    
    expect(screen.getByText('Question 1: Short text question')).toBeInTheDocument();
    expect(screen.getByText('Type: text')).toBeInTheDocument();
    expect(screen.getByText('Required: Yes')).toBeInTheDocument();
    
    expect(screen.getByText('Question 2: Long text question')).toBeInTheDocument();
    expect(screen.getByText('Type: textarea')).toBeInTheDocument();
    expect(screen.getByText('Required: No')).toBeInTheDocument();
    
    expect(screen.getByText('Question 3: Date question')).toBeInTheDocument();
    expect(screen.getByText('Type: date')).toBeInTheDocument();
  });

  it('converts all question types correctly', () => {
    const mockFormData = {
      title: 'Test Form',
      questions: [
        { type: QuestionType.SHORT_TEXT, questionText: 'Q1' },
        { type: QuestionType.LONG_TEXT, questionText: 'Q2' },
        { type: QuestionType.DATE, questionText: 'Q3' },
        { type: QuestionType.NUMBER, questionText: 'Q4' },
        { type: QuestionType.FILE, questionText: 'Q5' },
        { type: QuestionType.SELECT, questionText: 'Q6', options: [] }
      ]
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(<FormResponseView formId="test-id" />);
    
    expect(screen.getByText('Type: text')).toBeInTheDocument();
    expect(screen.getByText('Type: textarea')).toBeInTheDocument();
    expect(screen.getByText('Type: date')).toBeInTheDocument();
    expect(screen.getByText('Type: numeric')).toBeInTheDocument();
    expect(screen.getByText('Type: file')).toBeInTheDocument();
    expect(screen.getByText('Type: dropdown')).toBeInTheDocument();
  });

  it('handles questions without type', () => {
    const mockFormData = {
      title: 'Test Form',
      questions: [
        { questionText: 'Question without type' }
      ]
    };

    (useGetFormState as jest.Mock).mockReturnValue(mockFormData);

    render(<FormResponseView formId="test-id" />);
    expect(screen.getByText('Type: text')).toBeInTheDocument();
  });
});
