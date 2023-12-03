type DayUnit = {
    name: string,
    percent: number
}

export class CommonDayDto {
    readonly userId: string
    readonly date: string
    readonly description: string
    readonly hours: number
    readonly dayUnits: DayUnit[]
}