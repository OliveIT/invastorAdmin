import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { ProductRemarkModel } from '../models/product-remark.model';
import { ListStateModel } from '../utils/list-state.model';
import * as _ from 'lodash';
import { QueryResultsModel } from '../models/query-models/query-results.model';

const API_PRODUCTREMARKS_URL = 'api/productRemarks';
// Fake REST API (Mock)
// This code emulates server calls
@Injectable()
export class ProductRemarksService {
	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService
	) {}

	// CREATE =>  POST: add a new product remark to the server
	createRemark(remark): Observable<ProductRemarkModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductRemarkModel>(
			API_PRODUCTREMARKS_URL,
			remark,
			{ headers: httpHeaders }
		);
	}

	// READ
	getAllRemarksByProductId(
		productId: number
	): Observable<ProductRemarkModel[]> {
		return this.http
			.get<ProductRemarkModel[]>(API_PRODUCTREMARKS_URL)
			.pipe(
				map(remarks => remarks.filter(rem => rem.carId === productId))
			);
	}

	getRemarkById(remarkId: number): Observable<ProductRemarkModel> {
		return this.http.get<ProductRemarkModel>(
			API_PRODUCTREMARKS_URL + `/${remarkId}`
		);
	}

	findRemarks(
		queryParams: QueryParamsModel,
		lastState: ListStateModel
	): Observable<QueryResultsModel> {
		return this.getAllRemarksByProductId(lastState.entityId).pipe(
			mergeMap(res => {
				// tslint:disable-next-line:prefer-const
				let filteredResult = [];
				if (lastState.deletedItems.length > 0) {
					res.forEach(element => {
						const d_index = _.findIndex(lastState.deletedItems, function(o) {
							return o.id === element.id;
						});
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
							element.text = _rem.text;
						}
					});
				}

				// Add: New
				if (lastState.addedItems.length > 0) {
					lastState.addedItems.forEach(element => {
						filteredResult.push(element);
					});
				}

				const result = this.httpUtils.baseFilter(filteredResult, queryParams, []);
				return of(result);
			})
		);
	}

	// UPDATE => PUT: update the product remark
	updateRemark(remark: ProductRemarkModel): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_PRODUCTREMARKS_URL, remark, {
			headers: httpHeaders
		});
	}

	// DELETE => delete the product remark
	deleteRemark(remark: ProductRemarkModel): Observable<ProductRemarkModel> {
		const url = `${API_PRODUCTREMARKS_URL}/${remark.id}`;
		return this.http.delete<ProductRemarkModel>(url);
	}
}
