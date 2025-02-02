import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common-services/base-api.service';
import { environment } from '../../../../environments/environment';
import { LoginOutput, RegisterSystemUserOutput, UserLoginInput } from '../../data-models/auth/auth-models';
import { ApiResponse } from '../../data-models/shared-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private controllerUrl: string = `${environment.appConfig.apiUrl}/api/auth-user/`;
  constructor(private baseApi: BaseApiService<any>) { }

  register(body: RegisterSystemUserOutput): Observable<ApiResponse<UserLoginInput>> {
    return this.baseApi.Post(`${this.controllerUrl}register`,body);
  }

  login(body: LoginOutput): Observable<ApiResponse<UserLoginInput>> {
    return this.baseApi.Post(`${this.controllerUrl}login`,body);
  }
}
