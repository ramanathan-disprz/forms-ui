import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FormVisiblity from '../FormVisiblity';

describe('FormVisiblity', () => {
    test('renders without crashing', () => {
        const { container } = render(
            <FormVisiblity enabled={false} onToggle={() => {}} />
        );
        expect(container).toBeTruthy();
    });
});
