import React from 'react';

import StyledPageContainer from '../StyledPageContainer/StyledPageContainer';
import UserProfile from '../../UserProfile/UserProfile';
import ThemeSelector from '../../ThemeSelector/ThemeSelector';

const SettingsPage = ({ changeTheme } : 
                        { changeTheme: () => void }) => {
        <StyledPageContainer>
            <UserProfile />
            <ThemeSelector changeTheme={changeTheme}/>
            <ClockModeSelector translations={appContext}/>
            <SendingOptions translations={appContext}/>
            <ResetButton translations={appContext}/>
        </StyledPageContainer>

};

export default SettingsPage;