import { render, screen, fireEvent } from '@testing-library/react';
import SelectQuestionOption from '../SelectQuestionOption';

describe('SelectQuestionOption', () => {
  const mockOnValueChange = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with order number', () => {
    render(
      <SelectQuestionOption
        order={1}
        optionValue="Test Option"
        onValueChange={mockOnValueChange}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders with option value', () => {
    render(
      <SelectQuestionOption
        order={2}
        optionValue="Sample Option"
        onValueChange={mockOnValueChange}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByDisplayValue('Sample Option')).toBeInTheDocument();
  });

  it('calls onValueChange when input changes', () => {
    render(
      <SelectQuestionOption
        order={1}
        optionValue="Initial Value"
        onValueChange={mockOnValueChange}
        onClose={mockOnClose}
      />
    );
    
    const input = screen.getByDisplayValue('Initial Value');
    fireEvent.change(input, { target: { value: 'Updated Value' } });
    
    expect(mockOnValueChange).toHaveBeenCalledWith('Updated Value');
  });

  it('calls onClose when close icon clicked', () => {
    render(
      <SelectQuestionOption
        order={1}
        optionValue="Test"
        onValueChange={mockOnValueChange}
        onClose={mockOnClose}
      />
    );
    
    const closeIcon = screen.getByAltText('Close Icon');
    fireEvent.click(closeIcon);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays correct order number', () => {
    render(
      <SelectQuestionOption
        order={5}
        optionValue="Fifth Option"
        onValueChange={mockOnValueChange}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
