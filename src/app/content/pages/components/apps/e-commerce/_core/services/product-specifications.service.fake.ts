import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { SpecificationsService } from './specification.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { ProductSpecificationModel } from '../models/product-specification.model';
import { ListStateModel } from '../utils/list-state.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import * as _ from 'lodash';

const API_PRODUCTSPECS_URL = 'api/productSpecs';
// Fake REST API (Mock)
// This code emulates server calls
@Injectable()
export class ProductSpecificationsService {
	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService,
		private specificationsService: SpecificationsService
	) {}

	// CREATE =>  POST: add a new product specification to the server
	createSpec(spec): Observable<ProductSpecificationModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductSpecificationModel>(
			API_PRODUCTSPECS_URL,
			spec,
			{ headers: httpHeaders }
		);
	}

	// READ
	getAllSpecsByProductId(
		productId: number
	): Observable<ProductSpecificationModel[]> {
		const specs = this.specificationsService.getSpecs();
		const prodSpecs = this.http
			.get<ProductSpecificationModel[]>(API_PRODUCTSPECS_URL)
			.pipe(
				map(productSpecifications =>
					productSpecifications.filter(ps => ps.carId === productId)
				)
			);

		return forkJoin(specs, prodSpecs).pipe(
			map(res => {
				const _specs = res[0];
				const _prodSpecs = res[1];
				// tslint:disable-next-line:prefer-const
				let result: ProductSpecificationModel[] = [];
				_prodSpecs.forEach(item => {
					const _item = Object.assign({}, item);
					const sp = _specs.find(
						s => s.id.toString() === item.specId.toString()
					);
					if (sp) {
						_item._specificationName = sp.name;
					}
					result.push(_item);
				});
				return result;
			})
		);
	}

	getSpecById(specId: number): Observable<ProductSpecificationModel> {
		return this.http.get<ProductSpecificationModel>(
			API_PRODUCTSPECS_URL + `/${specId}`
		);
	}

	findSpecs(
		queryParams: QueryParamsModel,
		lastState: ListStateModel
	): Observable<QueryResultsModel> {
		return this.getAllSpecsByProductId(lastState.entityId).pipe(
			mergeMap(res => {
				// tslint:disable-next-line:prefer-const
				let filteredResult = [];
				if (lastState.deletedItems.length > 0) {
					res.forEach(element => {
						const d_index = _.findIndex(
							lastState.deletedItems,
							function(o) {
								return o.id === element.id;
							}
						);
						if (d_index === -1) {
							filteredResult.push(element);
						}
					});
				} else {
					filteredResult = res;
				}

				// Update: Updated Items
				if (lastState.updatedItems.length > 0) {
					filteredResult.forEach(element => {
						const _rem = _.find(lastState.updatedItems, function(o) {
							return o.id === element.id;
						});
						if (_rem) {
							element._specificationName =
								_rem._specificationName;
							element.value = _rem.value;
							element.specId = _rem.specId;
						}
					});
				}

				// Add: New
				if (lastState.addedItems.length > 0) {
					lastState.addedItems.forEach(element => {
						filteredResult.push(element);
					});
				}

				const result = this.httpUtils.baseFilter(
					filteredResult,
					queryParams,
					[]
				);
				return of(result);
			})
		);
	}

	// UPDATE => PUT: update the product specification on the server
	updateSpec(spec: ProductSpecificationModel): Observable<any> {
		console.log('run u', spec);
		return this.http.put(API_PRODUCTSPECS_URL, spec, {
			headers: this.httpUtils.getHTTPHeaders()
		});
	}

	// DELETE => delete the product specification from the server
	deleteSpec(
		spec: ProductSpecificationModel
	): Observable<ProductSpecificationModel> {
		console.log('run d', spec);
		const url = `${API_PRODUCTSPECS_URL}/${spec.id}`;
		return this.http.delete<ProductSpecificationModel>(url);
	}
}
