import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { readRecord } from '../../utils/localStorageService';
import StyledUserProfile from './StyledUserProfile';
import * as actions from '../../store/action';

interface IUserProfileState {
    username: string;
};

export class UserProfile extends React.Component {
    public state: IUserProfileState = {
        username: readRecord('username') || 'guest0001'
    };

    public render () {
        const { username } = this.state;

        return (
            <StyledUserProfile>
                <label>username
                    <input
                        type='text'
                        name='username'
                        value={username}
                        onChange={this.handleUsernameChange}
                    />
                </label>
            </StyledUserProfile>
        );
    }

    private handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({username: event.currentTarget.value});
        // @ts-ignore
        this.props.changeUsername(event.currentTarget.value);
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeUsername: (username: string) => dispatch(actions.changeUsername(username))
})


export default connect(null, mapDispatchToProps) (UserProfile);