import { render, screen, fireEvent } from '@testing-library/react';
import FormControl from '../FormControl';

// Mock all the dependencies
jest.mock('../../components/NavigationBar', () => {
  return function NavigationBar() {
    return <div>Navigation Bar</div>;
  };
});

jest.mock('../../components/FormFooter', () => {
  return function FormFooter({ selectedTab, onNext, onPublish, onSaveDraft, onPreview }: any) {
    return (
      <div>
        <button onClick={onNext}>Next</button>
        <button onClick={onPublish}>Publish</button>
        <button onClick={onSaveDraft}>Save Draft</button>
        <button onClick={onPreview}>Preview</button>
      </div>
    );
  };
});

jest.mock('../../components/forms/FormConfig', () => {
  return function FormConfig({ formData, onFormChange }: any) {
    return (
      <div>
        <div>Form Configuration</div>
        <input 
          value={formData.title} 
          onChange={(e) => onFormChange('title', e.target.value)}
          placeholder="Form Title"
        />
      </div>
    );
  };
});

jest.mock('../../components/forms/FormLayout', () => {
  return function FormLayout({ formData, onFormChange }: any) {
    return <div>Form Layout</div>;
  };
});

jest.mock('../../components/forms/FormResponses', () => {
  return function FormResponses() {
    return <div>Form Responses</div>;
  };
});

jest.mock('../../api/forms/useForms', () => ({
  useCreateForm: jest.fn()
}));

jest.mock('../../features/forms/useFormStates', () => ({
  useSetFormState: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('react-hot-toast', () => ({
  default: {
    success: jest.fn()
  }
}));

import { useCreateForm } from '../../api/forms/useForms';
import { useSetFormState } from '../../features/forms/useFormStates';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

describe('FormControl', () => {
  const mockMutate = jest.fn();
  const mockNavigate = jest.fn();
  const mockSetFormState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateForm as jest.Mock).mockReturnValue({
      mutate: mockMutate
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSetFormState as jest.Mock).mockReturnValue(mockSetFormState);
  });

  it('renders navigation bar', () => {
    render(<FormControl />);
    expect(screen.getByText('Navigation Bar')).toBeInTheDocument();
  });

  it('renders form configuration tab by default', () => {
    render(<FormControl />);
    expect(screen.getByText('Form Configuration')).toBeInTheDocument();
  });

  it('renders all three tabs', () => {
    render(<FormControl />);
    expect(screen.getByText('Form Configuration')).toBeInTheDocument();
    expect(screen.getByText('Form Layout')).toBeInTheDocument();
    expect(screen.getByText('Form Responses')).toBeInTheDocument();
  });

  it('switches to layout tab when clicked', () => {
    render(<FormControl />);
    
    const layoutTab = screen.getByText('Form Layout');
    fireEvent.click(layoutTab);
    
    expect(screen.getByText('Form Layout')).toBeInTheDocument();
  });

  it('switches to responses tab when clicked', () => {
    render(<FormControl />);
    
    const responsesTab = screen.getByText('Form Responses');
    fireEvent.click(responsesTab);
    
    expect(screen.getByText('Form Responses')).toBeInTheDocument();
  });

  it('switches to layout tab when Next button clicked', () => {
    render(<FormControl />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Form Layout')).toBeInTheDocument();
  });

  it('calls save draft when Save Draft button clicked', () => {
    render(<FormControl />);
    
    const saveDraftButton = screen.getByText('Save Draft');
    fireEvent.click(saveDraftButton);
    
    expect(mockMutate).toHaveBeenCalled();
  });

  it('calls publish when Publish button clicked', () => {
    render(<FormControl />);
    
    const publishButton = screen.getByText('Publish');
    fireEvent.click(publishButton);
    
    expect(mockMutate).toHaveBeenCalled();
  });

  it('navigates to preview when Preview button clicked', () => {
    render(<FormControl />);
    
    const previewButton = screen.getByText('Preview');
    fireEvent.click(previewButton);
    
    expect(mockSetFormState).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/form-builder/preview/1');
  });

  it('shows success toast on successful form creation', () => {
    render(<FormControl />);
    
    const publishButton = screen.getByText('Publish');
    fireEvent.click(publishButton);
    
    // Get the onSuccess callback and call it
    const callArgs = mockMutate.mock.calls[0];
    const callbacks = callArgs[1];
    callbacks.onSuccess({ id: 'test-id' });
    
    expect(toast.success).toHaveBeenCalledWith('Form published successfully');
    expect(mockNavigate).toHaveBeenCalledWith('/form-builder');
  });

  it('shows success toast on successful draft save', () => {
    render(<FormControl />);
    
    const saveDraftButton = screen.getByText('Save Draft');
    fireEvent.click(saveDraftButton);
    
    // Get the onSuccess callback and call it
    const callArgs = mockMutate.mock.calls[0];
    const callbacks = callArgs[1];
    callbacks.onSuccess({ id: 'test-id' });
    
    expect(toast.success).toHaveBeenCalledWith('Draft saved successfully');
    expect(mockNavigate).toHaveBeenCalledWith('/form-builder');
  });

  it('updates form title when changed', () => {
    render(<FormControl />);
    
    const titleInput = screen.getByPlaceholderText('Form Title');
    fireEvent.change(titleInput, { target: { value: 'New Form Title' } });
    
    expect(titleInput).toHaveValue('New Form Title');
  });
});
