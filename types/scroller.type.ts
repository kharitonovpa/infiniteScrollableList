export type Item = {
    id: string,
    name: string,
    website: string,
    views: number,
    avatar: string,
}

export type RecycleScrollerMethods = {
    scrollToPosition(index: number): void;

    getScroll(): {
        start: number | null,
        end: number | null
    };
}