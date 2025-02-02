export interface RegisterSystemUserOutput {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface UserLoginInput {
    userName: string;
    email: string;
    token: string;
}

export interface LoginOutput {
    userName: string;
    password: string;
  }
  
  
  