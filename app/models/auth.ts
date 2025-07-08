
 export interface User {
    id: number;
    email : string;
    passWord : string;
    userType: string; 

};

export interface LogInDetails {
    email: string;
    passWord: string
}

export enum UserStatus {
    LoggedIn,
    LoggedOut,
}

export interface ResetPassWordDTO
{
    email:string;
    passWord:string
}