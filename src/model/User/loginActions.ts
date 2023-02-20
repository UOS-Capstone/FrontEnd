import User from "./User";
import axios from "axios";
import { Action, handleActions } from 'redux-actions';
import { initalState, UserState } from "./initialState";

const LOGIN_REQUSET = 'User/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'User/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'User/LOGIN_FAILURE';

interface LoginSuccessPayload{
    data: string;
}

export const postLogin = (user: User) => async (dispatch: any) => {
    dispatch({ type: LOGIN_REQUSET });
    try {
        const res = await axios.post("https://25.15.132.100:8080/member/login", user.loginData,
            {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': "https://25.15.132.100:8080",
                },
                transformRequest: (data, headers) => {
                    return data;
                },
            })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};
const loginActions = handleActions<UserState, any>(
    {
        [LOGIN_REQUSET]: (state: UserState) => ({
            ...state,
            loading: {
                ...state.loading,
                login: true
            }
        }),
        [LOGIN_SUCCESS]: (state: UserState, action: Action<LoginSuccessPayload>) => ({
            ...state,
            accessToken: action.payload.data,
            loading: {
                ...state.loading,
                login: false
            }
        }),
        [LOGIN_FAILURE]: (state: UserState, action: Action<Error>) => ({
            ...state,
            loading: {
                ...state.loading,
                login: false,
            }
        })
    },
    initalState
);
export default loginActions;