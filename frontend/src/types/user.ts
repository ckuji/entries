export type UserState = {
    fetchUserLoading: string,
    changeDescriptionLoading: string,
    userData: User,
    editableProfile: boolean,
    editableDescription: boolean,
    userRouterId: null | number
}

export type User = {
    id: number,
    login: string,
    owner: boolean,
    profile: Profile,
    emptyInitialProfile: boolean
}

type Profile = {
    description: string,
    initialDescription: string
}

export type DescriptionData = {
    text: string,
    userId: string
}