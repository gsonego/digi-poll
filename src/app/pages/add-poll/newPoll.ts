export interface NewPoll {
    title: string,
    votes?: number,
    options: number,
    [key: string]: any
}