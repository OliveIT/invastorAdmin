import { from } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { ProductRemarksService } from '../../services/index';
import { QueryParamsModel } from '../query-models/query-params.model';
import { BaseDataSource } from './_base.datasource';
import { ListStateModel } from '../../utils/list-state.model';
import { environment } from '../../../../../../../../../environments/environment';
export class ProductRemarksDataSource extends BaseDataSource {
	constructor(private productRemarksService: ProductRemarksService) {
		super();
	}

	loadRemarks(queryParams: QueryParamsModel, lastState: ListStateModel) {
		this.loadingSubject.next(true);

		this.productRemarksService.findRemarks(queryParams, lastState)
			.pipe(
				catchError(() => from([])),
				finalize(() => this.loadingSubject.next(false))
			).subscribe(res => {
				this.entitySubject.next(res.items);
				this.paginatorTotalSubject.next(res.totalCount);
			});
	}
}
