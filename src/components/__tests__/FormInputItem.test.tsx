import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FormInputItem from '../FormInputItem';

describe('FormInputItem', () => {
    test('renders without crashing', () => {
        const { container } = render(
            <FormInputItem inputType="text" />
        );
        expect(container).toBeTruthy();
    });
});
