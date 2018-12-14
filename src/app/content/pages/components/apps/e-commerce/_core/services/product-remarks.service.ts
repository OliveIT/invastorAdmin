import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { ProductRemarkModel } from '../models/product-remark.model';
import { ListStateModel } from '../utils/list-state.model';

const API_PRODUCTREMARKS_URL = 'api/productRemarks';
// Real REST API
@Injectable()
export class ProductRemarksService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product remark to the server
	createRemark(remark): Observable<ProductRemarkModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductRemarkModel>(API_PRODUCTREMARKS_URL, remark, { headers: httpHeaders });
	}

	// READ
	// Server should return filtered remarks by productId
	getAllRemarksByProductId(productId: number): Observable<ProductRemarkModel[]> {
		const url = API_PRODUCTREMARKS_URL + '?productId=' + productId;
		return this.http.get<ProductRemarkModel[]>(url);
	}

	getRemarkById(remarkId: number): Observable<ProductRemarkModel> {
		return this.http.get<ProductRemarkModel>(API_PRODUCTREMARKS_URL + `/${remarkId}`);
	}

	// Server should return sorted/filtered remarks and merge with items from state
	findRemarks(queryParams: QueryParamsModel, lastState: ListStateModel): Observable<ProductRemarkModel[]> {
		const url = API_PRODUCTREMARKS_URL + '/find';
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const body = {
			state: lastState
		};
		return this.http.post<ProductRemarkModel[]>(url, body, { headers: httpHeaders, params: httpParams });
	}

	// UPDATE => PUT: update the product remark
	updateRemark(remark: ProductRemarkModel): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_PRODUCTREMARKS_URL, remark, { headers: httpHeaders });
	}

	// DELETE => delete the product remark
	deleteRemark(remark: ProductRemarkModel): Observable<ProductRemarkModel> {
		const url = `${API_PRODUCTREMARKS_URL}/${remark.id}`;
		return this.http.delete<ProductRemarkModel>(url);
	}
}
