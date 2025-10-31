import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormViewItem from '../FormViewItem';

describe('FormViewItem', () => {
    test('renders without crashing', () => {
        const { container } = render(<FormViewItem />);
        expect(container).toBeTruthy();
    });

    test('renders question text', () => {
        render(
            <FormViewItem
                questionText="What is your name?"
                order={1}
            />
        );
        expect(screen.getByText('What is your name?')).toBeInTheDocument();
    });

    test('renders question number', () => {
        render(
            <FormViewItem
                questionText="Test Question"
                order={5}
            />
        );
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('renders description when provided', () => {
        render(
            <FormViewItem
                questionText="Test"
                description="This is a description"
                order={1}
            />
        );
        expect(screen.getByText('This is a description')).toBeInTheDocument();
    });

    test('does not render description when empty', () => {
        render(
            <FormViewItem
                questionText="Test"
                description=""
                order={1}
            />
        );
        expect(screen.queryByText('')).not.toBeInTheDocument();
    });

    test('renders with text input type', () => {
        render(
            <FormViewItem
                questionText="Name"
                inputType="text"
                value="John"
                order={1}
            />
        );
        expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    });

    test('renders with dropdown options', () => {
        const options = [
            { id: '1', label: 'Option1', value: 'Option1' },
            { id: '2', label: 'Option2', value: 'Option2' }
        ];

        render(
            <FormViewItem
                questionText="Select"
                inputType="dropdown"
                options={options}
                order={1}
            />
        );

        // Check if select element exists
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeInTheDocument();
    });

    test('renders with placeholder', () => {
        render(
            <FormViewItem
                questionText="Test"
                inputType="text"
                valuePlaceholder="Enter your answer"
                order={1}
            />
        );
        expect(screen.getByPlaceholderText('Enter your answer')).toBeInTheDocument();
    });
});
