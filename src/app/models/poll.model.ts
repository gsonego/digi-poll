export interface Poll {
    id: string;
    title: string;
    creation: string;
    userId: string;
    votes: number;
    optionCount: number;
    [key: string]: any
}