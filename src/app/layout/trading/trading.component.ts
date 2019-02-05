import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Share } from '../../shared/model/share';
import { TradingService } from '../../shared/services';
import { DatasetData } from '../../shared/model/datasetData';

@Component({
    selector: 'app-charts',
    templateUrl: './trading.component.html',
    styleUrls: ['./trading.component.scss'],
    animations: [routerTransition()]
})
export class TradingComponent implements OnInit {

    private weekdays: string[] = ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'];

    // Portfolio
    public shares: Share[] = [];
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail-Order Sales'
    ];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType = 'doughnut';

    // lineChart
    public timeSeries: Array<any> = [
        {data: [], label: ''}
    ];
    public timeSeriesLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true
    };

    public lineChartLegend = true;
    public lineChartType = 'line';

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor(private tradingService: TradingService) {
    }

    ngOnInit() {
        this.tradingService.getShares(0, 100)
            .subscribe(result => {
                this.shares = result.content;
                this.shares.forEach(share => {
                    this.tradingService.getTimeSeries(share.database_code, share.dataset_code, '1')
                        .subscribe(response => {
                            const data = response.dataset.data[0];
                            share.currentValue = data.last;
                            share.totalGain = share.currentValue - share.entryValue;
                            share.gainVariation = share.totalGain / share.entryValue;
                        });
                });
            });

        const now = Date.now();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now - i * 1000 * 60 * 60 * 24);
            this.timeSeriesLabels.push(this.weekdays[d.getDay()] + ' ' + d.getMonth() + '/' + d.getDate());
        }
    }

    initChart(share: Share) {
        this.tradingService.getTimeSeries(share.database_code, share.dataset_code, '7')
            .subscribe(response => {
                this.timeSeries = [
                    {data: response.dataset.data.reverse().map(d => d.last), label: share.name}
                ];
            });
    }
}
