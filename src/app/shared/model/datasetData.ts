export class DatasetData {
    public id: number;
    public description: string;
    public name: string;

    public newest_available_date: Date;
    public oldest_available_date: Date;

    public column_names: string[];

    public start_date: Date;
    public end_date: Date;

    public frequency: string;

    public data: Data[];
    public limit: number;
}

export class Data {
    public date: Date;
    public open: number;
    public high: number;
    public low: number;
    public last: number;
    public volume: number;
    public turnover: number;
}
