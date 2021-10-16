import React from 'react';

import StyledThemeSelector from './StyledThemeSelector';
import RadioGroup from '../RadioGroup/RadioGroup';
import { readRecord } from '../../utils/localStorageService';

class ThemeSelector extends React.Component<{changeTheme: () => void}> {
    public render() {
        return (
            <StyledThemeSelector>
                <label>
                <RadioGroup
                    radioGroupName={'test'}
                    leftRadioValue={'light'}
                    rightRadioValue={'dark'}
                    callback={this.handleCallback}
                />
                </label>
            </StyledThemeSelector>
        );
    }

    private handleCallback = () => {
        this.props.changeTheme();
    }
}

export default ThemeSelector;