import { render, screen, fireEvent } from '@testing-library/react';
import NumericTile from '../NumericTile';
import { QuestionRequest } from '../../../../features/forms/Form';

describe('NumericTile', () => {
  const mockQuestion: QuestionRequest = {
    questionText: 'Enter a number',
    description: 'Numeric value only',
    required: false,
    order: 5
  };

  const mockOnUpdate = jest.fn();
  const mockOnClone = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with question text', () => {
    render(
      <NumericTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByDisplayValue('Enter a number')).toBeInTheDocument();
  });

  it('shows placeholder for numeric input', () => {
    render(
      <NumericTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByPlaceholderText('Numeric Value')).toBeInTheDocument();
  });

  it('shows description when present', () => {
    render(
      <NumericTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByDisplayValue('Numeric value only')).toBeInTheDocument();
  });

  it('updates question text when changed', () => {
    render(
      <NumericTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    
    const input = screen.getByDisplayValue('Enter a number');
    fireEvent.change(input, { target: { value: 'New numeric question' } });
    
    expect(mockOnUpdate).toHaveBeenCalledWith({ questionText: 'New numeric question' });
  });

  it('renders untitled question when questionText is empty', () => {
    const emptyQuestion = { ...mockQuestion, questionText: '' };
    render(
      <NumericTile
        question={emptyQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByDisplayValue('Untitled Question')).toBeInTheDocument();
  });

  it('updates description when changed', () => {
    render(
      <NumericTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    
    const descInput = screen.getByDisplayValue('Numeric value only');
    fireEvent.change(descInput, { target: { value: 'Numbers only please' } });
    
    expect(mockOnUpdate).toHaveBeenCalledWith({ description: 'Numbers only please' });
  });

  it('numeric input field is disabled', () => {
    render(
      <NumericTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    
    const numericInput = screen.getByPlaceholderText('Numeric Value');
    expect(numericInput).toBeDisabled();
  });
});
