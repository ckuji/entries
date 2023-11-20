export type UserFields = {
    login: string
    password: string
    email: string
}

export type UserValidationError = {
    constraints: {[key: string]: string}
    property: string
}

export type FormErrorsKeyArray = {
    [key: string]: string[]
}

export type StatusMessageConstuction = {
    status: string,
    message: string
}

export interface BaseState {
    logoutLoading: string,
    fetchUserLoading: string,
    logouted: boolean,
    userName: string
};