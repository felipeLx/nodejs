import moment from 'moment';

export const setLocalStorage = (responseObj) => {
    const expires = moment().add(responseObj.expiresIn);
    localStorage.setItem('token', responseObj.token);
    localStorage.setItem('userId', responseObj.user._id);
    localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
}          

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('userId');
}

export const isLoggedIn = () => {
    return moment().isBefore(getExpiration());
}

export const isLoggedOut = () => {
    return !isLoggedIn();
}

export const getExpiration = () => {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
}

const authService = {
    setLocalStorage,
    logout,
    isLoggedIn,
    isLoggedOut,
    getExpiration
};

export default authService;