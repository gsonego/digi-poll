export interface NewPoll {
    title: string;
    votes?: number;
    optionCount: number;
    active: boolean;
    [key: string]: any;
}