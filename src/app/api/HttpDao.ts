import { HttpClient, HttpHeaders } from '@angular/common/http';
import { merge, Observable, of as observableOf } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from './api';
import { HttpTableApi, UserModel, HTTPNormalResponse } from './structure';
import { TokenStorage } from '../core/auth/token-storage.service';

export class HttpDao {
    constructor(private http: HttpClient,
                private tokenStorage: TokenStorage) {}
  
    async getAuthenticatedHeader(): Promise<HttpHeaders> {
        const accessToken = await this.tokenStorage.getAccessToken().toPromise();

        return new HttpHeaders({
            "x-access-token": accessToken,
            "Content-Type": "application/json"
        });
    }

    async getUserList(dataFilter): Promise<HttpTableApi<UserModel>> {
        const requestUrl = environment.API_URL + API.USER_GET_LIST;
        
        var headers = await this.getAuthenticatedHeader();

        return this.http.post<HttpTableApi<UserModel>>(requestUrl, dataFilter, { headers: headers }).toPromise();
    }

    async setUserStatus(_id: String, status: Boolean): Promise<HTTPNormalResponse> {
        return this.http.post<HTTPNormalResponse>(
            environment.API_URL + API.USER_SET_STATUS, 
            { _id: _id,
            status: status }, 
            { headers: await this.getAuthenticatedHeader() }
        ).toPromise();
    }

    async getUserInformation(_id: String): Promise<UserModel> {
        return this.http.post<UserModel>(
            environment.API_URL + API.USER_GET_INFORMATION, 
            { _id: _id }, 
            { headers: await this.getAuthenticatedHeader() }
        ).toPromise();
    }
}