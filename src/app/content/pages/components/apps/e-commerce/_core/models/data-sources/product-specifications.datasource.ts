import { from } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { ProductSpecificationsService } from '../../services/index';
import { QueryParamsModel } from '../query-models/query-params.model';
import { BaseDataSource } from './_base.datasource';
import { ListStateModel } from '../../utils/list-state.model';

export class ProductSpecificationsDataSource extends BaseDataSource {
	constructor(private productSpecificationService: ProductSpecificationsService) {
		super();
	}

	loadSpecs(queryParams: QueryParamsModel, lastState: ListStateModel) {
		this.loadingSubject.next(true);
		this.productSpecificationService
			.findSpecs(queryParams, lastState)
			.pipe(
				catchError(() => from([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe(res => {
				this.entitySubject.next(res.items);
				this.paginatorTotalSubject.next(res.totalCount);
			});
	}
}
