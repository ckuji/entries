export type UserState = {
    fetchUserLoading: string,
    changeDescriptionLoading: string,
    createLinkLoading: string,
    updateLinkLoading: string,
    deleteLinkLoading: string,
    createExpItemLoading: string,
    updateExpItemLoading: string,
    deleteExpItemLoading: string,
    userData: User,
    editablePage: boolean,
    editableDescription: boolean,
    userRouterId: null | number,
    editableLinks: boolean,
    editedLinksItem: null | number,
    editableExperience: boolean,
    editedExpItem: null | number
}

export type User = {
    id: number,
    login: string,
    owner: boolean,
    profile: Profile,
    emptyInitialProfile: boolean,
    links: Link[],
    experience: ExpItem[]
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
    id: number,
    createdAt?: Date
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

export interface IUnitsItem {
    name: string,
    addition: string
}

export interface IUnitsItemWithId extends IUnitsItem {
    id: number
}

export interface IUnitsItemWithUnitId extends IUnitsItem {
    unitId: number
}

export interface ExpItemSample {
    name: string,
    percent: number,
}

export interface ExpItem extends ExpItemSample {
    id: number
}

export interface ExpWithUserId extends ExpItemSample {
    userId: string
}

export interface ExpItemWithUserAndExpItemIds extends ExpWithUserId {
    id: number
}

export type ExperienceAndUserIds = {
    id: number,
    userId: string
}

export type TransformLinks = {
    linkBase?: string,
    description?: string,
    name: string,
    addition: string,
    id: number
}

export type TransformExperience = {
    percent?: number,
    name: string,
    addition: string,
    id: number
}