import { shallow } from 'enzyme';
import RadioGroup from './RadioGroup';

const setup = (isLeftChecked = true) => {
    return shallow(
        <RadioGroup 
            isLeftChecked={isLeftChecked}
            radioGroupName={'test'}
            leftRadioLabel={'Left'}
            rightRadioLabel={'Right'}
            leftRadioValue={'Light'}
            rightRadioValue={'Dark'}
            callback={jest.fn()}
        />
    )

    describe('RadioGroup component', )
};


export default StyledRadioGroup;