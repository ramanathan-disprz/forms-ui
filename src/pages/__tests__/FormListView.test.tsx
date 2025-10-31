import { render, screen, fireEvent } from '@testing-library/react';
import FormListView from '../FormListView';

// Mock dependencies
jest.mock('../../components/NavigationBar', () => {
  return function NavigationBar() {
    return <div>Navigation Bar</div>;
  };
});

jest.mock('../../components/buttons/PrimaryButton', () => {
  return function Button({ text, onClick }: any) {
    return <button onClick={onClick}>{text}</button>;
  };
});

jest.mock('../../components/FormCard', () => {
  return function FormCard({ id, title, publishedBy, isEnabled, isPublished }: any) {
    return (
      <div>
        <div>Form Card</div>
        <div>ID: {id}</div>
        <div>Title: {title}</div>
        <div>Status: {isPublished ? 'Published' : 'Draft'}</div>
      </div>
    );
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../../api/forms/useForms', () => ({
  useForms: jest.fn()
}));

import { useNavigate } from 'react-router-dom';
import { useForms } from '../../api/forms/useForms';

describe('FormListView', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders navigation bar', () => {
    (useForms as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });

    render(<FormListView />);
    expect(screen.getByText('Navigation Bar')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useForms as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    render(<FormListView />);
    expect(screen.getByText('Loading forms...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useForms as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to load forms' }
    });

    render(<FormListView />);
    expect(screen.getByText('Error loading forms: Failed to load forms')).toBeInTheDocument();
  });

  it('shows empty state when no forms exist', () => {
    (useForms as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });

    render(<FormListView />);
    expect(screen.getByText('Create a Form Template')).toBeInTheDocument();
    expect(screen.getByText('Create templates that can be used in various other features.')).toBeInTheDocument();
  });

  it('navigates to create form when Create Form clicked in empty state', () => {
    (useForms as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });

    render(<FormListView />);
    const createButton = screen.getByText('Create Form');
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith('/form-builder/create');
  });

  it('renders form list when forms exist', () => {
    const mockForms = [
      { id: '1', title: 'Form 1', publishedBy: 'User1', formStatus: 'PUBLISHED' },
      { id: '2', title: 'Form 2', publishedBy: 'User2', formStatus: 'DRAFT' }
    ];

    (useForms as jest.Mock).mockReturnValue({
      data: mockForms,
      isLoading: false,
      error: null
    });

    render(<FormListView />);
    expect(screen.getByText('Form List')).toBeInTheDocument();
    expect(screen.getByText('Title: Form 1')).toBeInTheDocument();
    expect(screen.getByText('Title: Form 2')).toBeInTheDocument();
  });

  it('renders search bar when forms exist', () => {
    (useForms as jest.Mock).mockReturnValue({
      data: [{ id: '1', title: 'Form 1' }],
      isLoading: false,
      error: null
    });

    render(<FormListView />);
    expect(screen.getByPlaceholderText('Search forms...')).toBeInTheDocument();
  });

  it('filters forms based on search term', () => {
    const mockForms = [
      { id: '1', title: 'Test Form', publishedBy: 'User1' },
      { id: '2', title: 'Another Form', publishedBy: 'User2' }
    ];

    (useForms as jest.Mock).mockReturnValue({
      data: mockForms,
      isLoading: false,
      error: null
    });

    render(<FormListView />);
    
    const searchInput = screen.getByPlaceholderText('Search forms...');
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    expect(screen.getByText('Title: Test Form')).toBeInTheDocument();
    expect(screen.queryByText('Title: Another Form')).not.toBeInTheDocument();
  });

  it('navigates to create form when Create Form clicked in header', () => {
    (useForms as jest.Mock).mockReturnValue({
      data: [{ id: '1', title: 'Form 1' }],
      isLoading: false,
      error: null
    });

    render(<FormListView />);
    const createButton = screen.getByText('Create Form');
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith('/form-builder/create');
  });

  it('handles empty search results', () => {
    const mockForms = [
      { id: '1', title: 'Test Form', publishedBy: 'User1' }
    ];

    (useForms as jest.Mock).mockReturnValue({
      data: mockForms,
      isLoading: false,
      error: null
    });

    render(<FormListView />);
    
    const searchInput = screen.getByPlaceholderText('Search forms...');
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });

    expect(screen.queryByText('Title: Test Form')).not.toBeInTheDocument();
  });
});
