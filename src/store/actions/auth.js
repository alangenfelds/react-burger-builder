import axios from 'axios';

import * as actionTypes from '../../store/actions/actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return  {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout() );
        }, expirationTime * 1000)
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        // authenticate
        dispatch( authStart() );
        const authRequestBody = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // sign up URL
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDwqmE6SFKSRGgpLRUgmmVedXug74CjTFQ';
        if (!isSignup) {
            //sign in URL
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDwqmE6SFKSRGgpLRUgmmVedXug74CjTFQ';
        }
        axios.post(url, authRequestBody)
        .then(response => {
            console.log(response);
            dispatch( authSuccess(response.data.idToken, response.data.localId) );
            dispatch( checkAuthTimeout(response.data.expiresIn) );
        })
        .catch(err => {
            console.log(err);
            dispatch( authFail(err.response.data.error) );
        })
    };
};