
export type UserState = {
    message: string;
    accessToken: string;
    //refreshToken: string;
    loading: {
        signup: boolean;
        login: boolean;
    }
}

export const initalState = {
    message: '',
    accessToken: '',
    //refeshToken: '',
    loading: {
        signup: false,
        login: false
    }
};