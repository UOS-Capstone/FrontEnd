import User from "./User";
import axios from "axios";
import { Action, handleActions } from "redux-actions";
import { initalState, UserState } from "./initialState";

const SIGNUP_REQUEST = 'User/SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'User/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'User/SIGNUP_FAILURE';

interface SignupSuccessPayload{
    data: string;
}
export const postSignup =(user:User) => async(dispatch:any) => {
    dispatch({type:SIGNUP_REQUEST});
    try{
        const res = await axios.post("https://25.15.132.100:8080/member/signup", user.formData,
        {
            headers:{
                'content-type':'multipart/form-data',
                'Access-Control-Allow-Origin':"https://25.15.132.100:8080",
            },
            transformRequest:(data, headers)=>{
                return data;
            },
        })
        dispatch({
            type:SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch(e){
        dispatch({
            type:SIGNUP_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};
const signupActions = handleActions<UserState, any>(
    {
        [SIGNUP_REQUEST]: (state:UserState) => ({
            ...state,
            loading: {
                ...state.loading,
                signup: true
            }
        }),
        [SIGNUP_SUCCESS]: (state:UserState, action:Action<SignupSuccessPayload>) => ({
            ...state,
            message:action.payload.data,
            loading: {
                ...state.loading,
                signup: false
            },
        }),
        [SIGNUP_FAILURE]: (state:UserState, action:Action<Error>) => ({
            ...state,
            loading: {
                ...state.loading,
                signup: false
            }
        })
    }, initalState
);
export default signupActions;