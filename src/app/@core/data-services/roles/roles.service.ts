import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { QueryStringBuilder } from '../../../shared/class/query-string-builder';
import { BaseApiService } from '../../common-services/base-api.service';
import { ApiResponse, LookupsDto, PaginatedResponse } from '../../data-models/shared-models';
import { UserModel } from '../../data-models/users-models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private controllerUrl: string = `${environment.appConfig.apiUrl}/api/roles/`;
  constructor(private baseApi: BaseApiService<any>) { }

  getAllRoles(): Observable<ApiResponse<LookupsDto[]>> {
    return this.baseApi.Get(`${this.controllerUrl}get-all`);
  }

  getAllUserRoles(userId:string): Observable<ApiResponse<LookupsDto[]>> {
    return this.baseApi.Get(`${this.controllerUrl}get-user-roles?userId=${userId}`);
  }
}
