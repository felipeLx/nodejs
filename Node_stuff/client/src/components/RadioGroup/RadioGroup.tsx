import React from 'react';

import StyledRadioGroup from './StyledRadioGroup';

interface IRadioGroupProps {
    leftRadioLabel: string;
    leftRadioValue: string;
    rightRadioLabel: string;
    rightRadioValue: string;
    radioGroupName: string;
    callback: (val: string) => void;
    isLeftChecked: boolean;
}

interface IRadioGroupState {
    isChecked: boolean
}

class RadioGroup extends React.Component<IRadioGroupProps, {}> {
    public state: IRadioGroupState = {
        isChecked: this.props.isLeftChecked
    };

    render() {
        const {
            leftRadioLabel,
            leftRadioValue,
            rightRadioLabel,
            rightRadioValue,
            radioGroupName
          } = this.props;
      
          const { isChecked } = this.state;

        return(
            <StyledRadioGroup>
                <div></div>
            </StyledRadioGroup>
        )
    };
};

export default RadioGroup;
