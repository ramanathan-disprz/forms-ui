import { render, screen, fireEvent } from '@testing-library/react';
import LearnerFormListView from '../LearnerFormListView';

// Mock dependencies
jest.mock('../../components/NavigationBar', () => {
  return function NavigationBar() {
    return <div>Navigation Bar</div>;
  };
});

jest.mock('../../components/learner/FormList', () => {
  return function FormList() {
    return <div>Form List Component</div>;
  };
});

jest.mock('../../components/learner/Submission', () => {
  return function Submission() {
    return <div>Submission Component</div>;
  };
});

describe('LearnerFormListView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders navigation bar', () => {
    render(<LearnerFormListView />);
    expect(screen.getByText('Navigation Bar')).toBeInTheDocument();
  });

  it('renders both tabs', () => {
    render(<LearnerFormListView />);
    expect(screen.getByText('Self-Service Forms')).toBeInTheDocument();
    expect(screen.getByText('My Submissions')).toBeInTheDocument();
  });

  it('shows FormList component by default', () => {
    render(<LearnerFormListView />);
    expect(screen.getByText('Form List Component')).toBeInTheDocument();
    expect(screen.queryByText('Submission Component')).not.toBeInTheDocument();
  });

  it('switches to submissions tab when clicked', () => {
    render(<LearnerFormListView />);
    
    const submissionsTab = screen.getByText('My Submissions');
    fireEvent.click(submissionsTab);
    
    expect(screen.getByText('Submission Component')).toBeInTheDocument();
    expect(screen.queryByText('Form List Component')).not.toBeInTheDocument();
  });

  it('switches back to forms tab when clicked', () => {
    render(<LearnerFormListView />);
    
    const submissionsTab = screen.getByText('My Submissions');
    fireEvent.click(submissionsTab);
    
    const formsTab = screen.getByText('Self-Service Forms');
    fireEvent.click(formsTab);
    
    expect(screen.getByText('Form List Component')).toBeInTheDocument();
    expect(screen.queryByText('Submission Component')).not.toBeInTheDocument();
  });

  it('applies active class to selected tab', () => {
    render(<LearnerFormListView />);
    
    const formsTab = screen.getByText('Self-Service Forms');
    const submissionsTab = screen.getByText('My Submissions');
    
    expect(formsTab.className).toContain('active');
    expect(submissionsTab.className).not.toContain('active');
    
    fireEvent.click(submissionsTab);
    
    expect(formsTab.className).not.toContain('active');
    expect(submissionsTab.className).toContain('active');
  });
});
