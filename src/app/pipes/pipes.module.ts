import { NgModule } from '@angular/core';
import { FilterUniquePipe } from './filter-unique/filter-unique';
import { OrderByPipe } from './../pipes/order-by/order-by';
@NgModule({
	declarations: [FilterUniquePipe,
    OrderByPipe],
	imports: [],
	exports: [FilterUniquePipe,
    OrderByPipe]
})
export class PipesModule {}
