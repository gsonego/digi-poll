export interface NewPoll {
    title: string,
    votes?: number,
    optionCount: number,
    [key: string]: any
}