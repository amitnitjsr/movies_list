import Data from '../../Asset/data/data';
import * as ActionTypes from '../Action/Action';

const iState = {
    list: Data,
    loginData: [{ name: 'Admin', password: '12345', email: 'abc@gmail.com' }],
    isSignedIn: false,
    isAdmin: false
};

const sessionValueSet = (value = false) => {

    sessionStorage.setItem("isUserLogged", value);
    console.log('seession', value)
}

const reducer = (state = iState, action) => {

    switch (action.type) {

        case ActionTypes.signInFun:
            sessionValueSet(action.payload.isSignedIn);
            return {
                "loginData": state.loginData,
                "list": state.list,
                "isSignedIn": action.payload.isSignedIn,
                "isAdmin": state.isAdmin
            }
        case ActionTypes.adminLogin:
            return {
                "loginData": state.loginData,
                "list": state.list,
                "isSignedIn": state.isSignedIn,
                "isAdmin": action.payload.isAdmin
            }
        case ActionTypes.createUser:
            const n = { "name": action.payload.name, "password": action.payload.password, "email": action.payload.email }
            return {
                "loginData": [...state.loginData, n],
                "list": state.list,
                "isSignedIn": state.isSignedIn,
                "isAdmin": state.isAdmin
            }
        default:
            return state;
    }
}

export default reducer;