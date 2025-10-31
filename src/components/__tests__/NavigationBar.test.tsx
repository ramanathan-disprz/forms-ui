import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NavigationBar from '../NavigationBar';

describe('NavigationBar', () => {
    test('renders without crashing', () => {
        const { container } = render(
            <NavigationBar />
        );
        expect(container).toBeTruthy();
    });
});
