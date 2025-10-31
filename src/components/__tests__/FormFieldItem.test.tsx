import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FormFieldItem from '../FormFieldItem';

describe('FormFieldItem', () => {
    test('renders without crashing', () => {
        const { container } = render(
            <FormFieldItem label="Test" value="Value" />
        );
        expect(container).toBeTruthy();
    });
});
