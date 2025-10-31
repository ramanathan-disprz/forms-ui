import { render, screen, fireEvent } from '@testing-library/react';
import FileUploadTile from '../FileUploadTile';
import { QuestionRequest } from '../../../../features/forms/Form';

describe('FileUploadTile', () => {
  const mockQuestion: QuestionRequest = {
    questionText: 'Upload your document',
    description: 'Please upload PDF only',
    required: true,
    order: 2
  };

  const mockOnUpdate = jest.fn();
  const mockOnClone = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with question text', () => {
    render(
      <FileUploadTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByDisplayValue('Upload your document')).toBeInTheDocument();
  });

  it('shows file upload instructions', () => {
    render(
      <FileUploadTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('File Upload (Only one file allowed)')).toBeInTheDocument();
    expect(screen.getByText('Supported files : PDF, PNG, JPG | Max file size 2 MB')).toBeInTheDocument();
  });

  it('shows description when present', () => {
    render(
      <FileUploadTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByDisplayValue('Please upload PDF only')).toBeInTheDocument();
  });

  it('updates question text when changed', () => {
    render(
      <FileUploadTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    
    const input = screen.getByDisplayValue('Upload your document');
    fireEvent.change(input, { target: { value: 'Upload new file' } });
    
    expect(mockOnUpdate).toHaveBeenCalledWith({ questionText: 'Upload new file' });
  });

  it('updates description when changed', () => {
    render(
      <FileUploadTile
        question={mockQuestion}
        onUpdate={mockOnUpdate}
        onClone={mockOnClone}
        onDelete={mockOnDelete}
      />
    );
    
    const descInput = screen.getByDisplayValue('Please upload PDF only');
    fireEvent.change(descInput, { target: { value: 'New description' } });
    
    expect(mockOnUpdate).toHaveBeenCalledWith({ description: 'New description' });
  });
});
