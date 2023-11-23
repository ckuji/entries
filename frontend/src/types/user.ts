export type UserState = {
    fetchUserLoading: string,
    changeDescriptionLoading: string,
    createLinkLoading: string,
    userData: User,
    editablePage: boolean,
    editableDescription: boolean,
    userRouterId: null | number,
    editableLinks: boolean
}

export type User = {
    id: number,
    login: string,
    owner: boolean,
    profile: Profile,
    emptyInitialProfile: boolean,
    links: Link[]
}

type Profile = {
    description: string,
    initialDescription: string
}

export type Link = {
    linkBase: string,
    description: string,
}

export interface LinkWithUserId extends Link {
    userId: string
}

export type DescriptionData = {
    text: string,
    userId: string
}