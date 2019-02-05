import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from './trading.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts, TradingRoutingModule, PageHeaderModule],
    declarations: [TradingComponent]
})
export class TradingModule {}
