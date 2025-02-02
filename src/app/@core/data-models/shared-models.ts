export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[];
}

export interface PaginatedResponse<T> {
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  success: boolean;
  data: T[];
  message: string;
  errors: any[];
}

export interface TableColumn {
  field: string;
  header: string;
  isDate: boolean;
}

export interface LookupsDto {
  id: string;
  nameEn: string;
  nameAr: string;
}

export interface TokenClaims {
  FirstName: string;
  LastName: string;
  UserId: string;
  aud: string;
  email: string;
  exp: number;
  iss: string;
  nbf: number;
  roles: string;
  sub: string;
  unique_name: string;
}
