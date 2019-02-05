export class Page<T> {
    public content: T[];
    public last: boolean;
    public first: boolean;
    public totalPages: number;
    public totalElements: number;
    public numberOfElements: number;
    public size: number;
}
