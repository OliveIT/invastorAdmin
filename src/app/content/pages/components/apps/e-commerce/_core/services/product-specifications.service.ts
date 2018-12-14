import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { SpecificationsService } from './specification.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { ProductSpecificationModel } from '../models/product-specification.model';
import { environment } from '../../../../../../../../environments/environment';
import { ListStateModel } from '../utils/list-state.model';

const API_PRODUCTSPECS_URL = 'api/productSpecs';
// Real REST API
@Injectable()
export class ProductSpecificationsService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService,
		private specificationsService: SpecificationsService) { }

	// CREATE =>  POST: add a new product specification to the server
	createSpec(spec): Observable<ProductSpecificationModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductSpecificationModel>(API_PRODUCTSPECS_URL, spec, { headers: httpHeaders });
	}

	// READ
	// Server should return filtered specs by productId
	getAllSpecsByProductId(productId: number): Observable<ProductSpecificationModel[]> {
		const url = API_PRODUCTSPECS_URL + '?productId=' + productId;
		return this.http.get<ProductSpecificationModel[]>(url);
	}

	getSpecById(specId: number): Observable<ProductSpecificationModel> {
		return this.http.get<ProductSpecificationModel>(API_PRODUCTSPECS_URL + `/${specId}`);
	}

	// Server should return sorted/filtered specs and merge with items from state
	findSpecs(queryParams: QueryParamsModel, lastState: ListStateModel): Observable<ProductSpecificationModel[]> {
		const url = API_PRODUCTSPECS_URL + '/find';
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const body = {
			state: lastState
		};
		return this.http.post<ProductSpecificationModel[]>(url, body, { headers: httpHeaders, params: httpParams });
	}

	// UPDATE => PUT: update the product specification on the server
	updateSpec(spec: ProductSpecificationModel): Observable<any> {
		console.log('run u', spec);
		return this.http.put(API_PRODUCTSPECS_URL, spec, { headers: this.httpUtils.getHTTPHeaders() });
	}

	// DELETE => delete the product specification from the server
	deleteSpec(spec: ProductSpecificationModel): Observable<ProductSpecificationModel> {
		console.log('run d', spec);
		const url = `${API_PRODUCTSPECS_URL}/${spec.id}`;
		return this.http.delete<ProductSpecificationModel>(url);
	}
}

