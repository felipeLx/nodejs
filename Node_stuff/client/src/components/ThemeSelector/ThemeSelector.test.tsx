import { shallow } from 'enzyme';
import React from 'react';
import ThemeSelector from './ThemeSelector';

jest.mock('../../utils/localStorageService');

const setup = () => {
    return shallow(<ThemeSelector changeTheme={jest.fn()} />)
};

describe('ThemeSelector component', () => {
    it('renders without crash', () => {
        const wrapper = setup();
        expect(wrapper).not.toBe('null')
    });
});