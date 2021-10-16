import * as actionType from './actionTypes';

// ,

export const messageReceived = (message: { from: string, content: string, time: string }) => {
    return {
        type: actionType.SEND_MESSAGE_RESPONSE,
        message
    };
};

export const sendMessage = (message: {from: string, content: string, time: string}) => {
    return {
        type: actionType.SEND_MESSAGE_REQUEST,
        message
    };
};

export const messageSent = () => {
    return {
        type: actionType.MESSAGE_SENT
    };
};

export const changeUsername = (username: string) => {
    return {
        type: actionType.USER_CHANGED,
        username
    };
};