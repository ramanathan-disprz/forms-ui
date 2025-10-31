import { render, screen, fireEvent } from '@testing-library/react';
import FormContentTile from '../FormContentTile';

describe('FormContentTile', () => {
  const mockOnDescriptionChange = jest.fn();
  const mockOnRequiredChange = jest.fn();
  const mockOnClone = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders default content when no bodyContent provided', () => {
    render(
      <FormContentTile
        title="Test Form"
        description="Test Description"
      />
    );
    expect(screen.getByDisplayValue('Test Form')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('renders custom body content when provided', () => {
    const customContent = <div>Custom Content</div>;
    render(
      <FormContentTile
        bodyContent={customContent}
        isMovable={true}
      />
    );
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('shows header with drag icon when movable', () => {
    render(
      <FormContentTile
        isMovable={true}
        title="Movable Form"
      />
    );
    expect(document.querySelector('.dragIcon')).toBeInTheDocument();
  });

  it('hides header when not movable', () => {
    render(
      <FormContentTile
        isMovable={false}
        title="Static Form"
      />
    );
    expect(document.querySelector('.noHeader')).toBeInTheDocument();
  });

  it('toggles description switch', () => {
    render(
      <FormContentTile
        isMovable={true}
        hasDescription={false}
        onDescriptionChange={mockOnDescriptionChange}
      />
    );
    
    const descSwitch = screen.getByText('Description').nextElementSibling?.querySelector('input[type="checkbox"]');
    if (descSwitch) {
      fireEvent.click(descSwitch);
    }
    
    expect(mockOnDescriptionChange).toHaveBeenCalledWith(true);
  });

  it('toggles required switch', () => {
    render(
      <FormContentTile
        isMovable={true}
        isRequired={false}
        onRequiredChange={mockOnRequiredChange}
      />
    );
    
    const reqSwitch = screen.getByText('Required').nextElementSibling?.querySelector('input[type="checkbox"]');
    if (reqSwitch) {
      fireEvent.click(reqSwitch);
    }
    
    expect(mockOnRequiredChange).toHaveBeenCalledWith(true);
  });

  it('calls onClone when clone icon clicked', () => {
    render(
      <FormContentTile
        isMovable={true}
        onClone={mockOnClone}
      />
    );
    
    const cloneIcon = screen.getByAltText('Clone').parentElement;
    if (cloneIcon) {
      fireEvent.click(cloneIcon);
    }
    
    expect(mockOnClone).toHaveBeenCalled();
  });

  it('calls onDelete when delete icon clicked', () => {
    render(
      <FormContentTile
        isMovable={true}
        onDelete={mockOnDelete}
      />
    );
    
    const deleteIcon = screen.getByAltText('Delete').parentElement;
    if (deleteIcon) {
      fireEvent.click(deleteIcon);
    }
    
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
