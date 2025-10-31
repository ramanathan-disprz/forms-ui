import { render, screen } from '@testing-library/react';
import PreviewPage from '../PreviewPage';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

jest.mock('../FormResponseView', () => {
  return function FormResponseView({ formId }: any) {
    return (
      <div>
        <div>Form Response View</div>
        <div>Form ID: {formId}</div>
      </div>
    );
  };
});

import { useParams } from 'react-router-dom';

describe('PreviewPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FormResponseView with formId from params', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-form-123' });

    render(<PreviewPage />);
    expect(screen.getByText('Form Response View')).toBeInTheDocument();
    expect(screen.getByText('Form ID: test-form-123')).toBeInTheDocument();
  });

  it('uses default formId when id param is undefined', () => {
    (useParams as jest.Mock).mockReturnValue({});

    render(<PreviewPage />);
    expect(screen.getByText('Form Response View')).toBeInTheDocument();
    expect(screen.getByText('Form ID: 1')).toBeInTheDocument();
  });

  it('handles empty string id param', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '' });

    render(<PreviewPage />);
    expect(screen.getByText('Form Response View')).toBeInTheDocument();
    expect(screen.getByText('Form ID: 1')).toBeInTheDocument();
  });

  it('passes correct formId to FormResponseView', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'preview-456' });

    render(<PreviewPage />);
    expect(screen.getByText('Form ID: preview-456')).toBeInTheDocument();
  });
});
