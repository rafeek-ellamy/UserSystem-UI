import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseApiService } from '../../common-services/base-api.service';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../../data-models/shared-models';
import { CreateSystemUserOutputDto, UpdateSystemUserOutputDto, UserModel } from '../../data-models/users-models';
import { QueryStringBuilder } from '../../../shared/class/query-string-builder';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private controllerUrl: string = `${environment.appConfig.apiUrl}/api/system-user/`;
  constructor(private baseApi: BaseApiService<any>) { }

  getAll(Name:string | null,UserName:string | null,Email:string | null,PageIndex:number,PageSize:number): Observable<PaginatedResponse<UserModel>> {
    const params = { Name: Name, UserName: UserName, Email: Email, PageIndex:PageIndex, PageSize:PageSize};
    const queryString = QueryStringBuilder.buildQueryString(params);
    return this.baseApi.Get(`${this.controllerUrl}get-all${queryString}`);
  }

  getById(userId:string | null): Observable<ApiResponse<UserModel>> {
    return this.baseApi.Get(`${this.controllerUrl}get-by-id?userId=${userId}`);
  }

  create(body: CreateSystemUserOutputDto): Observable<ApiResponse<boolean>> {
    return this.baseApi.Post(`${this.controllerUrl}create`,body);
  }

  update(body: UpdateSystemUserOutputDto): Observable<ApiResponse<boolean>> {
    return this.baseApi.Put(`${this.controllerUrl}update`,body);
  }

  delete(userId:string | null): Observable<ApiResponse<boolean>> {
    return this.baseApi.Delete(`${this.controllerUrl}delete?userId=${userId}`);
  }
}
