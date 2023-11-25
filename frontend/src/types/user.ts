export type UserState = {
    fetchUserLoading: string,
    changeDescriptionLoading: string,
    createLinkLoading: string,
    updateLinkLoading: string,
    deleteLinkLoading: string,
    userData: User,
    editablePage: boolean,
    editableDescription: boolean,
    userRouterId: null | number,
    editableLinks: boolean,
    editedLinksItem: null | number
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

export type LinkSample = {
    linkBase: string,
    description: string
}

export interface Link extends LinkSample {
    id: number
}

export interface LinkWithUserId extends LinkSample {
    userId: string
}

export interface LinkWithUserAndLinkIds extends Link {
    userId: string
}

export type LinkAndUserIds = {
    id: number,
    userId: string
}

export type DescriptionData = {
    text: string,
    userId: string
}