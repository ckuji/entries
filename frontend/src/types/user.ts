export type UserState = {
    fetchUserLoading: string,
    userData: User,
    editableProfile: boolean,
    editableDescription: boolean,
}

export type User = {
    id: number,
    login: string,
    owner: boolean,
    profile: Profile,
}

type Profile = {
    description: string,
    initialDescription: string
}