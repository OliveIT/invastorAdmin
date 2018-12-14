import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ProductsService } from '../../services/index';
import { QueryParamsModel } from '../query-models/query-params.model';
import { BaseDataSource } from './_base.datasource';
import { QueryResultsModel } from '../query-models/query-results.model';

export class ProductsDataSource extends BaseDataSource {
	constructor(private productsService: ProductsService) {
		super();
	}

	loadProducts(queryParams: QueryParamsModel) {
		this.productsService.lastFilter$.next(queryParams);
        this.loadingSubject.next(true);

		this.productsService.findProducts(queryParams)
			.pipe(
				tap(res => {
					this.entitySubject.next(res.items);
					this.paginatorTotalSubject.next(res.totalCount);
				}),
				catchError(err => of(new QueryResultsModel([], err))),
				finalize(() => this.loadingSubject.next(false))
			).subscribe();
	}
}
